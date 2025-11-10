import React, { useState } from 'react';
import { ChevronDown, HeartHandshake } from 'lucide-react';

// Custom Diya/Lamp SVG for a spiritual touch
const DiyaIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-5 h-5 text-amber-600 flex-shrink-0 mr-3"
    >
        {/* Flame (Top part) */}
        <path d="M12 2a3 3 0 013 3v6a1 1 0 01-1 1H10a1 1 0 01-1-1V5a3 3 0 013-3z"/>
        {/* Base/Wick */}
        <path d="M12 21a2 2 0 002-2v-2H10v2a2 2 0 002 2z"/>
        {/* Bowl/Oil */}
        <path fillRule="evenodd" d="M12 14c4 0 7-3.35 7-7 0-1.1-.9-2-2-2a2 2 0 00-2 2c0 1.65-1.34 3-3 3s-3-1.35-3-3a2 2 0 00-2-2c-1.1 0-2 .9-2 2 0 3.65 3 7 7 7z" clipRule="evenodd"/>
    </svg>
);

const faqs = [
  {
    id: 1,
    question: "How do I know which Yagya suits me?",
    answer: "You’ll receive a personalized recommendation after submitting your birth details. Our expert Pandits carefully analyze your astrological charts to determine the most beneficial ritual for your current life circumstances."
  },
  {
    id: 2,
    question: "Can I attend the Yagya online?",
    answer: "Yes, we ensure every devotee can witness the ritual. Live video streaming or a high-quality recorded video is shared with you, allowing you to participate in the divine vibrations from the comfort of your home."
  },
  {
    id: 3,
    question: "Will I receive proof of completion?",
    answer: "Yes, absolutely. After the ritual, you will receive a detailed Pandit report explaining the process, the video link of the completed Yagya, and the sacred Prasadam (blessed offerings) shipped directly to you."
  },
  {
    id: 4,
    question: "How many days does the ritual take?",
    answer: "Most Yagyas take between 1–3 days to complete. The exact duration depends heavily on the specific ritual type and the prescribed number of mantras to be chanted as per Vedic guidelines."
  }
];

// Custom CSS for metallic text adapted for a light background
const customStyles = `
  /* Metallic Text Effect for the main headline (Dark gradient on light BG) */
  .metallic-text-faq {
    background: linear-gradient(180deg, #b45309 0%, #d97706 40%, #fef3c7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
  }
`;

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-amber-50 font-inter relative overflow-hidden">
      <style>{customStyles}</style>
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16 metallic-text-faq tracking-tight">
          Vedic Wisdom: Your Questions Answered
        </h2>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={faq.id} 
                className={`rounded-xl shadow-xl transition-all duration-500 overflow-hidden 
                            ${isOpen 
                                ? 'bg-white ring-2 ring-amber-400 shadow-amber-200/50' 
                                : 'bg-white/95 hover:bg-white shadow-gray-200/80 border border-gray-100'
                            }`}
              >
                {/* Question/Header */}
                <button
                  className="flex justify-between items-center w-full p-5 text-left 
                             transition-colors duration-300"
                  onClick={() => toggleAnswer(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className={`flex items-center text-lg md:text-xl font-semibold 
                                    transition-all duration-300 
                                    ${isOpen ? 'text-amber-700' : 'text-stone-800'}`}>
                    <DiyaIcon />
                    Q{faq.id}. {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-6 h-6 ml-4 transition-transform duration-300 
                                ${isOpen ? 'transform rotate-180 text-amber-600' : 'text-stone-400'}`} 
                  />
                </button>

                {/* Answer/Content */}
                <div
                  id={`faq-answer-${faq.id}`}
                  className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 p-5 pt-0' : 'max-h-0 opacity-0 p-5 pt-0'}`}
                  style={{ 
                    maxHeight: isOpen ? '500px' : '0',
                    paddingTop: isOpen ? '0' : '0',
                    paddingBottom: isOpen ? '20px' : '0',
                    transition: 'max-height 0.5s ease-in-out, opacity 0.4s ease-in-out, padding 0.5s ease-in-out'
                  }}
                >
                  <p className="text-gray-700 text-base border-l-4 border-amber-500 pl-4 py-1">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action at the bottom
        <div className="mt-16 text-center">
            <p className="text-stone-700 text-lg mb-4">
                Still have unanswered questions about your personalized ritual?
            </p>
            <button className="flex items-center justify-center mx-auto px-8 py-3 bg-amber-600 text-white font-bold 
                                rounded-full shadow-lg shadow-amber-500/50 hover:bg-amber-700 
                                transition duration-300 transform hover:scale-105">
                <HeartHandshake className="w-5 h-5 mr-2" />
                Contact a Pandit Directly
            </button>
        </div> */}
      </div>
    </section>
  );
};

export default FaqAccordion;