import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../App';
import { Users, Globe, BookOpen, Quote, PlusCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const ImpactSection = () => {
  const { t } = useTranslation();
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
    <section id="impact" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Our Impact</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t.impactDesc}
          </p>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-[var(--color-clic-blue)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 font-mono">5,240+</h3>
            <p className="text-lg font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Students Trained</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-[var(--color-clic-green)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe size={32} />
            </div>
            <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 font-mono">12</h3>
            <p className="text-lg font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Communities Reached</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-[var(--color-clic-orange)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen size={32} />
            </div>
            <h3 className="text-5xl font-black text-gray-900 dark:text-white mb-2 font-mono">150+</h3>
            <p className="text-lg font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Workshops Hosted</p>
          </motion.div>
        </div>

        {/* Testimonials - Horizontally Scrollable */}
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

            {/* Add Your Story Card */}
            <motion.a 
              href="#share-story"
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-[var(--color-clic-blue)] dark:hover:border-[var(--color-clic-blue)] relative w-[85vw] sm:w-[320px] md:w-[380px] snap-center flex-shrink-0 flex flex-col items-center justify-center text-center transition-all group cursor-pointer"
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-[var(--color-clic-blue)] bg-blue-50 dark:bg-blue-900/30 group-hover:bg-[var(--color-clic-blue)] group-hover:text-white transition-colors shadow-sm"
              >
                <PlusCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-serif group-hover:text-[var(--color-clic-blue)] transition-colors">Have a Story?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                We'd love to hear how CLIC Ethiopia has impacted your journey.
              </p>
              <div className="flex items-center font-bold text-sm uppercase tracking-wider text-[var(--color-clic-blue)]">
                Share Your Story <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
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
      </div>
    </section>
  );
};

export default ImpactSection;
