import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, FileText, Bot, User, Lightbulb, Briefcase, Layers } from 'lucide-react';

const CurriculumEngine = () => {
  return (
    <section id="engine" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          <div className="p-8 md:p-12 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3 h-3" /> The Engine
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Curriculum Generation Engine</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A continuous, cyclic loop where student profiles inform SME prompts, which drive our multi-agent Generative AI to produce tailored business ideas and STEAM-IE training.
            </p>
          </div>
          
          <div className="relative p-8 md:p-16 bg-gray-50/50 dark:bg-gray-900/50">
            {/* Desktop SVG Arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="grad3" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <style>{`
                @keyframes dash-flow {
                  to { stroke-dashoffset: -24; }
                }
              `}</style>
              {/* Node 1 to Node 2 */}
              <line x1="50%" y1="20%" x2="25%" y2="70%" stroke="url(#grad1)" strokeWidth="3" strokeDasharray="8,8" className="animate-[dash-flow_1s_linear_infinite]" />
              {/* Node 2 to Node 3 (Slight slant to fix SVG gradient bounding box bug on horizontal lines) */}
              <line x1="25%" y1="70%" x2="75%" y2="70.1%" stroke="url(#grad2)" strokeWidth="3" strokeDasharray="8,8" className="animate-[dash-flow_1s_linear_infinite]" />
              {/* Node 3 to Node 1 */}
              <line x1="75%" y1="70%" x2="50%" y2="20%" stroke="url(#grad3)" strokeWidth="3" strokeDasharray="8,8" className="animate-[dash-flow_1s_linear_infinite]" />
            </svg>

            <div className="flex flex-col items-center relative z-10 gap-12 lg:gap-24 max-w-5xl mx-auto">
              {/* Node 1: Student Profile (Top) */}
              <div className="w-full lg:w-5/12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-blue-100 dark:border-blue-900/30 p-6 relative hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Student Profile</h4>
                </div>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-50 dark:border-blue-900/20">
                    <strong className="text-gray-900 dark:text-white block mb-1">Education</strong>
                    High School Junior, strong in Math and Physics.
                  </div>
                  <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-50 dark:border-blue-900/20">
                    <strong className="text-gray-900 dark:text-white block mb-1">Interests</strong>
                    Renewable Energy, Automation, Agriculture.
                  </div>
                  <div className="bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg border border-blue-50 dark:border-blue-900/20">
                    <strong className="text-gray-900 dark:text-white block mb-1">Hobbies</strong>
                    Tinkering with electronics, gardening.
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col lg:flex-row w-full justify-between gap-12 lg:gap-8 items-stretch">
                {/* Node 2: Subject Matter Expert (Bottom Left) */}
                <div className="w-full lg:w-5/12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-orange-100 dark:border-orange-900/30 p-6 relative hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Subject Matter Expert</h4>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 flex-1 flex flex-col justify-center">
                    <div className="bg-orange-50/50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-50 dark:border-orange-900/20">
                      <strong className="text-gray-900 dark:text-white block mb-1">Context & Domain</strong>
                      High School Junior, Math/Physics background. IoT in Agriculture.
                    </div>
                    <div className="bg-orange-50/50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-50 dark:border-orange-900/20">
                      <strong className="text-gray-900 dark:text-white block mb-1">Goal</strong>
                      Design a curriculum bridging electronics hobby with renewable energy.
                    </div>
                    <div className="bg-orange-50/50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-50 dark:border-orange-900/20">
                      <strong className="text-gray-900 dark:text-white block mb-1">Constraints & Output</strong>
                      Low cost, local materials. Output: Business idea + STEAM-IE path.
                    </div>
                  </div>
                </div>

                {/* Node 3: Generative AI (Bottom Right) */}
                <div className="w-full lg:w-5/12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-900/30 p-6 relative hover:-translate-y-1 transition-transform duration-300 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">Generative AI Recommender Engine</h4>
                  </div>
                  <div className="bg-indigo-50/30 dark:bg-indigo-900/10 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/20 flex-1 flex flex-col justify-center">
                    {/* Mini Flow Diagram */}
                    <div className="flex flex-col items-center w-full relative z-10">
                      {/* Top Row: Student & Expert */}
                      <div className="flex w-full gap-4 relative">
                        {/* Connection Student <-> Expert */}
                        <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-indigo-400 dark:bg-indigo-600 -translate-x-1/2 -translate-y-1/2 z-0 flex items-center justify-between">
                          <div className="w-1.5 h-1.5 border-b-2 border-l-2 border-indigo-400 dark:border-indigo-600 rotate-45 transform translate-x-[1px]"></div>
                          <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-600 rotate-45 transform -translate-x-[1px]"></div>
                        </div>
                        
                        <div className="flex-1 bg-white dark:bg-gray-800 p-2 rounded border border-indigo-100 dark:border-indigo-800/50 text-center shadow-sm z-10">
                          <User className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                          <div className="text-[10px] font-bold text-gray-800 dark:text-gray-200">Student Agent</div>
                        </div>
                        <div className="flex-1 bg-white dark:bg-gray-800 p-2 rounded border border-indigo-100 dark:border-indigo-800/50 text-center shadow-sm z-10">
                          <FileText className="w-4 h-4 mx-auto mb-1 text-orange-500" />
                          <div className="text-[10px] font-bold text-gray-800 dark:text-gray-200">Expert Agent</div>
                        </div>
                      </div>

                      {/* Join from Student & Expert to Router */}
                      <div className="w-1/2 h-2 border-b-2 border-l-2 border-r-2 border-indigo-300 dark:border-indigo-700 rounded-b-sm"></div>
                      <div className="w-0.5 h-2 bg-indigo-300 dark:bg-indigo-700"></div>

                      {/* Router */}
                      <div className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded text-xs font-bold shadow-sm z-10">Router Agent</div>
                      
                      {/* Fork from Router to Business & IE */}
                      <div className="w-0.5 h-2 bg-indigo-300 dark:bg-indigo-700"></div>
                      <div className="w-1/2 h-2 border-t-2 border-l-2 border-r-2 border-indigo-300 dark:border-indigo-700 rounded-t-sm"></div>
                      
                      {/* Row: Business & IE */}
                      <div className="flex w-full gap-4 relative">
                        {/* Arrow Business -> IE */}
                        <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-indigo-400 dark:bg-indigo-600 -translate-x-1/2 -translate-y-1/2 z-0 flex items-center justify-end">
                          <div className="w-1.5 h-1.5 border-t-2 border-r-2 border-indigo-400 dark:border-indigo-600 rotate-45 transform translate-x-[1px]"></div>
                        </div>
                        
                        <div className="flex-1 bg-white dark:bg-gray-800 p-2 rounded border border-indigo-100 dark:border-indigo-800/50 text-center shadow-sm z-10">
                          <Lightbulb className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
                          <div className="text-[10px] font-bold text-gray-800 dark:text-gray-200">Business Agent</div>
                        </div>
                        <div className="flex-1 bg-white dark:bg-gray-800 p-2 rounded border border-indigo-100 dark:border-indigo-800/50 text-center shadow-sm z-10">
                          <Briefcase className="w-4 h-4 mx-auto mb-1 text-orange-500" />
                          <div className="text-[10px] font-bold text-gray-800 dark:text-gray-200">IE Agent</div>
                        </div>
                      </div>

                      {/* Join from Business & IE to STEAM */}
                      <div className="w-1/2 h-2 border-b-2 border-l-2 border-r-2 border-indigo-300 dark:border-indigo-700 rounded-b-sm"></div>
                      <div className="w-0.5 h-2 bg-indigo-300 dark:bg-indigo-700"></div>

                      {/* STEAM Agent */}
                      <div className="w-2/3 bg-white dark:bg-gray-800 p-2 rounded border border-indigo-100 dark:border-indigo-800/50 text-center shadow-sm z-10">
                        <Layers className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                        <div className="text-[10px] font-bold text-gray-800 dark:text-gray-200">STEAM Agent</div>
                      </div>

                      {/* Line to Final */}
                      <div className="w-0.5 h-2 bg-indigo-300 dark:bg-indigo-700"></div>

                      {/* Final Curriculum */}
                      <div className="w-full bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded border border-indigo-200 dark:border-indigo-800 text-center z-10">
                        <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Final Curriculum Generated</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurriculumEngine;
