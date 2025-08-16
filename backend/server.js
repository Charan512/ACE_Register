require('dotenv').config({ path: './cred.env' });
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { google } = require('googleapis');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();
app.use('/assets', express.static(path.join(__dirname, 'templates')));
const PORT = 5001;
const templateDir = path.join(__dirname, 'templates');
app.use(cors());
app.use(bodyParser.json());
const db = new sqlite3.Database('./members.db', (err) => {
  if (err) return console.error('DB connection error:', err.message);
  console.log('Connected to members.db');
});
db.serialize(()=>{
db.run(
  `CREATE TABLE IF NOT EXISTS registrations (
    ace_id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    phone TEXT,
    branch TEXT,
    gender TEXT,
    year TEXT,
    interests TEXT,
    payment TEXT,
    goodies TEXT,
    timestamp TEXT
  );`
);
  db.run(`
  CREATE TABLE IF NOT EXISTS invite_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    acid TEXT UNIQUE,
    used INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`,
  (err) => {
    if (err) console.error('Table creation error:', err.message);
  });
});
const auth = new google.auth.GoogleAuth({
  credentials: require('./credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
function generateACEID(callback) {
  db.get(
    `SELECT ace_id FROM registrations ORDER BY ROWID DESC LIMIT 1`,
    (err, row) => {
      if (err) return callback(err);
      let newId = '25ACEC001';
      if (row && row.ace_id) {
        const lastNum = parseInt(row.ace_id.slice(-3));
        const nextNum = (lastNum + 1).toString().padStart(3, '0');
        newId = `25ACEC${nextNum}`;
      }
      const inviteToken = newId;
      const insertTokenQuery = `
        INSERT INTO invite_tokens (acid, used)
        VALUES (?, 0)
      `;
      db.run(insertTokenQuery, [inviteToken], (err) => {
        if (err) return callback(err);
        console.log('Invite token saved for:', inviteToken);
      callback(null, newId);
    });
  });
}
async function generatePDF(renderedHtml) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--allow-file-access-from-files'
      ],
      timeout: 60000 
    });
    const page = await browser.newPage();
    page.setDefaultTimeout(60000);
    await page.goto('about:blank', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });
    try {
      await page.setContent(renderedHtml, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000
      });
    } catch (contentError) {
      console.error('Content setting error:', contentError);
      await page.setContent(renderedHtml, { 
        waitUntil: 'load',
        timeout: 60000
      });
    } 
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve, { once: true });
        }
      });
    });
    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' },
      timeout: 60000
    });
    return buffer;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error;
 } finally {
    if (browser) {
      await browser.close();
    }
  }
}
app.post('/register', async (req, res) => {
  try {
    const formData = req.body;
    db.get(`SELECT * FROM registrations WHERE phone = ?`, [formData.phone], (err, existing) => {
      if (err) {
        console.error('Phone lookup error:', err.message);
        return res.status(500).json({ error: 'Database error while checking phone' });
      }
      if (existing) {
        return res.status(409).json({ error: 'Phone number already registered' });
      }
      generateACEID(async (err, ace_id) => {
        if (err) {
          console.error('ACE ID Error:', err.message);
          return res.status(500).json({ error: 'ACE ID generation failed' });
        }
        const {
          name, email, phone, branch, gender,
          year, interests, payment, goodies
        } = formData;
        const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const insertQuery = `
          INSERT INTO registrations (ace_id, name, email, phone, branch, gender, year, interests, payment, goodies, timestamp)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.run(
          insertQuery,
          [
            ace_id, name, email, phone, branch, gender, year,
            interests.join(', '), payment, goodies, timestamp
          ],
          async function (err) {
            if (err) {
              console.error('DB insert error:', err.message);
              return res.status(500).json({ error: 'Failed to insert into DB' });
            }
            try {
              const sheetId = process.env.SHEET_ID;
              await sheets.spreadsheets.values.append({
                spreadsheetId: sheetId,
                range: 'Sheet1!A1',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                  values: [[
                    timestamp,
                    ace_id,
                    name,
                    gender,
                    branch,
                    year,
                    payment,
                    email,
                    phone,
                    interests.join(', '),
                    goodies
                  ]],
                },
              });
            } catch (sheetError) {
              console.error('Google Sheets error:', sheetError.message);
              return res.status(500).json({ error: 'Failed to update Google Sheet' });
            }
            try {
              const templatePath = path.join(__dirname, 'templates', 'certificate.html');
              let htmlContent = fs.readFileSync(templatePath, 'utf8');
              const assetsPath = path.join(__dirname, 'templates');
              const imageFiles = ['bg1.jpg', 'hod_sign.png', 'sec_sign.png'];
              for (const imageFile of imageFiles) {
                try {
                  const imagePath = path.join(assetsPath, imageFile);
                  if (fs.existsSync(imagePath)) {
                    const imageData = fs.readFileSync(imagePath);
                    const base64Image = imageData.toString('base64');
                    const mimeType = imageFile.endsWith('.png') ? 'image/png' : 'image/jpeg';
                    const dataUrl = `data:${mimeType};base64,${base64Image}`;
                    htmlContent = htmlContent
                      .replace(new RegExp(`src=["'](.*?${imageFile})["']`, 'g'), `src="${dataUrl}"`)
                      .replace(new RegExp(`url\\(["'](.*?${imageFile})["']\\)`, 'g'), `url("${dataUrl}")`);
                  } else {
                    console.warn(`Image file not found: ${imagePath}`);
                  }
                } catch (err) {
                  console.error(`Error processing image ${imageFile}:`, err);
                }
              }
              const renderedHtml = ejs.render(htmlContent, {
                ace_id,
                name,
                phone,
                email,
                year,
                gender,
                branch,
                interests: interests.join(', '),
                goodies,
                payment,
                basePath: path.join(__dirname, 'templates'),
              });
              const buffer = await generatePDF(renderedHtml);
              const inviteLink = `https://aceWhatsApp.com/join-group/${ace_id}`;
              const emailBody = `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                                <div style="text-align: center; margin-bottom: 20px;">
                                <img src="cid:aceLogo" alt="ACE Logo" style="max-width:150px; width:100%; height:auto; display:block; margin:0 auto;" />
                                </div>
                                <p>Dear ${name},</p>
                                <p>We're absolutely thrilled to welcome you to the <strong>ACE</strong> community! 🌟 Your registration is officially complete, and a brand new chapter of creativity, collaboration, and connection begins today!</p>
                                <p>From all of us at ACE — thank you for joining us. You're now part of a vibrant and growing family that celebrates ideas, empowers innovation, and believes in lifting each other higher.</p>
                                <p>As a member of ACE, you'll have access to:</p>
                                <ul>
                                  <li>✨ Inspiring events and workshops</li>
                                  <li>🤝 A network of passionate changemakers</li>
                                  <li>🚀 Opportunities to lead, learn, and grow</li>
                                  <li>🎯 A platform to turn your ideas into impact</li>
                                </ul>
                                <p>This is more than a registration. It's an invitation to belong, to thrive, and to shine — and we can't wait to see the amazing things you'll bring to the table!</p>
                                <p>Once again, welcome aboard — your ACE journey starts now!</p>
                                <p>Warm wishes,<br>The ACE Team<br><em>Where Ambition Meets Action</em></p>
                                <p>Join our WhatsApp group: <a href="${inviteLink}">${inviteLink}</a></p>
                                <p><b>This is one time use link make sure to join in first try!!!</b></p>
                                <div style="margin-top:20px; text-align:center;">
                                  <h3 style="margin-bottom:15px; font-size:16px; color:#333;">Contact Us</h3>
                                  <div style="display:flex; justify-content:center; gap:30px;">
                                    <a href="https://www.instagram.com/srkr_ace?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                                       style="text-decoration:none; color:#000; text-align:center;">
                                      <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" 
                                           alt="Instagram" width="30" height="30" style="display:block; margin:auto;" />
                                      <div style="font-size:12px; margin-top:5px;">Instagram</div>
                                    </a>
                                
                                    <!-- LinkedIn -->
                                    <a href="https://www.linkedin.com/company/association-of-computer-engineers-ace/" 
                                       style="text-decoration:none; color:#000; text-align:center;">
                                      <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" 
                                           alt="LinkedIn" width="30" height="30" style="display:block; margin:auto;" />
                                      <div style="font-size:12px; margin-top:5px;">LinkedIn</div>
                                    </a>
                                    <a href="https://whatsapp.com/channel/0029VaA6ohD2kNFpm5oRiu1B" 
                                       style="text-decoration:none; color:#000; text-align:center;">
                                      <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" 
                                           alt="WhatsApp" width="30" height="30" style="display:block; margin:auto;" />
                                      <div style="font-size:12px; margin-top:5px;">WhatsApp</div>
                                    </a>
                                  </div>
                                </div>`;
              await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'ACE Registration Confirmation with Certificate',
                html: emailBody,
                attachments: [{
                    filename: 'certificate.pdf',
                    content: buffer,
                    contentType: 'application/pdf',
                  },{
                    filename: 'ace.png',
                    path: path.join(__dirname, 'templates', 'ace.png'),
                    cid: 'aceLogo'
                  }],
              });
              console.log(`Registered & Emailed: ${ace_id}`);
              res.status(200).json({ success: true, ace_id });
            } catch (mailError) {
              console.error('Mail error:', mailError.message);
              res.status(500).json({ error: 'Failed to send email' });
            }
          }
        );
      });
    });
  } catch (e) {
    console.error('Unknown error:', e.message);
    res.status(500).json({ error: 'Unknown error occurred' });
  }
});
app.get('/join-group/:token', (req, res) => {
  const { token } = req.params;

  db.get(`SELECT * FROM invite_tokens WHERE acid = ?`, [token], (err, row) => {
    if (err) {
      console.error('Token lookup error:', err.message);
      return res.status(500).send('Internal server error.');
    }

    if (!row) {
      return res.status(404).send('Invalid invite token.');
    }

    if (row.used) {
      return res.status(403).send('This invite link has already been used.');
    }

    db.run(`UPDATE invite_tokens SET used = 1 WHERE acid = ?`, [token], (updateErr) => {
      if (updateErr) {
        console.error('Token update error:', updateErr.message);
        return res.status(500).send('Failed to update token.');
      }
      return res.redirect(process.env.WHATSAPP_GROUP_LINK);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});