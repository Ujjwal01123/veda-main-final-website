import React from 'react';
import { ShieldCheck, BookOpen, Lock, Globe, Headset } from 'lucide-react';

// Custom Om Icon for a spiritual touch in the header
const OmIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-8 h-8 text-amber-600 animate-pulse-slow"
    >
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10v-.5c0-.83.67-1.5 1.5-1.5h.5c.83 0 1.5-.67 1.5-1.5V6h-3.5V4h7v2.5c0 .83-.67 1.5-1.5 1.5h-.5c-.83 0-1.5.67-1.5 1.5V10h3.5v2h-7zm0 4h7v-2h-7z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
    </svg>
);

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Certified Kashi Pandits",
    description: "15+ years of experience ensures authentic and powerful rituals.",
    color: "text-amber-700"
  },
  {
    icon: BookOpen,
    title: "Rooted in Ancient Vedas",
    description: "Based on Rigveda, Yajurveda, and Atharvaveda scriptures.",
    color: "text-green-700"
  },
  {
    icon: Lock,
    title: "Secure & Transparent",
    description: "Private Sankalp, secure data, and a fully transparent process.",
    color: "text-blue-700"
  },
  {
    icon: Globe,
    title: "Worldwide Prasadam Delivery",
    description: "Receive blessings and energized items at your home, globally.",
    color: "text-purple-700"
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description: "Live coordination and expert assistance for all your queries.",
    color: "text-red-700"
  }
];

// Custom CSS for metallic text and pulse animation
const customStyles = `
  /* Metallic Text Effect for the main headline */
  .metallic-text-trust {
    background: linear-gradient(180deg, #b45309 0%, #d97706 40%, #fef3c7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
  }

  /* Slow pulse animation for Om Icon */
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  .animate-pulse-slow {
    animation: pulse-slow 4s infinite ease-in-out;
  }

  /* Subtle card hover effect */
  .card-hover-effect:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(251, 191, 36, 0.3), 0 0 15px rgba(251, 191, 36, 0.15);
  }
`;

const TrustAuthenticitySection = () => {
  return (
    <section className="py-16 md:py-24 bg-white font-inter relative overflow-hidden">
      <style>{customStyles}</style>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="flex flex-col items-center mb-16">
          <OmIcon /> {/* Spiritual icon */}
          <h2 className="text-4xl md:text-5xl font-black text-center mt-4 metallic-text-trust tracking-tight">
            Pillars of Trust & Authenticity
          </h2>
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => {
            const IconComponent = point.icon; // Dynamic icon component
            return (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-amber-400 
                           flex flex-col items-center text-center transition-all duration-300 
                           hover:card-hover-effect "
              >
                <IconComponent className={`w-12 h-12 mb-4 ${point.color}`} strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-amber-500 mb-2">{point.title}</h3>
                <p className="text-amber-700 text-base">{point.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustAuthenticitySection;