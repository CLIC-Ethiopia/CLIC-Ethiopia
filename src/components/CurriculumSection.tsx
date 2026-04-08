import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useTranslation } from '../App';
import { 
  FlaskConical, Calculator, 
  Hammer, Palette, 
  Cpu, Zap, 
  Briefcase, Rocket,
  Lightbulb, Box, Layers, TrendingUp, Factory, Server,
  Sparkles, FileText, Bot, ArrowRight, User
} from 'lucide-react';

const CurriculumSection = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const stages = [
    {
      id: 'foundation',
      title: 'Foundation',
      subtitle: 'Science & Mathematics',
      description: 'The journey begins with curiosity. Students grasp the fundamental laws of nature (Science) and the logic of patterns (Math). Here, a raw idea is born from understanding "Why" things work.',
      icons: [FlaskConical, Calculator],
      color: 'var(--color-clic-red)',
      productState: 'Concept & Theory',
      visual: Lightbulb
    },
    {
      id: 'creation',
      title: 'Creation',
      subtitle: 'Engineering & Arts',
      description: 'Knowledge takes shape. Through Engineering, we build structure and function. Through Arts, we add human-centric design and aesthetics. The idea becomes a tangible prototype.',
      icons: [Hammer, Palette],
      color: 'var(--color-clic-orange)',
      productState: 'Prototype & Design',
      visual: Layers
    },
    {
      id: 'innovation',
      title: 'Innovation',
      subtitle: 'Technology',
      description: 'The prototype gets smarter. We integrate digital intelligence, automation, and connectivity. This is where the solution scales and adapts to the modern world.',
      icons: [Cpu, Zap],
      color: 'var(--color-clic-green)',
      productState: 'Smart Solution',
      visual: Cpu
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      subtitle: 'Entrepreneurship',
      description: 'The solution becomes a business. Students learn to package, market, and sell their innovation. The journey completes as the product reaches the community and creates value.',
      icons: [Briefcase, Rocket],
      color: 'var(--color-clic-blue)',
      productState: 'Marketable Product',
      visual: Box
    },
    {
      id: 'industrialization',
      title: 'Industrialization',
      subtitle: 'Mechanization & Digital Transformation',
      description: 'The ultimate end goal. Scaling enterprises to bring about an industrial revolution and digital transformation, creating upward economic mobility for the nation.',
      icons: [Factory, Server],
      color: 'var(--color-clic-purple)',
      productState: 'National Impact',
      visual: TrendingUp
    }
  ];

  return (
    <section id="curriculum" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300" ref={containerRef}>
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-mudcloth opacity-[0.02] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-clic-blue)]/10 text-[var(--color-clic-blue)] text-xs font-bold tracking-widest uppercase mb-4">
              The STEAM-IE Roadmap
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 font-serif">
              From Raw Idea to Real Impact
            </h2>
            <p className="text-xl text-gray-600">
              {t.curriculumDesc}
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Central Timeline Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden md:block rounded-full"></div>
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-clic-red)] via-[var(--color-clic-green)] to-[var(--color-clic-blue)] -translate-x-1/2 hidden md:block rounded-full origin-top"
            style={{ scaleY }}
          ></motion.div>

          {/* Stages */}
          <div className="space-y-12 md:space-y-24 relative">
            {stages.map((stage, index) => {
              const isEven = index % 2 === 0;
              return (
                <TimelineItem 
                  key={stage.id} 
                  stage={stage} 
                  index={index} 
                  isEven={isEven} 
                />
              );
            })}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm text-gray-600 dark:text-gray-300">
            <TrendingUp size={20} className="text-[var(--color-clic-green)]" />
            <span className="font-medium">The Result: Job Creators, Not Just Job Seekers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TimelineItem: React.FC<{ stage: any, index: number, isEven: boolean }> = ({ stage, index, isEven }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? '' : 'md:flex-row-reverse'}`}>
      
      {/* Content Side */}
      <div className="w-full md:w-1/2 px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-center ${isEven ? 'md:text-right' : 'md:text-left'}`}
        >
          <div className={`inline-flex items-center gap-2 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
              {React.createElement(stage.icons[0], { size: 20, style: { color: stage.color } })}
            </div>
            <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
              {React.createElement(stage.icons[1], { size: 20, style: { color: stage.color } })}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stage.title}</h3>
          <h4 className="text-lg font-medium mb-4" style={{ color: stage.color }}>{stage.subtitle}</h4>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {stage.description}
          </p>
        </motion.div>
      </div>

      {/* Center Point */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 flex items-center justify-center shadow-lg relative"
          style={{ borderColor: stage.color }}
        >
          <span className="text-xl font-black text-gray-400">{index + 1}</span>
          
          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: stage.color }}></div>
        </motion.div>
      </div>

      {/* Visual Side (Product Evolution) */}
      <div className="w-full md:w-1/2 px-4 md:px-12">
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-50 dark:from-gray-700 to-gray-100 dark:to-gray-800 rounded-bl-full -mr-8 -mt-8 z-0"></div>
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white shadow-md" style={{ backgroundColor: stage.color }}>
              {React.createElement(stage.visual, { size: 32 })}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Product State</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">{stage.productState}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CurriculumSection;
