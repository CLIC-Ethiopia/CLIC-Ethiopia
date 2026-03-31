import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Download, FileText, BookOpen, Video, Filter, ArrowRight, Sparkles } from 'lucide-react';

const resources = [
  { id: 1, title: 'STEAM Curriculum Guide 2026', type: 'PDF', category: 'Education', size: '2.4 MB', icon: BookOpen },
  { id: 2, title: 'Fad.Lab Setup Manual', type: 'PDF', category: 'Tech', size: '5.1 MB', icon: FileText },
  { id: 3, title: 'Intro to IoT for High Schools', type: 'Video', category: 'Tech', size: '120 MB', icon: Video },
  { id: 4, title: 'Entrepreneurship Bootcamp Syllabus', type: 'ZIP', category: 'Business', size: '15 MB', icon: FileText },
  { id: 5, title: 'Agricultural Science Experiments', type: 'PDF', category: 'Science', size: '3.2 MB', icon: BookOpen },
  { id: 6, title: 'Digital Literacy Basics', type: 'PDF', category: 'Education', size: '1.8 MB', icon: FileText },
  { id: 7, title: 'Robotics Kit Assembly Guide', type: 'PDF', category: 'Engineering', size: '8.4 MB', icon: FileText },
  { id: 8, title: 'Creative Arts Integration in STEM', type: 'Video', category: 'Arts', size: '250 MB', icon: Video },
  { id: 9, title: 'STEAM for Innovation & Entrepreneurship', type: 'PDF', category: 'Business', size: '4.5 MB', icon: BookOpen },
];

const categories = ['All', 'Education', 'Tech', 'Business', 'Science', 'Engineering', 'Arts'];

const ResourceHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || res.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="resources" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-mudcloth opacity-[0.02] dark:opacity-[0.015] dark:invert pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Open Source Knowledge Hub</h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-300 text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Study materials, syllabi, and research papers optimized for comprehension using Google NotebookLM</span>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Access our free, downloadable resources including curricula, research papers, and technical guides to support STEAM education across Africa.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none dark:text-white transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${activeCategory === cat ? 'bg-[var(--color-clic-blue)] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredResources.length > 0 ? (
              filteredResources.map((res, i) => (
                <motion.div
                  key={res.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all group flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-clic-blue)]/10 flex items-center justify-center text-[var(--color-clic-blue)]">
                      <res.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                      {res.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{res.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-auto pt-6">
                    <span className="font-mono">{res.type}</span>
                    <span>•</span>
                    <span className="font-mono">{res.size}</span>
                  </div>
                  
                  <div className="mt-6 flex flex-col xl:flex-row gap-3">
                    <button className="flex-1 py-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-[var(--color-clic-blue)] hover:text-white text-gray-700 dark:text-gray-200 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors group-hover:bg-[var(--color-clic-blue)] group-hover:text-white">
                      <Download className="w-4 h-4" /> Download
                    </button>
                    <button className="flex-1 py-3 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-600 hover:text-white text-indigo-600 dark:text-indigo-400 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                      <Sparkles className="w-4 h-4" /> Gemini Gems
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full text-center py-12"
              >
                <Filter className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No resources found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or category filters.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;
