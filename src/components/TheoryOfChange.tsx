import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';

const peakTier = {
  title: "8+ Local Innovation & Invention",
  items: [
    "Community-Based Problem Solving",
    "Frugal Innovation & Resourcefulness",
    "Indigenous Knowledge Integration",
    "Grassroots Invention",
    "Sustainable Local Solutions"
  ]
};

const topTier = {
  title: "7+ Business Philosophy",
  items: [
    "Creativity", 
    "Critical thinking", 
    "Strategic Thinking", 
    "Business Philosophy", 
    "Personal Development", 
    "Governance in the Digital Era", 
    "Digital Transformation in Industries & Business"
  ]
};

const secondTier = {
  title: "6+ Practical Entrepreneurship",
  items: [
    "Business Setup", 
    "Entrepreneurship", 
    "Marketing & Sales", 
    "Business Management", 
    "Startup Business Ecosystems", 
    "Project & Human Resource Management"
  ]
};

const baseTier2 = {
  title: "Computer Science & Information Technology Skills",
  items: [
    "Basic Computing & Operating Systems",
    "Networking & Cloud Fundamentals",
    "Cybersecurity & Data Privacy",
    "Database Management Systems",
    "Software Engineering Principles"
  ]
};

const baseTier1 = {
  title: "Language & Communications Skills",
  items: [
    "Technical & Professional Writing",
    "Public Speaking & Presentation",
    "Cross-Cultural Communication",
    "Business English & Localization",
    "Digital Media Literacy"
  ]
};

const columns = [
  {
    name: "Science",
    colorClass: "text-[var(--color-clic-red)]",
    bgClass: "bg-red-50 dark:bg-red-900/10",
    borderClass: "border-red-200 dark:border-red-900/30",
    sector: { 
      title: "Healthcare", 
      items: ["Medical Tech", "Smart Devices", "AI in Healthcare", "Medical Imaging Tech", "Lifestyle Coaching", "Health Coaching"] 
    },
    focus: { 
      title: "Focus Fields", 
      items: ["Plant/Crop Science", "Animal Science", "Chemical Science", "Psychology & Sociology", "Health & Lifestyle Science", "Medical Science", "Veterinary Science"] 
    },
    subject: { 
      title: "Subjects", 
      items: ["Biotechnology", "Agricultural Science", "Humanitarian Science", "Communications Science", "Industrial & Health Science", "Ecology & Environmental Science"] 
    }
  },
  {
    name: "Technology",
    colorClass: "text-[var(--color-clic-orange)]",
    bgClass: "bg-orange-50 dark:bg-orange-900/10",
    borderClass: "border-orange-200 dark:border-orange-900/30",
    sector: { 
      title: "Agriculture", 
      items: ["Phytoponics", "Aquaponics", "Hydroponics", "City Farming", "Vertical Farming", "Food Processing", "Agro Industry", "Agri Tech"] 
    },
    focus: { 
      title: "Focus Fields", 
      items: ["Social Media", "Graphics Design", "Computer Science", "Computer Programing", "Game Design & Building", "Digital Communications", "Industrial IoT Applications", "Apps & Website Development"] 
    },
    subject: { 
      title: "Subjects", 
      items: ["Electronics & IoT Systems", "Virtual & Augmented Reality", "Computers & Mobile Technology", "Programming & SW development", "Transformational Digital Technology", "Smart devices & infrastructures"] 
    }
  },
  {
    name: "Engineering",
    colorClass: "text-[var(--color-clic-green)]",
    bgClass: "bg-green-50 dark:bg-green-900/10",
    borderClass: "border-green-200 dark:border-green-900/30",
    sector: { 
      title: "Manufacturing", 
      items: ["Carving", "Jewelry", "Fashion", "Fabric & Apparel", "Woodworking", "Metalworking", "Plumbing/Pipe works", "Product Development", "Production Processes", "Construction Materials", "Cleaning Materials", "Machine Design", "Digital Manufacturing", "Desktop Manufacturing"] 
    },
    focus: { 
      title: "Focus Fields", 
      items: ["Construction Tech", "Technical Illustration", "Architecture & Design", "Design & Fabrication", "Smart Manufacturing", "Computer Aided Design", "Computer Aided Construction"] 
    },
    subject: { 
      title: "Subjects", 
      items: ["Design", "Architecture", "Prototyping", "Manufacturing", "Industrial Processes", "Process Automation"] 
    }
  },
  {
    name: "Arts",
    colorClass: "text-[var(--color-clic-blue)]",
    bgClass: "bg-blue-50 dark:bg-blue-900/10",
    borderClass: "border-blue-200 dark:border-blue-900/30",
    sector: { 
      title: "Construction", 
      items: ["Road Engineering", "Building Designs", "Interior Design", "Urban planning", "Building management", "Smart infrastructures"] 
    },
    focus: { 
      title: "Focus Fields", 
      items: ["Creative Drawings", "Painting & Sculpture", "Craft Design", "Musical art's technology", "Digital Photography", "Digital Videography", "3D (VR/AR/MR) Arts Tech"] 
    },
    subject: { 
      title: "Subjects", 
      items: ["Fine Arts", "Modern Art", "Digital Arts", "Technical Arts", "Engineering Arts", "Audio & Visual Arts"] 
    }
  },
  {
    name: "Mathematics",
    colorClass: "text-[var(--color-clic-purple)]",
    bgClass: "bg-purple-50 dark:bg-purple-900/10",
    borderClass: "border-purple-200 dark:border-purple-900/30",
    sector: { 
      title: "Automotive", 
      items: ["Electric Cars", "Electric Scooters", "Electric UTV/ATV", "Automotive Tech", "Drone technology", "Electrification of Engine cars", "AI & Autonomous Vehicles"] 
    },
    focus: { 
      title: "Focus Fields", 
      items: ["Applied Mathematics", "Applied Statistics", "Business mathematics", "Industrial Mathematics", "Engineering Mathematics", "Algorithms Development", "Mathematical Software Progrmming"] 
    },
    subject: { 
      title: "Subjects", 
      items: ["Analytics", "Algorithms", "Data Science", "Artificial Intelligence", "Industrial Mathematics", "Engineering Mathematics"] 
    }
  }
];

const ExpandableBlock = ({ title, subtitle, items, customBg, textColor, borderClass, isMain = false }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl border ${borderClass || 'border-transparent'} ${customBg} relative overflow-hidden group flex flex-col min-h-[80px]`}
    >
      <div className="flex flex-col items-center justify-start text-center relative z-10 w-full">
        {subtitle && <span className="text-[10px] uppercase tracking-wider opacity-70 mb-1 font-bold">{subtitle}</span>}
        <h4 className={`font-bold ${isMain ? 'text-lg md:text-xl' : 'text-sm md:text-base'} ${textColor} flex items-center justify-center gap-1 w-full`}>
          {title}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} md:hidden flex-shrink-0`} />
        </h4>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 w-full overflow-hidden"
          >
            <ul className="mt-4 space-y-2 text-xs md:text-sm text-center pb-2 border-t border-black/10 dark:border-white/10 pt-4">
              {items.map((item: string, i: number) => (
                <motion.li 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  key={i} 
                  className={`font-medium ${textColor === 'text-white' ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}`}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TheoryOfChange = () => {
  return (
    <section id="theory-of-change" className="py-24 bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-mudcloth opacity-5 invert pointer-events-none"></div>

      {/* Pyramid Visual Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-end z-0 overflow-hidden pb-4 md:pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-7xl h-[95%] relative"
          style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))' }}
        >
          {/* Animated Neon Edge */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-[-100%] w-[300%] h-[300%] m-auto"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0%, var(--color-clic-blue) 20%, var(--color-clic-red) 40%, var(--color-clic-orange) 60%, var(--color-clic-green) 80%, transparent 100%)'
              }}
            />
          </div>
          
          {/* Inner Dark Background */}
          <div 
            className="absolute inset-[3px] md:inset-[5px] bg-slate-900"
            style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
          >
            {/* Subtle inner grid or pattern */}
            <div className="absolute inset-0 bg-pattern-kuba opacity-10 mix-blend-overlay"></div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-clic-blue)]/20 text-blue-300 text-xs font-bold tracking-widest uppercase mb-4">
            Theory of Knowledge enabled by Generative AI
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">The Educational Pyramid</h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-sm font-bold mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>200+ Skills synthesized and structured using Gemini Advanced & NotebookLM</span>
          </div>
          <p className="text-xl text-gray-300">
            An interactive roadmap from foundational skills to national industrialization. Hover or tap any block to explore the curriculum.
          </p>
        </div>

        {/* Pyramid Container */}
        <div className="flex flex-col items-center gap-3 w-full relative z-10">
          
          {/* Level 7: Local Innovation & Invention */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
            className="w-full md:w-1/4 z-[60]"
          >
            <ExpandableBlock 
              title={peakTier.title} 
              items={peakTier.items} 
              customBg="bg-[var(--color-clic-blue)]" 
              textColor="text-white" 
              isMain 
            />
          </motion.div>

          {/* Level 6: Business Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="w-full md:w-1/3 z-50"
          >
            <ExpandableBlock 
              title={topTier.title} 
              items={topTier.items} 
              customBg="bg-[var(--color-clic-orange)]" 
              textColor="text-white" 
              isMain 
            />
          </motion.div>

          {/* Level 5: Entrepreneurship */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="w-full md:w-1/2 z-40"
          >
            <ExpandableBlock 
              title={secondTier.title} 
              items={secondTier.items} 
              customBg="bg-[var(--color-clic-red)]" 
              textColor="text-white" 
              isMain 
            />
          </motion.div>

          {/* Level 4, 3, 2: The 5 STEAM Columns */}
          <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4 my-2 z-30">
            {columns.map((col, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                key={col.name} 
                className="flex flex-col gap-3"
              >
                {/* Sector */}
                <ExpandableBlock 
                  subtitle="Industrial Sector"
                  title={col.sector.title} 
                  items={col.sector.items} 
                  customBg={col.bgClass}
                  borderClass={col.borderClass}
                  textColor={col.colorClass} 
                />
                {/* Focus Fields */}
                <ExpandableBlock 
                  subtitle="Focus Fields"
                  title={col.focus.title} 
                  items={col.focus.items} 
                  customBg={col.bgClass}
                  borderClass={col.borderClass}
                  textColor={col.colorClass} 
                />
                {/* Subject */}
                <ExpandableBlock 
                  subtitle="STEAM Subject"
                  title={col.name} 
                  items={col.subject.items} 
                  customBg="bg-white dark:bg-gray-800"
                  borderClass={col.borderClass}
                  textColor={col.colorClass} 
                  isMain
                />
              </motion.div>
            ))}
          </div>

          {/* Level 1: Base 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-11/12 z-20 mt-2"
          >
            <ExpandableBlock 
              title={baseTier2.title} 
              items={baseTier2.items} 
              customBg="bg-[var(--color-clic-red)]" 
              textColor="text-white" 
              isMain 
            />
          </motion.div>

          {/* Level 0: Base 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full z-10"
          >
            <ExpandableBlock 
              title={baseTier1.title} 
              items={baseTier1.items} 
              customBg="bg-[var(--color-clic-red)]" 
              textColor="text-white" 
              isMain 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TheoryOfChange;
