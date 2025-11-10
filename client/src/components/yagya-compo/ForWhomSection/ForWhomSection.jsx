import React from 'react';
import { TrendingDown, AlertTriangle, ShieldCheck, Home, Sunrise, Zap } from 'lucide-react';

const BENEFICIARIES = [
  {
    icon: TrendingDown,
    title: "Overcoming Challenges",
    desc: "For those facing repeated obstacles, persistent health issues, or severe financial instability.",
    color: "text-red-700",
    bg: "bg-red-50",
    ring: "ring-red-500",
  },
  {
    icon: AlertTriangle,
    title: "Dosha Nivarana (Remedy)",
    desc: "Individuals burdened by specific planetary afflictions (Graha doshas) or natal imbalances like Kaal Sarp, Pitra, or Manglik dosha.",
    color: "text-amber-700",
    bg: "bg-amber-50",
    ring: "ring-amber-500",
  },
  {
    icon: ShieldCheck,
    title: "Divine Protection",
    desc: "Devotees wishing to establish a continuous monthly or annual ritual for spiritual fortification and protection from negative energies.",
    color: "text-green-700",
    bg: "bg-green-50",
    ring: "ring-green-500",
  },
  {
    icon: Home,
    title: "Peace & Prosperity",
    desc: "Families seeking domestic harmony, emotional stability, and continuous prosperity and abundance in their homes.",
    color: "text-purple-700",
    bg: "bg-purple-50",
    ring: "ring-purple-500",
  },
  {
    icon: Sunrise,
    title: "Positive Transformation",
    desc: "Anyone desiring deep spiritual cleansing (Shuddhi) to clear karmic residue and manifest positive personal transformation.",
    color: "text-blue-700",
    bg: "bg-blue-50",
    ring: "ring-blue-500",
  },
  {
    icon: Zap,
    title: "Auspicious Beginnings",
    desc: "To ensure success and divine grace for new endeavors, marriages, professional starts, or major life milestones.",
    color: "text-pink-700",
    bg: "bg-pink-50",
    ring: "ring-pink-500",
  },
];

// Custom animation for the divine glow effect
const customStyles = `
  @keyframes pulseGlow {
    0% { box-shadow: 0 0 5px rgba(255, 204, 0, 0.4); }
    50% { box-shadow: 0 0 15px rgba(255, 153, 0, 0.8), 0 0 5px rgba(255, 255, 255, 0.5); }
    100% { box-shadow: 0 0 5px rgba(255, 204, 0, 0.4); }
  }
  .card-hover-effect {
    transition: all 0.3s ease;
    border-color: transparent;
  }
  .card-hover-effect:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  .mandala-heading {
      animation: pulseGlow 4s infinite;
  }
`;

const BenefitCard = ({ icon: Icon, title, desc, color, bg, ring }) => (
  <div className={`
    card-hover-effect p-6 rounded-2xl border-4 border-dashed border-gray-200 
    shadow-lg hover:shadow-2xl flex flex-col items-start h-full
    ${bg} relative overflow-hidden
  `}>
    
    {/* Inner Subtle Ring on Hover */}
    <div className={`absolute inset-0 ring-4 ${ring} opacity-0 hover:opacity-50 transition-opacity rounded-xl`}></div>

    {/* Icon Container - Elevated look */}
    <div className={`
      p-4 rounded-xl mb-4 shadow-xl 
      flex-shrink-0 ${bg.replace('50', '200')}
    `}>
      <Icon className={`w-8 h-8 ${color}`} strokeWidth={2.5} />
    </div>

    {/* Content */}
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 flex-grow">{desc}</p>
  </div>
);

const ForWhomSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 font-inter relative overflow-hidden">
      <style>{customStyles}</style>

      {/* Spiritual Background Element (Subtle Om/Mandala pattern) */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Cdefs%3E%3Cpattern id='mandala' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='25' cy='25' r='2' fill='%23fef3c7'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23mandala)'/%3E%3C/svg%3E")`
           }}>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Divine Glow Animation */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-red-800 mb-4 
                       mandala-heading tracking-tight"
        >
          Who Should Book a Yagya
        </h2>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
          These sacred rituals are recommended for anyone seeking divine intervention, specific karmic remedies, or lasting peace.
        </p>

        {/* Benefit Grid (Mandala Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFICIARIES.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>

        {/* Conclusion Callout */}
        <div className="mt-16 text-center">
            <p className="text-lg text-gray-700 mb-4">
                If your intent aligns with any of these paths, a carefully performed Yagya can guide you toward **light and fulfillment.**
            </p>
            <button 
                className="inline-flex items-center justify-center px-8 py-3 
                           border border-transparent text-base font-medium rounded-full shadow-lg 
                           text-white bg-amber-600 hover:bg-amber-700 transition duration-300 
                           transform hover:scale-105 active:scale-95 animate-bounce-slow"
            >
                Start Your Divine Sankalp
            </button>
        </div>

      </div>
    </section>
  );
};

export default ForWhomSection;