import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-xl border-b border-gray-200' : 'bg-white/10 backdrop-blur-md border-b border-white/20'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-18">
          {/* Logo - Positioned in corner */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3_eQb1bwb-FBrRt1TwBDc4YGc8N1fuSziaA&s" 
              alt="ACE Logo" 
              className="h-12 w-12 rounded-full border-2 border-white/40 shadow-lg"
            />
            <div className="flex flex-col">
              <span className={`font-bold text-xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                ACE
              </span>
              <span className={`text-xs font-medium ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
                SRKR Engineering College
              </span>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-900 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-xl rounded-b-lg">
            <nav className="px-6 py-4 space-y-1">
              {['Home', 'About', 'Events', 'Register', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-3 px-4 text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                >
                  {item}
                </button>
              ))}
              
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;