import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FlaskConical, Cpu, Compass, Palette, Calculator, 
  ChevronRight, ArrowRight, BookOpen, Factory, 
  Sprout, Building2, HeartHandshake, UserPlus, Menu, X,
  Globe, Lightbulb, GraduationCap, Target, Rocket, Briefcase,
  BarChart3, Clock, Users, Trophy, Zap, Microscope, Hammer,
  Car, Coins, Home, Recycle, Server, Landmark
} from 'lucide-react';

// --- Components ---

const InfoModal = ({ isOpen, onClose, data }: { isOpen: boolean; onClose: () => void; data: any }) => {
  if (!isOpen || !data) return null;
  const { title, color, icon: Icon, description, detailedContent, stats } = data;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <X size={20} className="text-gray-600" />
            </button>
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: color }}>
                  <Icon size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 font-serif">{title}</h3>
                  <div className="h-1 w-20 rounded-full mt-2" style={{ backgroundColor: color }}></div>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{description}</p>
              
              {stats && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {stats.map((stat: any, i: number) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                      <div className="text-2xl font-black mb-1" style={{ color: color }}>{stat.value}</div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="prose prose-lg text-gray-600 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p>{detailedContent}</p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100 flex justify-end">
                <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-white transition-transform active:scale-95 shadow-md hover:shadow-lg" style={{ backgroundColor: color }}>
                  Close Details
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'STEAM', href: '#steam' },
    { name: 'IE', href: '#ie' },
    { name: 'Labs', href: '#labs' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <div className="flex">
              <span className="text-3xl font-black text-[var(--color-clic-red)] tracking-tighter">C</span>
              <span className="text-3xl font-black text-[var(--color-clic-orange)] tracking-tighter">L</span>
              <span className="text-3xl font-black text-[var(--color-clic-green)] tracking-tighter">I</span>
              <span className="text-3xl font-black text-[var(--color-clic-blue)] tracking-tighter">C</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold leading-none ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Ethiopia</span>
              <span className={`text-[0.5rem] font-semibold uppercase tracking-widest ${isScrolled ? 'text-gray-500' : 'text-gray-300'}`}>Creative Learning</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className={`text-sm font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                {link.name}
              </a>
            ))}
            <div className="flex gap-4">
              <a href="#register" className="px-5 py-2.5 rounded-full text-sm font-bold bg-white text-gray-900 hover:bg-gray-100 transition-colors shadow-sm">
                Register
              </a>
              <a href="#donate" className="px-5 py-2.5 rounded-full text-sm font-bold bg-[var(--color-clic-red)] text-white hover:bg-opacity-90 transition-colors shadow-sm">
                Donate
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-gray-900' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t mt-4"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-semibold text-gray-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="my-2" />
              <a href="#register" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3 text-center rounded-lg text-base font-bold bg-gray-100 text-gray-900">
                Register for Courses
              </a>
              <a href="#donate" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3 text-center rounded-lg text-base font-bold bg-[var(--color-clic-red)] text-white">
                Support Our Mission
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gray-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://loremflickr.com/1920/1080/technology,education,africa" 
          alt="Ethiopian Students Learning" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Vision Smart-Ethiopia 2025 EC
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 font-serif">
              Building Smart Citizens for the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-clic-green)] to-[var(--color-clic-blue)]">Ethiopia</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Creative Learning in Community (CLIC) provides practical STEAM-IE education to empower aspiring Ethiopian young entrepreneurs across every industrial sector.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#register" className="px-8 py-4 rounded-full text-base font-bold bg-white text-gray-900 hover:bg-gray-100 transition-colors flex items-center gap-2">
                Start Learning <ArrowRight size={18} />
              </a>
              <a href="#about" className="px-8 py-4 rounded-full text-base font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm">
                Discover Our Mission
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative STEAM Elements */}
      <div className="absolute right-10 bottom-10 hidden lg:flex gap-4 opacity-50">
        {[
          { icon: FlaskConical, color: 'var(--color-clic-red)' },
          { icon: Cpu, color: 'var(--color-clic-orange)' },
          { icon: Compass, color: 'var(--color-clic-green)' },
          { icon: Palette, color: 'var(--color-clic-blue)' },
          { icon: Calculator, color: 'var(--color-clic-purple)' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20"
            style={{ color: item.color }}
          >
            <item.icon size={32} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
              National Initiative for New Opportunities
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Founded by Dr. Ir. Frehun Adefris, CLIC Ethiopia aims to train 1 Million Ethiopians by 2025 EC. We bring new opportunities in Education, Industrialization, Digital Transformation, and High-Tech Entrepreneurship.
            </p>
            
            <div className="space-y-6">
              {[
                { 
                  icon: Target, 
                  title: 'Our Mission', 
                  desc: 'Prepare Ethiopians for their professional future through practical interdisciplinary trainings using state-of-the-art STEAM laboratories.' 
                },
                { 
                  icon: Lightbulb, 
                  title: 'Our Vision', 
                  desc: 'Create top technical talent for the future of Ethiopian industries and businesses, inspiring self-sufficient contributors to society.' 
                },
                { 
                  icon: Globe, 
                  title: 'Our Operations', 
                  desc: 'We operate in every region, every major city, and every locality within the country and beyond.' 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-clic-light)] flex items-center justify-center text-[var(--color-clic-orange)]">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden relative">
              <img 
                src="https://loremflickr.com/800/800/innovation,africa,business" 
                alt="Innovation in Ethiopia" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-clic-red)]/40 to-transparent mix-blend-multiply"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
              <div className="text-4xl font-black text-[var(--color-clic-blue)] mb-2">1M+</div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ethiopians to be trained by 2025 EC</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SteamSection = () => {
  const [selectedField, setSelectedField] = useState<any>(null);

  const steamFields = [
    { 
      letter: 'S', name: 'Science', color: 'var(--color-clic-red)', icon: FlaskConical, 
      desc: 'Gives tools to experiment, test, and evaluate ideas to understand the world.',
      stats: [{ label: 'Modules', value: '12+' }, { label: 'Experiments', value: '50+' }, { label: 'Hours', value: '120' }],
      detailedContent: 'Our Science curriculum covers Biotechnology, Agricultural Science, Chemical Science, and Environmental Science. Students engage in hands-on experiments to understand the fundamental laws of nature and apply them to solve local challenges.'
    },
    { 
      letter: 'T', name: 'Technology', color: 'var(--color-clic-orange)', icon: Cpu, 
      desc: 'Teaches how to process, connect, and make things in a variety of environments.',
      stats: [{ label: 'Tools', value: '25+' }, { label: 'Projects', value: '40+' }, { label: 'Skills', value: '15' }],
      detailedContent: 'Focuses on Electronics, IoT Systems, Computer Programming, and Digital Communications. Students learn to build smart devices, code applications, and leverage digital tools for industrial transformation.'
    },
    { 
      letter: 'E', name: 'Engineering', color: 'var(--color-clic-green)', icon: Compass, 
      desc: 'Teaches the cycle of innovation, inventing solutions, and making changes.',
      stats: [{ label: 'Designs', value: '100+' }, { label: 'Prototypes', value: '30+' }, { label: 'Methods', value: '10' }],
      detailedContent: 'Covers Architecture, Manufacturing, Process Automation, and Robotics. Students learn the engineering design process, from ideation to prototyping and final production.'
    },
    { 
      letter: 'A', name: 'Arts', color: 'var(--color-clic-blue)', icon: Palette, 
      desc: 'Teaches symbolic & expressive capacities that reach across cultural barriers.',
      stats: [{ label: 'Mediums', value: '8' }, { label: 'Exhibits', value: '12' }, { label: 'Creative', value: '∞' }],
      detailedContent: 'Integrates Fine Arts, Digital Arts, and Technical Arts. We believe creativity is the catalyst for innovation. Students explore graphics design, 3D modeling, and multimedia storytelling.'
    },
    { 
      letter: 'M', name: 'Mathematics', color: 'var(--color-clic-purple)', icon: Calculator, 
      desc: 'Provides the tools & structures to analyze facts, events, and scenarios.',
      stats: [{ label: 'Models', value: '20+' }, { label: 'Algorithms', value: '15+' }, { label: 'Logic', value: '100%' }],
      detailedContent: 'Applied Mathematics, Statistics, and Data Science. We move beyond theory to application, using math to model real-world systems, analyze business data, and optimize industrial processes.'
    },
  ];

  return (
    <section id="steam" className="py-24 bg-[var(--color-clic-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">What is STEAM?</h2>
          <p className="text-xl text-gray-600">
            It is the New Evolution of Literacy. An interdisciplinary skill set that empowers students to be curious learners, critical thinkers & creative problem solvers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steamFields.map((field, i) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border-t-4 flex flex-col h-full group cursor-pointer"
              style={{ borderTopColor: field.color }}
              onClick={() => setSelectedField({ ...field, title: field.name })}
            >
              <div className="flex flex-col items-center text-center flex-grow">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: field.color }}
                >
                  <field.icon size={32} />
                </div>
                <h3 className="text-5xl font-black mb-2" style={{ color: field.color }}>{field.letter}</h3>
                <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">{field.name}</h4>
                <p className="text-sm text-gray-600 mb-6">{field.desc}</p>
                
                {/* Mini Stats */}
                <div className="grid grid-cols-3 gap-2 w-full mb-6 border-t border-gray-100 pt-4">
                  {field.stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xs font-bold" style={{ color: field.color }}>{stat.value}</div>
                      <div className="text-[0.6rem] text-gray-400 uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                className="w-full py-2 rounded-lg text-sm font-bold text-white transition-opacity"
                style={{ backgroundColor: field.color }}
              >
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <InfoModal 
        isOpen={!!selectedField} 
        onClose={() => setSelectedField(null)} 
        data={selectedField} 
      />
    </section>
  );
};

const IESection = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const ieData = {
    innovation: {
      title: 'Innovation',
      color: 'var(--color-clic-orange)',
      icon: Lightbulb,
      description: 'Fostering a culture of creativity and problem-solving. We provide the tools and environment for students to experiment, prototype, and develop unique solutions to real-world challenges.',
      stats: [
        { label: 'Patents Filed', value: '15+' },
        { label: 'Prototypes', value: '200+' },
        { label: 'R&D Hours', value: '5k+' }
      ],
      detailedContent: 'Our Innovation hub focuses on Research & Development, Prototyping, and Design Thinking. We support students in protecting their intellectual property through patent support and connecting them with industrial partners for pilot testing.'
    },
    entrepreneurship: {
      title: 'Entrepreneurship',
      color: 'var(--color-clic-green)',
      icon: Rocket,
      description: 'Building the business leaders of tomorrow. We offer incubation support, mentorship, and resources to help transform innovative projects into viable, scalable startups.',
      stats: [
        { label: 'Startups', value: '25+' },
        { label: 'Mentors', value: '40+' },
        { label: 'Funding', value: '$12M' }
      ],
      detailedContent: 'The Entrepreneurship track includes Business Incubation, Startup Mentorship, and Market Analysis. We guide young entrepreneurs through the entire lifecycle of a startup, from business plan development to securing seed funding and scaling operations.'
    }
  };

  return (
    <section id="ie" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">Innovation & Entrepreneurship</h2>
          <p className="text-xl text-gray-600">
            The "IE" in STEAM-IE. We empower the next generation to turn creative ideas into sustainable businesses and solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Innovation Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--color-clic-light)] rounded-3xl p-8 md:p-12 border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
            onClick={() => setSelectedItem(ieData.innovation)}
          >
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
               <img src="https://loremflickr.com/600/400/idea,technology" alt="Innovation" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-clic-orange)]/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500 z-0"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white text-[var(--color-clic-orange)] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Fostering a culture of creativity and problem-solving. We provide the tools and environment for students to experiment, prototype, and develop unique solutions to real-world challenges.
              </p>
              
              <div className="flex gap-6 mb-8">
                {ieData.innovation.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-[var(--color-clic-orange)]">{stat.value}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>

              <button className="px-6 py-3 rounded-xl font-bold text-white bg-[var(--color-clic-orange)] hover:bg-opacity-90 transition-colors shadow-md flex items-center gap-2">
                Explore Innovation <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Entrepreneurship Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--color-clic-light)] rounded-3xl p-8 md:p-12 border border-gray-100 hover:shadow-xl transition-all relative overflow-hidden group cursor-pointer"
            onClick={() => setSelectedItem(ieData.entrepreneurship)}
          >
            <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
               <img src="https://loremflickr.com/600/400/startup,business" alt="Entrepreneurship" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-clic-green)]/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500 z-0"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white text-[var(--color-clic-green)] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                <Rocket size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Entrepreneurship</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Building the business leaders of tomorrow. We offer incubation support, mentorship, and resources to help transform innovative projects into viable, scalable startups.
              </p>

              <div className="flex gap-6 mb-8">
                {ieData.entrepreneurship.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-[var(--color-clic-green)]">{stat.value}</div>
                    <div className="text-xs font-bold text-gray-500 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>

              <button className="px-6 py-3 rounded-xl font-bold text-white bg-[var(--color-clic-green)] hover:bg-opacity-90 transition-colors shadow-md flex items-center gap-2">
                Start Business <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <InfoModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        data={selectedItem} 
      />
    </section>
  );
};

const Labs = () => {
  const [selectedLab, setSelectedLab] = useState<any>(null);

  const labs = [
    {
      title: 'Digital Labs',
      icon: BookOpen,
      color: 'var(--color-clic-blue)',
      desc: 'The Future of Classrooms. E-learning platforms for remote classes, using VR & AR as new training methods.',
      image: 'https://loremflickr.com/600/400/computer,code,classroom',
      stats: [{ label: 'Students', value: '500+' }, { label: 'Courses', value: '25' }, { label: 'VR Units', value: '50' }],
      detailedContent: 'Digital Labs are designed for learning skills using digital means. Includes Basic Literacy Skills (Language, Computer HW/SW) and Theoretical Skills delivered via virtual classrooms. Features a Data Center for digital solutions, IoT, and AI.'
    },
    {
      title: 'Fabrication Labs',
      icon: Factory,
      color: 'var(--color-clic-orange)',
      desc: 'Smart workshops for practical lessons. Prototyping & small scale production labs using smart fabrication technologies.',
      image: 'https://loremflickr.com/600/400/robotics,factory,workshop',
      stats: [{ label: 'Machines', value: '15+' }, { label: 'Tools', value: '200+' }, { label: 'Safety', value: '100%' }],
      detailedContent: 'Workshops for hands-on skills using state-of-the-art tools. Covers Basic Tools Skills, Design & Fabrication (CAD/CAM), and Prototyping & Manufacturing. Learn to manufacture, distribute, and market products.'
    },
    {
      title: 'Field Labs',
      icon: Sprout,
      color: 'var(--color-clic-green)',
      desc: 'State of the Art field projects. On-the-job hands-on practical trainings and large scale production plants.',
      image: 'https://loremflickr.com/600/400/agriculture,solar,farm',
      stats: [{ label: 'Sites', value: '10' }, { label: 'Projects', value: '15' }, { label: 'Impact', value: 'High' }],
      detailedContent: 'Includes Field Workshops for digital learning in the field, Practical Attachment for on-the-job training with professionals, and On-the-Job Trainings for short-term assignments on field projects.'
    },
    {
      title: 'Smart City Labs',
      icon: Building2,
      color: 'var(--color-clic-purple)',
      desc: 'A place for 10,000 to 100,000 innovators per region! Smart houses, smart factories, and smart businesses.',
      image: 'https://loremflickr.com/600/400/smartcity,architecture,modern',
      stats: [{ label: 'Capacity', value: '10k+' }, { label: 'Zones', value: '3' }, { label: 'Vision', value: '2025' }],
      detailedContent: 'Smart industrial cities built as a business & manufacturing hub. Features Smart Industry (Smart factories, R&D), Smart Business (Data centers, Incubation), and Smart Living (Budget housing, Smart energy, Smart farming).'
    }
  ];

  return (
    <section id="labs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Smart Creative Laboratories</h2>
            <p className="text-lg text-gray-600">
              Four types of specialized labs designed to deliver practical, hands-on STEAM education across Ethiopia.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative rounded-3xl overflow-hidden bg-gray-900 aspect-[4/3] sm:aspect-[16/9] cursor-pointer shadow-lg hover:shadow-2xl transition-all"
              onClick={() => setSelectedLab(lab)}
            >
              <img 
                src={lab.image} 
                alt={lab.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-white backdrop-blur-md shadow-lg"
                  style={{ backgroundColor: `${lab.color}90` }}
                >
                  <lab.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{lab.title}</h3>
                <p className="text-gray-300 max-w-md mb-4 line-clamp-2">{lab.desc}</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                    Explore Lab
                  </span>
                  
                  <div className="flex gap-4 ml-auto">
                    {lab.stats.slice(0, 2).map((stat, idx) => (
                      <div key={idx} className="text-right">
                        <div className="text-white font-bold text-sm">{stat.value}</div>
                        <div className="text-gray-400 text-[0.6rem] uppercase">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <InfoModal 
        isOpen={!!selectedLab} 
        onClose={() => setSelectedLab(null)} 
        data={selectedLab} 
      />
    </section>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const projects = [
    { 
      category: 'Smart Agriculture', count: '5 Projects', color: 'var(--color-clic-green)', icon: Sprout,
      items: ['Phytoponics & Hydroponics', 'Vertical Agriculture', 'Smart Livestock Farming'],
      stats: [{ label: 'Yield', value: '+300%' }, { label: 'Water', value: '-90%' }, { label: 'Space', value: 'Optimized' }],
      detailedContent: 'Includes Phytoponics (Hydroponics farming powered by solar), Vertical agriculture systems for any size of space, and Smart Livestock Farming with automation in poultry farms. Aiming to increase vegetable production multiple folds.'
    },
    { 
      category: 'Smart Healthcare', count: '10 Projects', color: 'var(--color-clic-red)', icon: HeartHandshake,
      items: ['Portable Smart Healthcare', '4G Enabled IT Systems', 'Solar Powered Medical Kits'],
      stats: [{ label: 'Portability', value: '100%' }, { label: 'Access', value: 'Remote' }, { label: 'Cost', value: 'Low' }],
      detailedContent: 'Highly portable smart healthcare systems that fit into a suitcase. Ultra-efficient 4G enabled IT systems including handheld ultrasound, smart phones, and wearable devices. Applications for cancer, HIV/AIDS, Diabetes, and emergency care.'
    },
    { 
      category: 'Smart Manufacturing', count: '12 Projects', color: 'var(--color-clic-orange)', icon: Factory,
      items: ['Smart Factories', 'Specialty Robotics', 'Process Automation'],
      stats: [{ label: 'Efficiency', value: 'High' }, { label: 'Waste', value: 'Zero' }, { label: 'Quality', value: 'Best' }],
      detailedContent: 'Smart factories for different industrial sectors. Includes Smart Industrial Robotics (Computer Aided Design, Machine Assembly), and Smart Metal, Plastic, Wood, Textile & Leather Works using small-scale fabrication technologies.'
    },
    { 
      category: 'Smart Construction', count: '7 Projects', color: 'var(--color-clic-blue)', icon: Building2,
      items: ['3D House Printing', 'Modular Prefabrication', 'Digital Construction Mgmt'],
      stats: [{ label: 'Speed', value: 'Fast' }, { label: 'Cost', value: 'Affordable' }, { label: 'Eco', value: 'Friendly' }],
      detailedContent: 'Use of state-of-the-art technologies to build smart industrial villages. Resource efficient tools including 3D house printing machineries and modular concrete prefabrication technologies for rural areas.'
    },
    { 
      category: 'Smart Mobility', count: '5 Projects', color: 'var(--color-clic-purple)', icon: Car,
      items: ['Electric UTVs/ATVs', 'Solar Powered Batteries', 'Smart Traffic Systems'],
      stats: [{ label: 'Cost', value: '-40%' }, { label: 'Emission', value: '0%' }, { label: 'Range', value: '150km' }],
      detailedContent: 'Modular city mobility solutions and electric utility vehicles for rural Ethiopia. Powered by efficient battery packs and solar charging. Includes conversion kits for old engines to electric.'
    },
    { 
      category: 'Smart Energy', count: '5 Projects', color: 'var(--color-clic-green)', icon: Zap,
      items: ['Modular Wind Energy', 'Micro Hydropower', 'Off-grid Metering'],
      stats: [{ label: 'Power', value: '24/7' }, { label: 'Green', value: '100%' }, { label: 'Cost', value: 'Low' }],
      detailedContent: 'Harvesting green energy using modular systems. Bringing electricity to villages not connected to the national grid using solar, wind, and hydro sources. Smart off-grid metering systems.'
    },
    { 
      category: 'Smart Finance', count: '6 Projects', color: 'var(--color-clic-red)', icon: Coins,
      items: ['Digital Coins', 'Smart POS Systems', 'Mobile Payments'],
      stats: [{ label: 'Speed', value: 'Instant' }, { label: 'Security', value: 'High' }, { label: 'Access', value: 'All' }],
      detailedContent: 'Integration of digital payment solutions and smart POS infrastructures. Enabling safe and secured transactions across all industries and private citizens. Includes crypto currency integration.'
    },
    { 
      category: 'Smart Education', count: '7 Projects', color: 'var(--color-clic-orange)', icon: GraduationCap,
      items: ['E-learning Platforms', 'VR/AR Classrooms', 'STEM Kits'],
      stats: [{ label: 'Reach', value: 'Remote' }, { label: 'Content', value: 'Rich' }, { label: 'Skills', value: 'Future' }],
      detailedContent: 'Smart education delivery including remote areas. Offers highly specialized technical skills and content-oriented practical lessons via digital platforms and virtual reality.'
    },
    { 
      category: 'Smart Lifestyle', count: '3 Projects', color: 'var(--color-clic-blue)', icon: Home,
      items: ['Smart Cooking Stoves', 'Solar LED Lamps', 'Android TV Systems'],
      stats: [{ label: 'Smoke', value: '0%' }, { label: 'Power', value: 'Solar' }, { label: 'Life', value: 'Better' }],
      detailedContent: 'Improving daily life with smart home technologies. Includes smokeless cooking stoves using biodegradable fuel, efficient solar lighting, and educational entertainment systems.'
    },
    { 
      category: 'Smart Environment', count: '4 Projects', color: 'var(--color-clic-purple)', icon: Recycle,
      items: ['Plastic Recycling', 'Textile Waste Mgmt', 'Bio-fuel Production'],
      stats: [{ label: 'Waste', value: '-80%' }, { label: 'Value', value: 'Added' }, { label: 'Eco', value: 'Safe' }],
      detailedContent: 'Small scale recycling plants for textiles and plastic wastes. Converting waste into usable products and energy sources. Environmentally friendly and safe operating atmosphere.'
    },
    { 
      category: 'Smart Infrastructure', count: '12 Projects', color: 'var(--color-clic-green)', icon: Server,
      items: ['National Data Centers', 'Smart Roads', 'Digital Services'],
      stats: [{ label: 'Uptime', value: '99.9%' }, { label: 'Connect', value: 'Fast' }, { label: 'Data', value: 'Secure' }],
      detailedContent: 'Nationally connected data centers and smart road construction technologies for efficient transportation, supply chain, and logistics. Digital services for every industrial sector.'
    },
    { 
      category: 'Smart Governance', count: '15 Projects', color: 'var(--color-clic-red)', icon: Landmark,
      items: ['Public Service Apps', 'Digital ID Systems', 'Civic Engagement'],
      stats: [{ label: 'Service', value: 'Fast' }, { label: 'Transp.', value: '100%' }, { label: 'Access', value: 'Easy' }],
      detailedContent: 'Digitizing public services for better governance. Smart systems for efficient administration, citizen engagement, and smart public projects.'
    },
  ];

  return (
    <section id="projects" className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6 font-serif">200+ Applied Industrial Projects</h2>
          <p className="text-xl text-gray-400">
            Learning through projects while solving real-life industrial and business problems from different sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-gray-500 transition-all hover:bg-gray-750 cursor-pointer group"
              onClick={() => setSelectedProject({ ...proj, title: proj.category, description: `Explore our ${proj.category} initiatives.` })}
            >
              <div className="flex justify-between items-start mb-4">
                <div 
                  className="text-xs font-bold uppercase tracking-wider inline-block px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${proj.color}20`, color: proj.color }}
                >
                  {proj.count}
                </div>
                <div className="p-2 rounded-full bg-gray-700 text-gray-400 group-hover:text-white transition-colors">
                  <proj.icon size={16} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">{proj.category}</h3>
              <ul className="space-y-3 mb-6">
                {proj.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                    <ChevronRight size={16} className="mt-0.5 flex-shrink-0" style={{ color: proj.color }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">View Details</span>
                <ArrowRight size={16} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <InfoModal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        data={selectedProject} 
      />
    </section>
  );
};

const Donate = () => {
  return (
    <section id="donate" className="py-24 bg-[var(--color-clic-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-16 flex flex-col justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-clic-red)]/10 text-[var(--color-clic-red)] flex items-center justify-center mb-8">
                <HeartHandshake size={32} />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">Support Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8">
                Your donation helps us build smart creative laboratories, provide course kits, and train the next generation of Ethiopian innovators and entrepreneurs.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { amount: 'ETB 500', desc: 'Provides basic course kits' },
                  { amount: 'ETB 2,500', desc: 'Sponsors one student training' },
                  { amount: 'ETB 10,000', desc: 'Annual lab membership' },
                  { amount: 'Custom', desc: 'Any amount helps' }
                ].map((tier, i) => (
                  <button key={i} className="p-4 rounded-xl border-2 border-gray-100 hover:border-[var(--color-clic-red)] hover:bg-[var(--color-clic-red)]/5 transition-all text-left group">
                    <div className="font-bold text-gray-900 group-hover:text-[var(--color-clic-red)]">{tier.amount}</div>
                    <div className="text-xs text-gray-500 mt-1">{tier.desc}</div>
                  </button>
                ))}
              </div>
              
              <button className="w-full py-4 rounded-xl font-bold text-white bg-[var(--color-clic-red)] hover:bg-opacity-90 transition-colors shadow-md flex items-center justify-center gap-2">
                Donate Now <ArrowRight size={18} />
              </button>
            </div>
            
            <div className="relative hidden lg:block">
              <img 
                src="https://loremflickr.com/800/1000/community,africa,happy" 
                alt="Community Support" 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Register = () => {
  return (
    <section id="register" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--color-clic-blue)]/10 text-[var(--color-clic-blue)] flex items-center justify-center mb-6">
            <UserPlus size={32} />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">Join CLIC Ethiopia</h2>
          <p className="text-lg text-gray-600">
            Register for our STEAM-IE courses and become part of the digital transformation.
          </p>
        </div>

        <form className="space-y-6 bg-[var(--color-clic-light)] p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)] focus:border-transparent outline-none transition-all" placeholder="Abebe" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
              <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)] focus:border-transparent outline-none transition-all" placeholder="Kebede" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)] focus:border-transparent outline-none transition-all" placeholder="abebe@example.com" />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Membership Type</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-clic-blue)] focus:border-transparent outline-none transition-all bg-white">
              <option>Youth (High school graduates)</option>
              <option>Students (Elementary & High school)</option>
              <option>Graduates (Certificate holders)</option>
              <option>Professionals (Employed)</option>
              <option>Businesses (Industrial sector)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Area of Interest</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Science', 'Technology', 'Engineering', 'Arts', 'Mathematics', 'Entrepreneurship'].map((interest) => (
                <label key={interest} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 bg-white cursor-pointer hover:bg-gray-50">
                  <input type="checkbox" className="rounded text-[var(--color-clic-blue)] focus:ring-[var(--color-clic-blue)]" />
                  <span className="text-sm text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="button" className="w-full py-4 rounded-xl font-bold text-white bg-[var(--color-clic-blue)] hover:bg-opacity-90 transition-colors shadow-md mt-4">
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                <span className="text-3xl font-black text-[var(--color-clic-red)] tracking-tighter">C</span>
                <span className="text-3xl font-black text-[var(--color-clic-orange)] tracking-tighter">L</span>
                <span className="text-3xl font-black text-[var(--color-clic-green)] tracking-tighter">I</span>
                <span className="text-3xl font-black text-[var(--color-clic-blue)] tracking-tighter">C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold leading-none text-white">Ethiopia</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              Creative Learning in Community. Bringing new STEAM skills across the nation enabling industrialization, digital transformation and tech entrepreneurship.
            </p>
            <div className="text-sm text-gray-400">
              <p>Email: frehun@fadlab.tech</p>
              <p>Phone: 09 11 692277</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#steam" className="hover:text-white transition-colors">What is STEAM?</a></li>
              <li><a href="#labs" className="hover:text-white transition-colors">Our Labs</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Get Involved</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#register" className="hover:text-white transition-colors">Register as Student</a></li>
              <li><a href="#donate" className="hover:text-white transition-colors">Donate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner with Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CLIC Ethiopia. All rights reserved.</p>
          <p>Prepared by Prof. Frehun Adefris</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <SteamSection />
        <IESection />
        <Labs />
        <Projects />
        <Donate />
        <Register />
      </main>
      <Footer />
    </div>
  );
}
