import React from 'react';
import { ArrowRight, Users, Code, Trophy } from 'lucide-react';

const Hero = () => {
  const scrollToRegistration = () => {
    const element = document.getElementById('register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundSize: 'cover',backgroundColor:'#87CEEB',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3_eQb1bwb-FBrRt1TwBDc4YGc8N1fuSziaA&s" 
            alt="ACE Logo" 
            className="h-20 w-20 sm:h-24 sm:w-24 mt-11 mx-auto mb-6 rounded-full border-4 border-white/30 shadow-2xl backdrop-blur-sm"
          />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-blue-400 drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Welcome to ACE</span>
          <br />
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-100">
            Innovate. Lead. Excel.
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-100 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
          The Official CSE Student Club at SRKR Engineering College
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
          <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md px-4 sm:px-6 py-3 rounded-full text-base sm:text-lg border border-white/30">
            <Code size={24} />
            <span>CSE Powered</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md px-4 sm:px-6 py-3 rounded-full text-base sm:text-lg border border-white/30">
            <Users size={24} />
            <span>Student Driven</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-md px-4 sm:px-6 py-3 rounded-full text-base sm:text-lg border border-white/30">
            <Trophy size={24} />
            <span>Future Focused</span>
          </div>
        </div>
        
        <button
          onClick={scrollToRegistration}
          className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 sm:py-5 px-8 sm:px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 text-lg sm:text-xl"
        >
          <span>Register Now</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;