import React from 'react';
import { User, ScrollText, Flame, MonitorPlay, Package, ArrowRight, Sun } from 'lucide-react';

// Map of all imported icons for reliable string-based rendering
const IconMap = { User, ScrollText, Flame, MonitorPlay, Package, ArrowRight, Sun };

// Define the steps and map them to appropriate spiritual icons
const STEPS = [
  {
    iconName: "User",
    title: "Share Your Sankalp & Details",
    desc: "Provide your birth details and the specific purpose (Sankalp) for which the Yagya is being performed.",
    color: "text-amber-700",
    bg: "bg-amber-100",
    ring: "ring-amber-500",
  },
  {
    iconName: "ScrollText",
    title: "Pandits Prepare Muhurat",
    desc: "Our Kashi Pandits analyze your Kundali to prepare your specific Sankalp and determine the most auspicious time (Muhurat).",
    color: "text-red-700",
    bg: "bg-red-100",
    ring: "ring-red-500",
  },
  {
    iconName: "Flame", // Sacred fire element
    title: "Yagya Conducted at Sacred Site",
    desc: "The ritual is performed live and authentically in Kashi or Trimbakeshwar, channeling potent spiritual energy.",
    color: "text-yellow-700",
    bg: "bg-yellow-100",
    ring: "ring-yellow-600",
  },
  {
    iconName: "MonitorPlay",
    title: "Receive Video & Report",
    desc: "Witness the ceremony live via video and get a detailed completion report of the proceedings and mantras chanted.",
    color: "text-teal-700",
    bg: "bg-teal-100",
    ring: "ring-teal-500",
  },
  {
    iconName: "Package",
    title: "Prasadam & Blessings at Home",
    desc: "The sacred Prasadam (blessed offerings) and energized Yantra are securely dispatched to your address.",
    color: "text-sky-700",
    bg: "bg-sky-100",
    ring: "ring-sky-500",
  },
];

// Custom CSS for enhanced aesthetics and animations in LIGHT MODE
const customStyles = `
  /* Subtle text effect for the light background */
  .luminous-text-light {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  /* Keyframes for the golden pulsing arrow connector */
  @keyframes pulseGlow {
    0%, 100% { transform: scale(0.95); opacity: 0.6; }
    50% { transform: scale(1.1); opacity: 1; }
  }
  .arrow-pulse {
    animation: pulseGlow 2s infinite ease-in-out;
  }
  
  /* Keyframes for the staggered entry animation */
  @keyframes slideUpFadeIn {
    0% { transform: translateY(50px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-stagger-in {
    animation: slideUpFadeIn 0.8s ease-out forwards;
    opacity: 0; /* Ensures starting state is hidden */
  }

  /* Applying delays for staggered effect (0.1s increment) */
  .animate-delay-0 { animation-delay: 0s; }
  .animate-delay-1 { animation-delay: 0.1s; }
  .animate-delay-2 { animation-delay: 0.2s; }
  .animate-delay-3 { animation-delay: 0.3s; }
  .animate-delay-4 { animation-delay: 0.4s; }

  /* Vertical Dotted Line for Mobile */
  .vertical-timeline {
    background-image: linear-gradient(to bottom, #d97706 50%, transparent 50%);
    background-size: 100% 16px;
    background-repeat: repeat-y;
  }
`;

const SpiritualSteps = () => {
  return (
    // Section using a soft spiritual amber background
    <section className="py-16 md:py-24 bg-amber-50 font-inter relative overflow-hidden">
      <style>{customStyles}</style>

      {/* Subtle Background pattern: Stars/Dots */}
      <div className="absolute inset-0 z-0 opacity-20"
           style={{ backgroundImage: `radial-gradient(circle at center, #fef3c7 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header - Dark Text Look */}
        <div className="text-center mb-16">
          <h2 className="text-sm md:text-base font-bold uppercase tracking-widest text-amber-700 mb-2">
            The Sacred Path
          </h2>
          <h1 className="text-4xl md:text-6xl font-extrabold text-amber-400 luminous-text-light drop-shadow-sm">
            How Your Yagya Is Performed
          </h1>
        </div>

        {/* Desktop/Horizontal Flow (Grid) */}
        <div className="hidden lg:grid grid-cols-5 gap-4 xl:gap-0 relative justify-center">
          
          {STEPS.map((step, index) => {
            const IconComponent = IconMap[step.iconName];
            const delayClass = `animate-delay-${index}`;

            return (
              <div 
                key={index} 
                className={`
                  flex flex-col items-center text-center relative px-2 
                  animate-stagger-in ${delayClass}
                `}
              >
                {/* ICON CONTAINER & GLOW */}
                <div className="relative z-20">
                  <div className={`
                    p-6 rounded-full shadow-xl mb-4 flex items-center justify-center
                    border-4 border-amber-700 transform transition-all duration-500
                    ${step.bg} ring-8 ${step.ring.replace('500', '300')}
                  `}>
                    {IconComponent && <IconComponent className={`w-10 h-10 ${step.color}`} strokeWidth={2.5} />}
                  </div>
                </div>

                {/* Step Title and Description */}
                <h3 className="text-xl font-bold text-amber-700 mt-2 mb-2 luminous-text-light">
                  {`Step ${index + 1}: ${step.title}`}
                </h3>
                <p className="text-sm text-gray-700 px-1 max-w-xs">{step.desc}</p>
                
                {/* Horizontal Arrow Connector */}
                {index < STEPS.length - 1 && (
                  <div className="absolute top-[38px] right-[-10%] w-[20%] flex items-center justify-center z-5">
                    <ArrowRight 
                      className={`w-10 h-10 text-amber-600 arrow-pulse`} 
                      style={{animationDelay: `${index * 0.4}s`}} 
                      strokeWidth={3} 
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Mobile/Vertical Timeline Flow */}
        <div className="lg:hidden relative pt-4">
          
          {/* Vertical Dotted Line */}
          <div className="absolute left-4 top-0 bottom-0 w-1 vertical-timeline z-0"></div>
          
          <div className="space-y-10">
            {STEPS.map((step, index) => {
              const IconComponent = IconMap[step.iconName];
              
              return (
                <div key={index} className="flex items-start animate-stagger-in animate-delay-0">
                  
                  {/* Step Number & Icon Indicator (Left side) */}
                  <div className="flex flex-col items-center z-10 mr-4">
                    <div className={`
                      w-10 h-10 rounded-full shadow-lg flex items-center justify-center 
                      border-4 border-amber-700 font-bold text-lg ${step.bg} 
                      ring-4 ${step.ring.replace('500', '300')} text-gray-900
                    `}>
                      {IconComponent && <IconComponent className={`w-5 h-5 ${step.color}`} strokeWidth={2.5} />}
                    </div>
                  </div>

                  {/* Step Content Card (Right side) */}
                  <div className={`
                    flex-1 p-5 rounded-xl shadow-xl bg-white border-l-4 border-amber-600 
                    card-glow
                  `}>
                    <h3 className={`text-xl font-bold ${step.color} mb-1 luminous-text-light`}>
                      {`Step ${index + 1}: ${step.title}`}
                    </h3>
                    <p className="text-sm text-gray-700">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SpiritualSteps;