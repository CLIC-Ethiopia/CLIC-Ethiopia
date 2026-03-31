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

  const projects = [
    {
      title: "Fad.Lab",
      description: "A state-of-the-art innovation hub providing resources and mentorship for tech startups.",
      link: "https://fad.lab",
      color: "var(--color-clic-blue)",
      letter: "F",
      colSpan: "lg:col-span-3"
    },
    {
      title: "Fad Business Verse",
      description: "An ecosystem connecting entrepreneurs with investors and business development tools.",
      link: "https://fadbusinessverse.com",
      color: "var(--color-clic-green)",
      letter: "B",
      colSpan: "lg:col-span-3"
    },
    {
      title: "Fad LMS",
      description: "A comprehensive Learning Management System designed for modern educational needs.",
      link: "https://fadlms.com",
      color: "var(--color-clic-orange)",
      letter: "L",
      colSpan: "lg:col-span-2"
    },
    {
      title: "NATS",
      description: "National Advanced Technology Solutions, focusing on large-scale infrastructure projects.",
      link: "https://nats.com",
      color: "var(--color-clic-purple)",
      letter: "N",
      colSpan: "lg:col-span-2"
    },
    {
      title: "CLIC Africa",
      description: "Expanding the CLIC initiative across the African continent to foster pan-African tech collaboration.",
      link: "#",
      color: "var(--color-clic-red)",
      letter: "A",
      colSpan: "lg:col-span-2"
    },
    {
      title: "CLIC Congo",
      description: "A dedicated branch of CLIC operating in the Democratic Republic of Congo, focusing on local tech empowerment.",
      link: "#",
      color: "var(--color-clic-blue)",
      letter: "C",
      colSpan: "lg:col-span-6"
    }
  ];

  return (
    <section id="impact" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-kuba opacity-[0.03] dark:opacity-[0.02] dark:invert pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* Other Projects by Prof. Frehun */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Other Projects by Prof. Frehun</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {projects.map((project, index) => (
              <motion.a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 flex flex-col h-full ${project.colSpan}`}
              >
                {/* Hover Tint */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 z-0 pointer-events-none"
                  style={{ backgroundColor: project.color }}
                ></div>

                {/* Watermark Letter */}
                <div 
                  className="absolute -bottom-8 -right-4 text-[14rem] font-black leading-none opacity-[0.15] group-hover:opacity-[0.25] group-hover:-translate-y-4 transition-all duration-700 z-0 select-none pointer-events-none"
                  style={{ color: project.color }}
                >
                  {project.letter}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500"
                      style={{ backgroundColor: project.color }}
                    >
                      <ArrowRight size={28} className="transform -rotate-45 group-hover:rotate-0 transition-transform" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ color: project.color }}>{project.title}</h4>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-8 flex-grow text-base leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider mt-auto group-hover:gap-3 transition-all duration-300" style={{ color: project.color }}>
                    <span>Visit Project</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
