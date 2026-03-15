import React from 'react';
import { Facebook, Send, Twitter, Mail } from 'lucide-react';

const ShareStorySection = () => {
  return (
    <section id="share-story" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-gray-700 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Share Your CLIC Story</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Has CLIC Ethiopia impacted your life, your school, or your community? We want to hear from you! Submit your testimonial by tagging us on social media or sending us an email.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="https://facebook.com/CLIC_Ethiopia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-full font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-md">
              <Facebook size={20} /> Facebook
            </a>
            <a href="https://twitter.com/CLIC_Ethiopia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-md">
              <Twitter size={20} /> X (Twitter)
            </a>
            <a href="https://t.me/CLIC_Ethiopia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#0088cc] text-white rounded-full font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-md">
              <Send size={20} /> Telegram
            </a>
            <a href="https://tiktok.com/@CLIC_Ethiopia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#ff0050] text-white rounded-full font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-md">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg> TikTok
            </a>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1 max-w-[100px]"></div>
            <span className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wider">Or submit directly</span>
            <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1 max-w-[100px]"></div>
          </div>

          <div className="mt-6">
            <a href="mailto:clic.ethiopia@gmail.com?subject=My CLIC Ethiopia Testimonial" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-clic-blue)] text-white rounded-full font-bold hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg">
              <Mail size={20} /> Email Your Story
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Tag <strong className="text-[var(--color-clic-blue)]">@CLIC_Ethiopia</strong> in your posts!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShareStorySection;
