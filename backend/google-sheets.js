const { google } = require("googleapis");
const keys = require("./credentials.json");
const auth = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);
const SHEET_ID = "1SWIiD_0ogiSK_mgBpkdZvPfcKBcLUcJbRC8RNpbjQn4";
exports.appendToGoogleSheet = async (data) => {
  const client = await auth.authorize();
  const sheets = google.sheets({ version: "v4", auth });
  const {
    date,
    aceId,
    fullName,
    gender,
    department,
    yearOfStudy,
    paymentMode,
    email,
    phone,
    areasOfInterest,
    goodies
  } = data;
  const row = [
    date,
    aceId,
    fullName,
    gender,
    department,
    yearOfStudy,
    paymentMode,
    email,
    phone,
    (Array.isArray(areasOfInterest) ? areasOfInterest : []).join(", "),
    goodies,
  ];
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A2",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    resource: {
      values: [row],
    },
  });
};
exports.getGoogleSheetData = async () => {
  const client = await auth.authorize();
  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A2:K",
  });
  const rows = response.data.values || [];
  return rows.map(row => ({
    date: row[0],
    aceId: row[1],
    fullName: row[2],
    gender: row[3],
    department: row[4],
    yearOfStudy: row[5],
    paymentMode: row[6],
    email: row[7],
    phone: row[8],
    interests: row[9],
    goodies: row[10],
  }));
};