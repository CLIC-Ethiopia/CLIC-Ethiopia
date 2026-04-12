import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, Info, Download, Image as ImageIcon, Maximize2, Minimize2, X, Printer, Loader2 } from 'lucide-react';
import { toPng } from 'html-to-image';

const peakTier = {
  title: "8+ National Industrialization",
  items: [
    "Large-Scale Manufacturing & Production",
    "Global Supply Chain Integration",
    "Export-Oriented Industrial Strategy",
    "Advanced Infrastructure Development",
    "National Economic Policy & Governance",
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
  title: "Innovation & Entrepreneurship",
  subCards: [
    {
      title: "Innovation",
      items: [
        "Design Thinking",
        "Creative Problem Solving",
        "Prototyping & Testing",
        "Product Development",
        "Market Research",
        "Disruptive Technologies"
      ]
    },
    {
      title: "Entrepreneurship",
      items: [
        "Business Setup", 
        "Entrepreneurship", 
        "Marketing & Sales", 
        "Business Management", 
        "Startup Business Ecosystems", 
        "Project & Human Resource Management"
      ]
    }
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
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-[var(--color-clic-red)] border-slate-200 dark:border-slate-800",
    sector: { 
      title: "Healthcare", 
      items: ["Medical Tech", "Smart Devices", "AI in Healthcare", "Medical Imaging Tech", "Lifestyle Coaching", "Health Coaching"] 
    },
    focus: { 
      title: "Science", 
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
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-[var(--color-clic-orange)] border-slate-200 dark:border-slate-800",
    sector: { 
      title: "Agriculture", 
      items: ["Phytoponics", "Aquaponics", "Hydroponics", "City Farming", "Vertical Farming", "Food Processing", "Agro Industry", "Agri Tech"] 
    },
    focus: { 
      title: "Technology", 
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
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-[var(--color-clic-green)] border-slate-200 dark:border-slate-800",
    sector: { 
      title: "Manufacturing", 
      items: ["Carving", "Jewelry", "Fashion", "Fabric & Apparel", "Woodworking", "Metalworking", "Plumbing/Pipe works", "Product Development", "Production Processes", "Construction Materials", "Cleaning Materials", "Machine Design", "Digital Manufacturing", "Desktop Manufacturing"] 
    },
    focus: { 
      title: "Engineering", 
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
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-[var(--color-clic-blue)] border-slate-200 dark:border-slate-800",
    sector: { 
      title: "Construction", 
      items: ["Road Engineering", "Building Designs", "Interior Design", "Urban planning", "Building management", "Smart infrastructures"] 
    },
    focus: { 
      title: "Arts", 
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
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-[var(--color-clic-purple)] border-slate-200 dark:border-slate-800",
    sector: { 
      title: "Automotive", 
      items: ["Electric Cars", "Electric Scooters", "Electric UTV/ATV", "Automotive Tech", "Drone technology", "Electrification of Engine cars", "AI & Autonomous Vehicles"] 
    },
    focus: { 
      title: "Mathematics", 
      items: ["Applied Mathematics", "Applied Statistics", "Business mathematics", "Industrial Mathematics", "Engineering Mathematics", "Algorithms Development", "Mathematical Software Progrmming"] 
    },
    subject: { 
      title: "Subjects", 
      items: ["Analytics", "Algorithms", "Data Science", "Artificial Intelligence", "Industrial Mathematics", "Engineering Mathematics"] 
    }
  }
];

const ExpandableBlock = ({ title, subtitle, items, customBg, textColor, borderClass, isMain = false, popOut = false, compact = false, forceExpand = false }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const isOpen = forceExpand || isHovered;
  const isPoppedOut = popOut && isHovered && !forceExpand;

  const isDarkBg = customBg && (customBg.includes('bg-[var(--color-clic-') || customBg.includes('bg-indigo-600'));
  const titleColor = isDarkBg ? 'text-white' : textColor || 'text-slate-900 dark:text-white';
  const subtitleColor = isDarkBg ? 'text-white/70' : textColor || 'text-slate-500 dark:text-slate-400';
  const itemColor = isDarkBg ? 'text-white/90' : 'text-slate-700 dark:text-slate-300';
  const borderColor = isDarkBg ? 'border-white/20' : 'border-slate-200 dark:border-slate-800';

  return (
    <div 
      className={`relative outline-none ${popOut ? (compact ? 'w-full h-full min-h-[44px] md:min-h-[52px]' : 'w-full h-full min-h-[70px] md:min-h-[80px]') : 'w-full'} ${isPoppedOut ? 'z-50' : 'z-10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
    >
      <div
        className={`w-full rounded-xl ${compact ? 'p-2 md:p-3' : 'p-3 md:p-4'} cursor-pointer transition-all duration-300 hover:shadow-xl border ${borderClass || borderColor} ${customBg || 'bg-white dark:bg-slate-900'} group flex flex-col ${compact ? 'min-h-[44px] md:min-h-[52px]' : 'min-h-[70px] md:min-h-[80px]'} ${isPoppedOut ? 'absolute z-50 w-max min-w-full left-1/2 -translate-x-1/2 shadow-2xl scale-105' : 'relative overflow-hidden'}`}
      >
        <div className="flex flex-col items-center justify-center text-center relative z-10 w-full h-full flex-grow">
          {subtitle && <span className={`text-[9px] md:text-[10px] uppercase tracking-wider mb-1 font-bold ${subtitleColor}`}>{subtitle}</span>}
          <h4 className={`font-bold ${isMain ? 'text-base md:text-lg' : (compact ? 'text-[11px] md:text-xs' : 'text-xs md:text-sm')} ${titleColor} flex items-center justify-center gap-1 w-full ${isPoppedOut ? 'whitespace-nowrap px-2' : ''}`}>
            {title}
            <ChevronDown className={`w-3 h-3 md:w-3.5 md:h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} lg:hidden flex-shrink-0`} />
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
              <ul className={`mt-2 md:mt-2.5 space-y-1 md:space-y-1.5 text-[11px] md:text-xs text-center pb-1 border-t ${borderColor} pt-2 md:pt-2.5`}>
                {items.map((item: string, i: number) => (
                  <motion.li 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    key={i} 
                    className={`font-medium ${itemColor} ${isPoppedOut ? 'whitespace-nowrap px-3 md:px-4' : ''}`}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const additionalSectors = [
  {
    name: "Infrastructure",
    title: "Infrastructure",
    items: ["Smart Grids", "Transportation Networks", "Water Management", "Telecommunications", "Urban Development", "Waste Management"],
    colorClass: "text-teal-600 dark:text-teal-400",
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-teal-500 border-slate-200 dark:border-slate-800"
  },
  {
    name: "Energy",
    title: "Energy",
    items: ["Renewable Energy", "Energy Storage", "Smart Metering", "Grid Optimization", "Carbon Capture", "Nuclear Tech"],
    colorClass: "text-yellow-600 dark:text-yellow-400",
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-yellow-500 border-slate-200 dark:border-slate-800"
  },
  {
    name: "Finance",
    title: "Finance",
    items: ["FinTech", "Blockchain", "Quantitative Trading", "Risk Management", "Digital Banking", "InsurTech"],
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-emerald-500 border-slate-200 dark:border-slate-800"
  },
  {
    name: "Education",
    title: "Education",
    items: ["EdTech", "E-Learning Platforms", "Corporate Training", "Educational VR/AR", "Learning Analytics", "Curriculum Design"],
    colorClass: "text-indigo-600 dark:text-indigo-400",
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-indigo-500 border-slate-200 dark:border-slate-800"
  },
  {
    name: "Lifestyle",
    title: "Lifestyle",
    items: ["Wellness Apps", "Smart Home Tech", "Wearables", "Personalized Nutrition", "Fitness Tech", "Travel Tech"],
    colorClass: "text-pink-600 dark:text-pink-400",
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-pink-500 border-slate-200 dark:border-slate-800"
  },
  {
    name: "Environment",
    title: "Environment",
    items: ["Climate Tech", "Pollution Control", "Conservation Tech", "Sustainable Materials", "Circular Economy", "Environmental Monitoring"],
    colorClass: "text-cyan-600 dark:text-cyan-400",
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-cyan-500 border-slate-200 dark:border-slate-800"
  },
  {
    name: "Governance",
    title: "Governance",
    items: ["GovTech", "Civic Tech", "Policy Analytics", "Digital Identity", "Smart City Admin", "Regulatory Tech"],
    colorClass: "text-rose-600 dark:text-rose-400",
    bgClass: "bg-white dark:bg-slate-900",
    borderClass: "border-t-4 border-t-rose-500 border-slate-200 dark:border-slate-800"
  }
];

const industrialSectorsList = [
  ...columns.map(col => ({
    name: col.name,
    title: col.sector.title,
    items: col.sector.items,
    bgClass: col.bgClass,
    borderClass: col.borderClass,
    colorClass: col.colorClass
  })),
  ...additionalSectors
];

const TheoryOfChange = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isExpandedAll, setIsExpandedAll] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const pyramidRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleExportPNG = async () => {
    if (!sectionRef.current) return;
    try {
      setIsExporting(true);
      // Small delay to allow UI to update loading state
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await toPng(sectionRef.current, {
        backgroundColor: '#0F172A', // Match slate-950
        pixelRatio: 4, // Increased for higher resolution
        style: {
          // Ensure the exported image doesn't have print-specific styles applied
          padding: '2rem',
        },
        filter: (node) => {
          // Filter out the toolbar from the export
          if (node.id === 'pyramid-toolbar') return false;
          return true;
        }
      });
      
      const link = document.createElement('a');
      link.download = 'clic-educational-pyramid.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export PNG', err);
      alert('Failed to export PNG. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section ref={sectionRef} id="theory-of-change" className={`py-24 bg-slate-950 transition-colors duration-300 relative overflow-hidden print:bg-white print:py-8 ${isExporting ? 'exporting-mode' : ''}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-mudcloth opacity-5 invert pointer-events-none print:hidden"></div>

      {/* Pyramid Visual Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-end z-0 overflow-hidden pb-4 md:pb-12 print:hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="pyramid-level w-full max-w-7xl h-[95%] relative"
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
        <div className="text-center max-w-3xl mx-auto mb-12 print:mb-6">
          <span className="inline-block py-1 px-3 rounded-full bg-[var(--color-clic-blue)]/20 text-blue-300 text-xs font-bold tracking-widest uppercase mb-4 print:text-blue-800 print:bg-blue-100">
            Theory of Knowledge enabled by Generative AI
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif print:text-slate-900">The Educational Pyramid</h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-sm font-bold mb-6 backdrop-blur-sm print:text-indigo-800 print:bg-indigo-50 print:border-indigo-200">
            <Sparkles className="w-4 h-4 text-indigo-400 print:text-indigo-600" />
            <span>200+ Skills synthesized and structured using Gemini Advanced & NotebookLM</span>
          </div>
          <p className="text-xl text-gray-300 print:text-slate-700">
            An interactive roadmap from foundational skills to national industrialization. Hover or tap any block to explore the curriculum.
          </p>
        </div>

        {/* Toolbar */}
        <div id="pyramid-toolbar" className="flex flex-wrap justify-center gap-3 mb-10 print:hidden">
          <button 
            onClick={() => setShowInfoModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors border border-slate-700"
          >
            <Info size={16} />
            How to Read This
          </button>
          <button 
            onClick={() => setIsExpandedAll(!isExpandedAll)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors border border-slate-700"
          >
            {isExpandedAll ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            {isExpandedAll ? 'Collapse All' : 'Expand All'}
          </button>
          <button 
            onClick={handleExportPNG}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
            {isExporting ? 'Exporting...' : 'Export PNG'}
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-clic-blue)] hover:bg-blue-700 text-white text-sm font-medium transition-colors border border-blue-600"
          >
            <Printer size={16} />
            Print / PDF
          </button>
        </div>

        {/* Pyramid Container */}
        <div ref={pyramidRef} className="flex flex-col items-center gap-3 w-full relative z-10 print:bg-white print:text-black">
          
          {/* Level 7: National Industrialization */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
            className="pyramid-level w-full md:w-1/4 z-[70] hover:z-[100] focus-within:z-[100]"
          >
            <ExpandableBlock 
              title={peakTier.title} 
              items={peakTier.items} 
              customBg="bg-[var(--color-clic-blue)]" 
              textColor="text-white" 
              isMain 
              forceExpand={isExpandedAll}
            />
          </motion.div>

          {/* Level 6: Business Philosophy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
            className="pyramid-level w-full md:w-1/3 z-[60] hover:z-[100] focus-within:z-[100]"
          >
            <ExpandableBlock 
              title={topTier.title} 
              items={topTier.items} 
              customBg="bg-[var(--color-clic-orange)]" 
              textColor="text-white" 
              isMain 
              forceExpand={isExpandedAll}
            />
          </motion.div>

          {/* Level 5: Innovation & Entrepreneurship */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="pyramid-level w-full md:w-1/2 z-[50] hover:z-[100] focus-within:z-[100] bg-white/5 dark:bg-gray-800/50 rounded-2xl p-4 md:p-6 border border-white/10 backdrop-blur-sm"
          >
            <h3 className="text-center text-white font-bold mb-4 text-sm md:text-base tracking-widest uppercase">{secondTier.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {secondTier.subCards.map((card) => (
                <ExpandableBlock 
                  key={card.title}
                  title={card.title} 
                  items={card.items} 
                  customBg="bg-[var(--color-clic-red)]" 
                  textColor="text-white" 
                  popOut={true}
                  forceExpand={isExpandedAll}
                />
              ))}
            </div>
          </motion.div>

          {/* Level 4: Industrial Sector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="pyramid-level w-full md:w-2/3 z-[40] hover:z-[100] focus-within:z-[100] bg-white/5 dark:bg-gray-800/50 rounded-2xl p-4 md:p-6 border border-white/10 backdrop-blur-sm"
          >
            <h3 className="text-center text-white font-bold mb-4 text-sm md:text-base tracking-widest uppercase">Industrial Sector</h3>
            
            {/* Mobile Layout: Fluid Staggered Grid */}
            <div className="flex md:hidden flex-wrap justify-center gap-2">
              {industrialSectorsList.map((col) => (
                <div key={col.name} className="flex-grow basis-[130px] max-w-[180px]">
                  <ExpandableBlock 
                    title={col.title} 
                    items={col.items} 
                    customBg={col.bgClass}
                    borderClass={col.borderClass}
                    textColor={col.colorClass} 
                    popOut={true}
                    compact={true}
                    forceExpand={isExpandedAll}
                  />
                </div>
              ))}
            </div>

            {/* Desktop Layout: Pyramid Structure (3, 4, 5) */}
            <div className="hidden md:flex flex-col gap-3 items-center w-full">
              <div className="flex w-full justify-center gap-3">
                {industrialSectorsList.slice(0, 3).map((col) => (
                  <div key={col.name} className="flex-1 max-w-[30%]">
                    <ExpandableBlock 
                      title={col.title} 
                      items={col.items} 
                      customBg={col.bgClass}
                      borderClass={col.borderClass}
                      textColor={col.colorClass} 
                      popOut={true}
                      compact={true}
                      forceExpand={isExpandedAll}
                    />
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-center gap-3">
                {industrialSectorsList.slice(3, 7).map((col) => (
                  <div key={col.name} className="flex-1 max-w-[24%]">
                    <ExpandableBlock 
                      title={col.title} 
                      items={col.items} 
                      customBg={col.bgClass}
                      borderClass={col.borderClass}
                      textColor={col.colorClass} 
                      popOut={true}
                      compact={true}
                      forceExpand={isExpandedAll}
                    />
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-center gap-3">
                {industrialSectorsList.slice(7, 12).map((col) => (
                  <div key={col.name} className="flex-1 max-w-[19%]">
                    <ExpandableBlock 
                      title={col.title} 
                      items={col.items} 
                      customBg={col.bgClass}
                      borderClass={col.borderClass}
                      textColor={col.colorClass} 
                      popOut={true}
                      compact={true}
                      forceExpand={isExpandedAll}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Level 3: Industrial STEAM */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pyramid-level w-full md:w-3/4 z-[30] hover:z-[100] focus-within:z-[100] bg-white/5 dark:bg-gray-800/50 rounded-2xl p-4 md:p-6 border border-white/10 backdrop-blur-sm"
          >
            <h3 className="text-center text-white font-bold mb-4 text-sm md:text-base tracking-widest uppercase">Industrial STEAM</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {columns.map((col) => (
                <ExpandableBlock 
                  key={col.name}
                  title={col.focus.title} 
                  items={col.focus.items} 
                  customBg={col.bgClass}
                  borderClass={col.borderClass}
                  textColor={col.colorClass} 
                  popOut={true}
                  forceExpand={isExpandedAll}
                />
              ))}
            </div>
          </motion.div>

          {/* Level 2: Applied STEAM */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="pyramid-level w-full md:w-5/6 z-[20] hover:z-[100] focus-within:z-[100] bg-white/5 dark:bg-gray-800/50 rounded-2xl p-4 md:p-6 border border-white/10 backdrop-blur-sm"
          >
            <h3 className="text-center text-white font-bold mb-4 text-sm md:text-base tracking-widest uppercase">Applied STEAM</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {columns.map((col) => (
                <ExpandableBlock 
                  key={col.name}
                  title={col.name} 
                  items={col.subject.items} 
                  customBg={col.bgClass}
                  borderClass={col.borderClass}
                  textColor={col.colorClass} 
                  isMain
                  popOut={true}
                  forceExpand={isExpandedAll}
                />
              ))}
            </div>
          </motion.div>

          {/* Level 1: Base 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pyramid-level w-full md:w-11/12 z-[10] hover:z-[100] focus-within:z-[100] mt-2"
          >
            <ExpandableBlock 
              title={baseTier2.title} 
              items={baseTier2.items} 
              customBg="bg-[var(--color-clic-red)]" 
              textColor="text-white" 
              isMain 
              forceExpand={isExpandedAll}
            />
          </motion.div>

          {/* Level 0: Base 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="pyramid-level w-full z-0 hover:z-[100] focus-within:z-[100]"
          >
            <ExpandableBlock 
              title={baseTier1.title} 
              items={baseTier1.items} 
              customBg="bg-[var(--color-clic-red)]" 
              textColor="text-white" 
              isMain 
              forceExpand={isExpandedAll}
            />
          </motion.div>

        </div>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfoModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 print:hidden">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
              onClick={() => setShowInfoModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 max-w-lg w-full"
            >
              <button 
                onClick={() => setShowInfoModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} className="text-slate-500" />
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Info size={24} />
                </div>
                <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">How to Read This</h3>
              </div>
              
              <div className="space-y-4 text-slate-600 dark:text-slate-300">
                <p>The Educational Pyramid illustrates the progression from foundational skills to advanced innovation.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Bottom Tiers:</strong> Foundational skills required for all students (Language, IT).</li>
                  <li><strong>Middle Tiers:</strong> Applied STEAM and Industrial sectors showing specific career and project paths.</li>
                  <li><strong>Top Tiers:</strong> Advanced concepts in entrepreneurship, business philosophy, and local innovation.</li>
                </ul>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mt-4">
                  <p className="text-sm font-medium"><strong>Interaction Tips:</strong></p>
                  <ul className="list-disc pl-5 text-sm mt-2 space-y-1">
                    <li>Hover or click any block to reveal its detailed curriculum.</li>
                    <li>Use "Expand All" to view the entire dataset at once.</li>
                    <li>Use "Export PNG" or "Print / PDF" to save the diagram for reports.</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setShowInfoModal(false)}
                  className="px-6 py-2 rounded-lg bg-[var(--color-clic-blue)] hover:bg-blue-700 text-white font-medium transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TheoryOfChange;
