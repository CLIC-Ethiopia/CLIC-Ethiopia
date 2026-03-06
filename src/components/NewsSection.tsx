import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Play, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const InnovatorSpotlight = () => {
  const stories = [
    {
      id: 1,
      name: "Betelhem Desalegn",
      project: "Solar-Smart Irrigation",
      image: "https://loremflickr.com/400/400/student,ethiopian,woman",
      prototype: "https://loremflickr.com/400/300/solar,sensor,farm",
      problem: "Local farmers were losing 30% of crops due to improper watering and water scarcity.",
      solution: "Developed a low-cost, solar-powered soil moisture sensor that automates irrigation, saving 40% water.",
      impact: "Deployed in 5 local farms."
    },
    {
      id: 2,
      name: "Yared Haile",
      project: "3D Printed Mobility",
      image: "https://loremflickr.com/400/400/student,ethiopian,man",
      prototype: "https://loremflickr.com/400/300/prosthetic,3dprint",
      problem: "Prosthetic limbs are too expensive for many rural amputees.",
      solution: "Created a customizable, 3D-printed prosthetic leg using recycled plastics for under $50.",
      impact: "Helped 12 patients regain mobility."
    },
    {
      id: 3,
      name: "Saron & Team",
      project: "Agri-AI Doctor",
      image: "https://loremflickr.com/400/400/students,team,africa",
      prototype: "https://loremflickr.com/400/300/app,farming,phone",
      problem: "Crop diseases spread unnoticed, destroying entire harvests.",
      solution: "Built an offline AI app that detects plant diseases from a simple photo and suggests organic remedies.",
      impact: "Used by 200+ smallholder farmers."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <div className="bg-gray-900 rounded-3xl p-8 text-white h-full relative overflow-hidden flex flex-col">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-clic-orange)]/10 rounded-bl-full -mr-16 -mt-16 z-0"></div>
      
      <div className="relative z-10 flex-grow">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-[var(--color-clic-orange)] rounded-lg text-white">
            <Star size={24} fill="currentColor" />
          </div>
          <div>
            <h3 className="text-2xl font-bold font-serif">Innovator Spotlight</h3>
            <p className="text-gray-400 text-sm">Hall of Fame</p>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Student & Prototype Images */}
              <div className="flex gap-4 mb-2">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-clic-orange)] flex-shrink-0">
                  <img src={stories[currentIndex].image} alt={stories[currentIndex].name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{stories[currentIndex].name}</h4>
                  <p className="text-[var(--color-clic-orange)] font-medium text-sm">{stories[currentIndex].project}</p>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 mb-4">
                 <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-black/50 relative group">
                    <img src={stories[currentIndex].prototype} alt="Prototype" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white">Prototype</div>
                 </div>
                 <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">The Problem</span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed pl-4 border-l-2 border-white/10">{stories[currentIndex].problem}</p>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">The Solution</span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed pl-4 border-l-2 border-white/10">{stories[currentIndex].solution}</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mt-6 relative z-10 pt-4 border-t border-white/10">
          <div className="flex gap-2">
              {stories.map((_, idx) => (
                  <button 
                      key={idx} 
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-[var(--color-clic-orange)] w-6' : 'bg-gray-700 hover:bg-gray-600'}`}
                  />
              ))}
          </div>
          <div className="flex gap-2">
              <button onClick={prevSlide} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors active:scale-95">
                  <ChevronLeft size={20} />
              </button>
              <button onClick={nextSlide} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors active:scale-95">
                  <ChevronRight size={20} />
              </button>
          </div>
      </div>
    </div>
  );
};

const NewsSection = () => {
  const videos = [
    { id: '1', title: 'CLIC Ethiopia Official Launch', thumbnail: 'https://loremflickr.com/640/360/conference,ethiopia', duration: '12:45' },
    { id: '2', title: 'Student Success Stories: Smart Agriculture', thumbnail: 'https://loremflickr.com/640/360/farming,technology', duration: '05:30' },
    { id: '3', title: 'Tour of the New Fabrication Lab', thumbnail: 'https://loremflickr.com/640/360/laboratory,robotics', duration: '08:15' },
    { id: '4', title: 'Interview with Dr. Frehun Adefris', thumbnail: 'https://loremflickr.com/640/360/interview,man', duration: '24:10' },
  ];

  return (
    <section id="news" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 font-serif mb-4">Impact & Updates</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              See how our students are changing the world, and stay tuned with our latest activities.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Innovator Spotlight (5 cols) */}
            <div className="lg:col-span-5">
                <InnovatorSpotlight />
            </div>

            {/* Right Column: News/Videos (7 cols) */}
            <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-600 rounded-lg text-white">
                            <Youtube size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Latest Videos</h3>
                    </div>
                    <a href="#" className="text-sm font-bold text-[var(--color-clic-red)] hover:underline flex items-center gap-1">
                        View Channel <ArrowRight size={14} />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {videos.map((video) => (
                        <div key={video.id} className="group cursor-pointer">
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-3 shadow-md bg-gray-100">
                                <img 
                                    src={video.thumbnail} 
                                    alt={video.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                        <Play size={18} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                    {video.duration}
                                </div>
                            </div>
                            <h4 className="font-bold text-gray-900 leading-tight group-hover:text-[var(--color-clic-red)] transition-colors line-clamp-2">
                                {video.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
