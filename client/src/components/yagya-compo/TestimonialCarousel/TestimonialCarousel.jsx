import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Leaf, CloudLightning } from 'lucide-react';

const testimonials = [
  {
    quote: "After my Kaal Sarp Dosh Yagya, I felt a complete shift in my energy. My career finally stabilized and mental peace returned.",
    name: "Ravi Joshi",
    location: "Mumbai",
    yagya: "Kaal Sarp Dosh Yagya",
    icon: <CloudLightning className="w-4 h-4 inline mr-1 text-amber-600" />,
    quoteImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder for circular image
  },
  {
    quote: "The live video of Mahamrityunjaya Yagya was so divine. The vibrations felt real even from home. I could sense protection immediately.",
    name: "Nisha Verma",
    location: "London",
    yagya: "Mahamrityunjaya Yagya",
    icon: <Leaf className="w-4 h-4 inline mr-1 text-amber-600" />,
    quoteImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Placeholder for circular image
  }
];

// Custom CSS for metallic text, pulsating image, and responsive quote layout
const customStyles = `
  /* Metallic Text Effect */
  .metallic-text {
    background: linear-gradient(180deg, #fef3c7 0%, #d97706 60%, #b45309 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.1));
  }
  
  /* Divine Pulse/Shimmer on the quote image */
  @keyframes divinePulseImage {
    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.9; }
    50% { transform: scale(1.05) rotate(2deg); opacity: 1; }
  }

  .pulse-quote-image {
    animation: divinePulseImage 5s infinite ease-in-out alternate;
    filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.7));
  }

  /* Responsive quote positioning for desktop */
  @media (min-width: 768px) {
    .md-quote-layout {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: left; /* Align quote text to left on desktop */
    }
  }
`;

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = testimonials.length;

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalItems);
    }, 7000); // Cycles every 7 seconds

    return () => clearInterval(interval);
  }, [totalItems]);

  const goToPrev = () => {
    setActiveIndex((current) => (current - 1 + totalItems) % totalItems);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % totalItems);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="py-12 md:py-16 bg-white font-inter relative overflow-hidden">
      <style>{customStyles}</style>
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-black text-center mb-10 metallic-text tracking-tight">
          Voices of Transformation
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Main Testimonial Card (The Sacred Scroll) */}
          <div className="bg-white p-6 md:p-8 rounded-2xl max-w-3xl mx-auto 
                          shadow-xl shadow-amber-200/50 border-t-4 border-amber-400 
                          transition-all duration-700 ease-in-out">
            
            <div className="md-quote-layout flex-col md:flex-row items-center">
                {/* Circular Image for Quote Icon */}
                <img 
                    src={currentTestimonial.quoteImage}
                    alt="Quote Icon"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover 
                                flex-shrink-0 mb-4 md:mb-0 md:mr-6 
                                pulse-quote-image border-4 border-amber-300"
                />

                {/* Testimonial Quote */}
                <p className="text-xl md:text-2xl italic font-serif text-gray-800 text-center md:text-left 
                              relative transition-opacity duration-1000"
                   key={activeIndex} // Key change forces component recreation/re-render for transition
                   style={{ opacity: 1, transition: 'opacity 1s' }}
                >
                  {currentTestimonial.quote}
                </p>
            </div>
            
            {/* Attribution */}
            <div className="text-center mt-6">
                <p className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                    — {currentTestimonial.name}
                </p>
                <p className="text-md text-amber-700 font-semibold mb-2">
                    {currentTestimonial.location}
                </p>
                <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
                    {currentTestimonial.icon}
                    Experience with {currentTestimonial.yagya}
                </p>
            </div>
          </div>

          {/* Navigation Buttons (Absolute Positioning) */}
          <button 
            onClick={goToPrev}
            className="absolute top-1/2 -left-3 transform -translate-y-1/2 
                       p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full 
                       shadow-lg transition duration-300 opacity-80 hover:opacity-100 
                       hidden md:block"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute top-1/2 -right-3 transform -translate-y-1/2 
                       p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-full 
                       shadow-lg transition duration-300 opacity-80 hover:opacity-100 
                       hidden md:block"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Indicators (Dots) */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors duration-300 
                          ${index === activeIndex ? 'bg-amber-600 shadow-sm shadow-amber-400' : 'bg-amber-300 hover:bg-amber-400'}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;