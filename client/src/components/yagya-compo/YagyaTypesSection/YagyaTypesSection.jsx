import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import yt1 from '../../../../public/images/yagya/yt1.jpg';
import yt2 from '../../../../public/images/yagya/yt2.jpg';
import yt3 from '../../../../public/images/yagya/yt3.png';
import yt4 from '../../../../public/images/yagya/yt4.png';
import yt5 from '../../../../public/images/yagya/yt5.png';
import yt6 from '../../../../public/images/yagya/yt6.png';
import yt7 from '../../../../public/images/yagya/yt7.png';
import yt8 from '../../../../public/images/yagya/yt8.png';

// --- Placeholder Data Structure with Image URLs ---
// NOTE: Please replace these placeholder image URLs with the actual paths 
// from your assets folder when integrating this component.
const YAGYA_TYPES = [
  {
    imageUrl: "images/yagya/yt1.jpg",
    title: "Navgraha Shanti Yagya",
    desc: "To balance planetary energies and remove astrological obstacles.",
    bg: "bg-blue-50",
    hoverBorder: "hover:border-blue-400"
  },
  {
    imageUrl: "images/yagya/yt2.jpg",
    title: "Mahamrityunjaya Yagya",
    desc: "For protection, health recovery, and life-extension blessings from Lord Shiva.",
    bg: "bg-red-50",
    hoverBorder: "hover:border-red-400"
  },
  {
    imageUrl: "images/yagya/yt3.png",
    title: "Kaal Sarp Dosh Nivaran Yagya",
    desc: "To neutralize karmic blockages caused by Rahu-Ketu dosha.",
    bg: "bg-green-50",
    hoverBorder: "hover:border-green-400"
  },
  {
    imageUrl: "images/yagya/yt4.png",
    title: "Baglamukhi Yagya",
    desc: "For victory in legal, professional, and personal battles; protection from enemies.",
    bg: "bg-yellow-50",
    hoverBorder: "hover:border-yellow-400"
  },
  {
    imageUrl: "images/yagya/yt5.png",
    title: "Rudrabhishek Puja",
    desc: "To invoke Lord Shiva’s grace and peace during difficult Dasha periods.",
    bg: "bg-indigo-50",
    hoverBorder: "hover:border-indigo-400"
  },
  {
    imageUrl: "images/yagya/yt6.png",
    title: "Vivah & Relationship Yagya",
    desc: "For love, marriage harmony, and Manglik dosha balance.",
    bg: "bg-pink-50",
    hoverBorder: "hover:border-pink-400"
  },
  {
    imageUrl: "images/yagya/yt7.png",
    title: "Lakshmi Narayan Yagya",
    desc: "For wealth, abundance, and prosperity.",
    bg: "bg-teal-50",
    hoverBorder: "hover:border-teal-400"
  },
  {
    imageUrl: "images/yagya/yt8.png",
    title: "Pitru Dosh Nivaran Yagya",
    desc: "To bring peace to ancestors and remove ancestral karmic blocks.",
    bg: "bg-purple-50",
    hoverBorder: "hover:border-purple-400"
  },
];

// Custom CSS for Card Animation (Subtle rotation on hover)
const customStyles = `
  /* Glow Animation for Carousel Dot */
  @keyframes subtleGlow {
    0% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }
    50% { box-shadow: 0 0 10px rgba(251, 191, 36, 0.8); }
    100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.4); }
  }

  .glow-border {
    animation: subtleGlow 4s infinite alternate;
  }
`;

const YagyaTypesSection = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollRef = React.useRef(null);

  // Scroll functions for the mobile carousel effect
  const scrollTo = (index) => {
    if (scrollRef.current) {
      // Find the card width dynamically
      const cardElement = scrollRef.current.children[0];
      if (!cardElement) return;
      
      // We assume each card takes up the full width of the visible container on small screens
      const cardWidth = cardElement.offsetWidth;
      
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % YAGYA_TYPES.length;
    scrollTo(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + YAGYA_TYPES.length) % YAGYA_TYPES.length;
    scrollTo(prevIndex);
  };

  // Component for a single Yagya Card
  const YagyaCard = ({ imageUrl, title, desc, bg, hoverBorder }) => (
    // w-full on mobile, and responsive fractional widths on tablet/desktop
    <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-full snap-center p-4">
      <div className={`
        h-full p-6 rounded-2xl bg-white shadow-xl border-2 border-amber-400 transition-all duration-500
        transform hover:scale-[1.05] hover:shadow-2xl hover:rotate-z-1
        cursor-pointer
         ${hoverBorder}
        flex flex-col items-center text-center
      `}>
        
        {/* Image Container: Added circular background effect */}
        <div className={`p-1 rounded-full mb-4 shadow-lg ${bg} border border-opacity-50 border-gray-300`}>
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-16 h-16 object-cover rounded-full p-1" // Added padding to separate image from border
            onError={(e) => {
                // Fallback if the image URL fails (shows a grey circle)
                e.target.onerror = null; 
                e.target.src = "https://placehold.co/64x64/ccc/999?text=IMG";
            }}
          />
        </div>
        <h3 className="text-xl font-extrabold text-amber-400 mb-2">{title}</h3>
        <p className="text-lg text-amber-600 font-serif">{desc}</p>
      </div>
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-white font-inter relative overflow-hidden">
      <style>{customStyles}</style>
      
      {/* Background Spiritual Ripple Effect (Light Gold/Cream Dots) */}
      <div className="absolute inset-0 z-0 opacity-10" 
           style={{ backgroundImage: `radial-gradient(circle at center, #fff7ed 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-amber-800 mb-4 drop-shadow-sm">
          A Path for Every Need
        </h2>
        <p className="text-xl text-center font-serif text-amber-600 mb-12 max-w-3xl mx-auto">
          Select the Yagya aligned with your specific spiritual goal, planetary need, or life challenge.
        </p>

        {/* --- DESKTOP GRID LAYOUT (Large Screens) --- */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {YAGYA_TYPES.map((item, index) => (
            <YagyaCard
              key={index}
              imageUrl={item.imageUrl}
              title={item.title}
              desc={item.desc}
              bg={item.bg}
              hoverBorder={item.hoverBorder}
            />
          ))}
        </div>

        {/* --- MOBILE/TABLET CAROUSEL LAYOUT (Small Screens) --- */}
        <div className="lg:hidden relative">
          
          {/* Scrollable Container (The actual carousel effect) */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-scroll snap-x snap-mandatory pb-6 space-x-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={(e) => {
              const scrollContainer = e.target;
              if (!scrollContainer.children[0]) return; 
              
              const cardWidth = scrollContainer.children[0].offsetWidth; 
              // Calculate the index that is closest to the center of the viewport
              const scrollIndex = Math.round(scrollContainer.scrollLeft / cardWidth);
              if (scrollIndex !== currentIndex) {
                setCurrentIndex(scrollIndex);
              }
            }}
          >
            {YAGYA_TYPES.map((item, index) => (
              <YagyaCard
                key={index}
                imageUrl={item.imageUrl}
                title={item.title}
                desc={item.desc}
                bg={item.bg}
                hoverBorder={item.hoverBorder}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-6">
            <button 
              onClick={prevSlide}
              className="p-3 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors shadow-md disabled:opacity-50"
              disabled={currentIndex === 0}
              aria-label="Previous Yagya Type"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots Indicator */}
            <div className="flex space-x-2 mx-6">
              {YAGYA_TYPES.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    index === currentIndex ? 'bg-amber-700 w-4 glow-border' : 'bg-gray-300'
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="p-3 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-colors shadow-md disabled:opacity-50"
              disabled={currentIndex === YAGYA_TYPES.length - 1}
              aria-label="Next Yagya Type"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default YagyaTypesSection;