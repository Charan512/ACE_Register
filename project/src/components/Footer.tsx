import React from 'react';
import { Code, Heart, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3_eQb1bwb-FBrRt1TwBDc4YGc8N1fuSziaA&s" 
                alt="ACE Logo" 
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold">ACE</h3>
                <p className="text-sm text-gray-400">SRKR Engineering College</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Association of Computer Science Engineers - Empowering future tech leaders through innovation, collaboration, and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Events', 'Register', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(item.toLowerCase());
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://www.instagram.com/srkr_ace?igsh=MXh4dmlic3BmYTZmdw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/association-of-computer-engineers-ace/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <p className="text-sm text-gray-400">
              Stay connected with ACE for updates and events
            </p>
          </div>

          {/* Contact Info */}
          <div className="md:col-start-3">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>ace.cse@srkrec.ac.in</p>
              <p>CSE Department</p>
              <p>SRKR Engineering College</p>
              <p>Bhimavaram, AP</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4 md:mb-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>by ACE Team</span>
              <Code className="h-4 w-4 text-blue-400 ml-2" />
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} ACE - SRKR Engineering College. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;