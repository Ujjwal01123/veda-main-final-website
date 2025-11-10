import React from 'react';
import { Sparkles, Sun, Zap, Flame, CheckCircle } from 'lucide-react';

const PLANS = [
  {
    title: "Basic Puja",
    price: "₹2100/-",
    isPopular: false,
    color: "text-amber-600",
    bg: "bg-amber-50",
    icon: Sparkles,
    features: [
      "Small-scale ritual for general peace & prosperity.",
      "Includes mantra chanting + offerings + Sankalp.",
    ],
  },
  {
    title: "Advanced Yagya",
    price: "₹5100/-",
    isPopular: true,
    color: "text-red-700",
    bg: "bg-red-50",
    icon: Sun,
    features: [
      "Full personalized Yagya based on your Kundali.",
      "Conducted by 3 Pandits with live video + report.",
    ],
  },
  {
    title: "Maha Yagya",
    price: "₹11000/-",
    isPopular: false,
    color: "text-purple-700",
    bg: "bg-purple-50",
    icon: Zap,
    features: [
      "Grand-scale ritual by 5 Pandits.",
      "Includes Homa, mantra chanting, yantra energization, prasadam dispatch.",
    ],
  },
];

// Custom CSS for animations
const customStyles = `
  /* Pulse animation for the popular tag */
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.6); }
    50% { box-shadow: 0 0 15px rgba(251, 191, 36, 1); }
  }
  .popular-ribbon {
    animation: pulseGlow 3s infinite ease-in-out;
  }
  /* Subtle fire/flame effect on the CTA button */
  .cta-glow {
    transition: all 0.3s ease;
  }
  .cta-glow:hover {
    box-shadow: 0 0 20px rgba(234, 88, 12, 0.8), 0 0 10px rgba(251, 191, 36, 0.9);
    transform: scale(1.02);
  }
`;

const PricingCard = ({ title, price, features, color, bg, icon: Icon, isPopular }) => {
  return (
    <div className={`
      relative p-8 rounded-3xl shadow-2xl transition-all duration-500 
      transform hover:scale-[1.03] flex flex-col h-full border-4
      ${isPopular 
        ? 'border-amber-400 bg-white scale-[1.02]' 
        : 'border-gray-200 bg-white'
      }
    `}>
      {/* Popular Ribbon */}
      {isPopular && (
        <div className="absolute top-0 right-0 -mt-3 -mr-3 px-4 py-1.5 bg-amber-500 text-white text-xs font-bold uppercase rounded-full popular-ribbon shadow-lg">
          Most Popular
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <Icon className={`w-12 h-12 mx-auto mb-3 ${color}`} strokeWidth={2.5} />
        <h3 className="text-3xl font-extrabold text-gray-900">{title}</h3>
        <p className={`text-4xl font-black mt-2 ${color}`}>{price}</p>
      </div>

      {/* Features List */}
      <ul className="space-y-4 flex-grow text-gray-700 text-left mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-base">
            <Flame className={`w-5 h-5 flex-shrink-0 mr-3 mt-1 ${color}`} fill="currentColor" stroke="none" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Empty space for alignment in the grid */}
      <div className="flex-grow"></div>

      {/* CTA Button is outside the card in the main component to ensure consistency */}
    </div>
  );
};

const PricingSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 font-inter relative overflow-hidden">
      <style>{customStyles}</style>
      
      {/* Background Spiritual Ripple Pattern */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: `radial-gradient(circle at center, #fff7ed 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-amber-800 mb-4 drop-shadow-sm">
          Choose Your Path to Blessings
        </h2>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          Select the devotional service that aligns perfectly with your goals and spiritual needs.
        </p>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-8 justify-items-center">
          {PLANS.map((plan, index) => (
            <div key={index} className="w-full max-w-md lg:max-w-none">
              <PricingCard {...plan} />
            </div>
          ))}
        </div>

        {/* Unified CTA Button */}
        <div className="text-center mt-16">
          <button
            className={`
              inline-flex items-center justify-center px-12 py-4 
              border border-transparent text-xl font-bold rounded-xl shadow-2xl
              text-white bg-red-600 hover:bg-red-700
              focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50
              uppercase tracking-wider cta-glow
            `}
            onClick={() => console.log('Booking Yagya Now')}
          >
            <Flame className="w-6 h-6 mr-3 animate-pulse" />
            Book My Yagya with Kashi Pandits Now
          </button>
          <p className="mt-4 text-sm text-gray-500 italic">
            Secure your auspicious date today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;