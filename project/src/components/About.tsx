import React from 'react';
import { Target, Eye, Star, Users, Code2, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About ACE</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Association of Computer Science Engineers - Where Innovation Meets Execution
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Our Mission & Vision</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Target className="h-6 w-6 text-blue-600 mt-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Mission</h4>
                  <p className="text-gray-600">
                    To foster technical excellence, innovation, and leadership among computer science students through collaborative learning, practical projects, and industry exposure.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Eye className="h-6 w-6 text-blue-600 mt-1" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Vision</h4>
                  <p className="text-gray-600">
                    To be the premier student organization that bridges the gap between academic learning and industry requirements, producing future-ready engineers and tech leaders.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">Student Benefits</h4>
            <div className="space-y-4">
              {[
                { icon: Code2, title: 'Technical Skills', desc: 'Hands-on coding workshops and projects' },
                { icon: Users, title: 'Networking', desc: 'Connect with like-minded peers and mentors' },
                { icon: Lightbulb, title: 'Innovation', desc: 'Work on cutting-edge technology projects' },
                { icon: Star, title: 'Leadership', desc: 'Develop leadership and management skills' }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <benefit.icon className="h-5 w-5 text-blue-600" />
                  <div>
                    <span className="font-medium text-gray-900">{benefit.title}:</span>
                    <span className="text-gray-600 ml-1">{benefit.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">Why Join ACE?</h3>
          <div className="text-base sm:text-lg mb-6 opacity-90 space-y-4">
            <p>
              Join a community of passionate computer science students dedicated to innovation and excellence. 
              At ACE, you'll gain hands-on experience with cutting-edge technologies, develop leadership skills, 
              and build lasting professional networks.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">🚀 Career Growth</h4>
                <p className="text-sm">Industry mentorship, internship opportunities, and career guidance</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">💡 Innovation Hub</h4>
                <p className="text-sm">Work on real-world projects and participate in hackathons</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">🤝 Community</h4>
                <p className="text-sm">Connect with like-minded peers and industry professionals</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-medium">
              CSE Powered | Student Driven | Future Focused
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;