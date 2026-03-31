import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Facebook, Send, Twitter, Mail, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const ShareStorySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.8 : 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const testimonials = [
    {
      quote: "The robotics lab completely changed my perspective on what I can achieve. I'm now building solutions for my community.",
      author: "Betelhem T.",
      role: "High School Student, Addis Ababa",
      image: "https://loremflickr.com/150/150/student,africa,girl?random=1",
      color: "var(--color-clic-blue)"
    },
    {
      quote: "CLIC Ethiopia provided our school with the resources we desperately needed. Our students are more engaged than ever.",
      author: "Ato Dawit",
      role: "Science Teacher, Bahir Dar",
      image: "https://loremflickr.com/150/150/teacher,africa,man?random=2",
      color: "var(--color-clic-green)"
    },
    {
      quote: "Learning to code through CLIC's mentorship program gave me the skills to start my own tech initiative.",
      author: "Yonas M.",
      role: "University Student, Hawassa",
      image: "https://loremflickr.com/150/150/student,africa,boy?random=3",
      color: "var(--color-clic-orange)"
    },
    {
      quote: "The STEAM curriculum is exactly what our educational system needed to bridge the gap between theory and practice.",
      author: "Dr. Aster K.",
      role: "Education Policy Advisor",
      image: "https://loremflickr.com/150/150/professional,africa,woman?random=4",
      color: "var(--color-clic-purple)"
    },
    {
      quote: "My daughter used to think science was only for boys. Now she wants to be an aerospace engineer thanks to CLIC.",
      author: "W/ro Tigist",
      role: "Parent, Dire Dawa",
      image: "https://loremflickr.com/150/150/parent,africa,woman?random=5",
      color: "var(--color-clic-red)"
    },
    {
      quote: "Partnering with CLIC Ethiopia allowed our tech company to discover brilliant young minds we otherwise wouldn't have found.",
      author: "Elias B.",
      role: "Tech Entrepreneur",
      image: "https://loremflickr.com/150/150/businessman,africa?random=6",
      color: "var(--color-clic-blue)"
    }
  ];

  return (
    <section id="share-story" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-zigzag opacity-[0.02] dark:opacity-[0.015] dark:invert pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Testimonials - Horizontally Scrollable */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Stories of Impact</h3>
        </div>
        <div className="relative mb-16 px-4 group/slider">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-[var(--color-clic-blue)] hover:scale-110 transition-all flex opacity-0 group-hover/slider:opacity-100 focus:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 md:gap-8 pb-12 snap-x snap-mandatory no-scrollbar" 
            style={{ scrollBehavior: 'smooth' }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 relative w-[85vw] sm:w-[320px] md:w-[380px] snap-center flex-shrink-0 flex flex-col transition-all group cursor-pointer"
                style={{ 
                  borderColor: testimonial.color,
                  boxShadow: `0 10px 25px -5px ${testimonial.color}20`
                }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white shadow-md"
                  style={{ backgroundColor: testimonial.color }}
                >
                  <Quote size={32} />
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 relative z-10 italic font-medium leading-relaxed flex-grow">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-14 h-14 rounded-full object-cover shadow-md"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-xl mb-1" style={{ color: testimonial.color }}>{testimonial.author}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-[var(--color-clic-blue)] hover:scale-110 transition-all flex opacity-0 group-hover/slider:opacity-100 focus:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>

          {/* Scroll Hint */}
          <div className="flex justify-center mt-2">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-clic-blue)]"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-gray-700 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Share Your CLIC Story</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Has CLIC Ethiopia impacted your life, your school, or your community? We want to hear from you! Submit your testimonial by tagging us on social media or sending us an email.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="https://facebook.com/CLIC_Ethiopia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-full font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-md">
              <Facebook size={20} /> Facebook
            </a>
            <a href="https://twitter.com/CLIC_Ethiopia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-md">
              <Twitter size={20} /> X (Twitter)
            </a>
            <a href="https://t.me/CLIC_Ethiopia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#0088cc] text-white rounded-full font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-md">
              <Send size={20} /> Telegram
            </a>
            <a href="https://tiktok.com/@CLIC_Ethiopia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#ff0050] text-white rounded-full font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-md">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg> TikTok
            </a>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1 max-w-[100px]"></div>
            <span className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wider">Or submit directly</span>
            <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1 max-w-[100px]"></div>
          </div>

          <div className="mt-6">
            <a href="mailto:clic.ethiopia@gmail.com?subject=My CLIC Ethiopia Testimonial" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-clic-blue)] text-white rounded-full font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg">
              <Mail size={20} /> Email Your Story
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Tag <strong className="text-[var(--color-clic-blue)]">@CLIC_Ethiopia</strong> in your posts!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShareStorySection;
