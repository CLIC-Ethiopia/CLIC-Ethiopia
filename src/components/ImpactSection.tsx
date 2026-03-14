import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../App';
import { Users, Globe, BookOpen, Quote } from 'lucide-react';

const ImpactSection = () => {
  const { t } = useTranslation();
  const testimonials = [
    {
      quote: "The robotics lab completely changed my perspective on what I can achieve. I'm now building solutions for my community.",
      author: "Betelhem T.",
      role: "High School Student, Addis Ababa",
      image: "https://loremflickr.com/150/150/student,africa,girl"
    },
    {
      quote: "CLIC Ethiopia provided our school with the resources we desperately needed. Our students are more engaged than ever.",
      author: "Ato Dawit",
      role: "Science Teacher, Bahir Dar",
      image: "https://loremflickr.com/150/150/teacher,africa,man"
    },
    {
      quote: "Learning to code through CLIC's mentorship program gave me the skills to start my own tech initiative.",
      author: "Yonas M.",
      role: "University Student, Hawassa",
      image: "https://loremflickr.com/150/150/student,africa,boy"
    }
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
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

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 relative"
            >
              <Quote className="absolute top-6 right-6 text-gray-100 dark:text-gray-800" size={48} />
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-8 relative z-10 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="w-14 h-14 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
