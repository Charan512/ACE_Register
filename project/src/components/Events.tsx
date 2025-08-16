import React from 'react';
import { Calendar, Users, Trophy, Sparkles } from 'lucide-react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "New Bees Freshers Event",
      description: "A warm welcome event for first-year students to introduce them to the ACE community and help them connect with seniors and peers.",
      image: "https://res.cloudinary.com/domogztsv/image/upload/v1754037965/unnamed_2_-min_be4yoe.png",
      icon: Users,
      highlights: ["Orientation Sessions", "Team Building Activities", "Networking Opportunities", "Welcome Kit Distribution"]
    },
    {
      id: 2,
      title: "Prajawalan",
      description: "A prestigious national-level hackathon conducted by SRKR ACE Club that brings together brilliant minds from across the country to showcase innovation and technical excellence.",
      image: "https://res.cloudinary.com/domogztsv/image/upload/v1754036777/unnamed_3_vkwccr.png",
      icon: Trophy,
      highlights: ["National Hackathon", "Technical Workshops", "Industry Expert Sessions", "Innovation Showcase"]
    },
    {
      id: 3,
      title: "Spurthi",
      description: "Our flagship national-level technical fest featuring cutting-edge competitions, workshops, and exhibitions that celebrate technological advancement.",
      image: "https://res.cloudinary.com/domogztsv/image/upload/v1754036717/unnamed_4_qbhwu5.png",
      icon: Sparkles,
      highlights: ["Technical Competitions", "Research Presentations", "Startup Expo", "Cultural Programs"]
    }
  ];

  return (
    <section id="events" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Signature Events</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience innovation, competition, and collaboration through our premier technical events
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {events.map((event, index) => (
            <div key={event.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
              {/* Event Image */}
              <div className="relative h-48 sm:h-64 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <event.icon className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Event Content */}
              <div className="p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Highlights */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    Event Highlights
                  </h4>
                  <ul className="space-y-2">
                    {event.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Ready to Participate?</h3>
            <p className="text-base sm:text-lg mb-6 opacity-90">
              Join ACE and be part of these amazing events that shape the future of technology
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('register');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;