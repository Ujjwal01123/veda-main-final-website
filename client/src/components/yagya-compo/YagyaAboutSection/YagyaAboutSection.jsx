import React from 'react';
import { Tornado, Sunrise, Flame, Gem, Shield, Heart, Package, Video } from 'lucide-react';

// Define the icons and corresponding color for each highlight
const HIGHLIGHTS = [
  {
    icon: Tornado, // Spiritual icon for Kashi/Shiva (using Tornado as a close visual substitute for Trident/Trishula)
    title: "Kashi Pandit Expertise",
    desc: "Performed by authentic Kashi Pandits with 15+ years of experience.",
    color: "text-amber-700",
    bg: "bg-amber-100",
  },
  {
    icon: Sunrise, // Icon for timing/personalization
    title: "Personalized Alignment",
    desc: "Rituals customized as per your birth details and planetary doshas (afflictions).",
    color: "text-red-700",
    bg: "bg-red-100",
  },
  {
    icon: Flame, // Icon for the ritual location
    title: "Sacred Location Conduct",
    desc: "Conducted in the sacred locations of Kashi (Varanasi) or Trimbakeshwar.",
    color: "text-orange-700",
    bg: "bg-orange-100",
  },
  {
    icon: Video, // Icon for digital inclusion
    title: "Digital & Live Inclusion",
    desc: "Includes live video access, Sankalp (vow), and a comprehensive completion report.",
    color: "text-blue-700",
    bg: "bg-blue-100",
  },
  {
    icon: Heart, // Icon for comprehensive coverage
    title: "Holistic Life Coverage",
    desc: "Covers all life aspects—health, protection, success, peace, and karma healing.",
    color: "text-green-700",
    bg: "bg-green-100",
  },
  {
    icon: Package, // Icon for physical deliverables
    title: "Energized Prasadam",
    desc: "Receive divine Prasadam and specially energized spiritual items shipped to your home.",
    color: "text-purple-700",
    bg: "bg-purple-100",
  },
];

// Custom CSS for animations
const customStyles = `
  /* Subtle heartbeat pulse for the main section to indicate life/energy */
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.005); }
  }

  .section-pulse {
    animation: heartbeat 20s infinite ease-in-out;
  }
`;

const YagyaAboutSection = () => {
  // Component for a single highlight card
  const HighlightCard = ({ icon: Icon, title, desc, color, bg }) => (
    <div className={`p-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.03] hover:shadow-xl cursor-default
                     ${bg} border-t-4 border-b-4 border-transparent hover:border-amber-400`}>
      <Icon className={`w-8 h-8 mb-3 ${color} drop-shadow-md`} strokeWidth={2.5} />
      <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
    </div>
  );

  return (
    <section className="py-20 md:py-28 bg-white section-pulse font-inter relative overflow-hidden">
      <style>{customStyles}</style>
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 100 100"><path d="M50 0L65 35L100 50L65 65L50 100L35 65L0 50L35 35Z" fill="%23fcdbaf" opacity="0.5"/></svg>')`, backgroundSize: '80px 80px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-amber-800 mb-16 drop-shadow-md">
          Understanding the Sacred Yagya
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Descriptive Content */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-amber-700 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-amber-500" />
                What is a Vedic Yagya?
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              A Yagya (Yajna) is an ancient Vedic ritual that connects you directly with the cosmic forces. It is not just an offering, but a profound spiritual technology for divine intervention.
            </p>

            <div className="p-6 bg-white rounded-xl shadow-xl border-l-4 border-amber-600 transition-all duration-500 hover:border-l-8 hover:shadow-2xl">
                <p className="text-xl italic text-amber-500 font-semibold">
                    "Through the power of fire, mantra, and intention, Yagya invokes divine blessings to heal, protect, and empower your life."
                </p>
            </div>
            
            <p className="text-lg text-gray-700 mt-6 leading-relaxed">
              Every Yagya performed through Veda Structure is based on authentic Vedic scriptures — conducted by qualified Pandits from Kashi, trained in the Maharishi & Kashi tradition. This guarantees the purity and efficacy of your ritual.
            </p>
          </div>

          {/* Right Column: Highlights Grid (Interactive) */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-amber-700 mb-6 flex items-center">
                <Gem className="w-6 h-6 mr-3 text-amber-500" />
                Divine Transformation Highlights
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {HIGHLIGHTS.map((item, index) => (
                <HighlightCard 
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                  color={item.color}
                  bg={item.bg}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YagyaAboutSection;