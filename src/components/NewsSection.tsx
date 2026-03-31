import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../App';
import { Youtube, Play, ArrowRight, Star, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { GOOGLE_SCRIPT_URL } from '../constants';

const InnovatorSpotlight = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSpotlight = async () => {
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?type=spotlight`);
        const data = await response.json();
        if (data.status === 'success') {
          setStories(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch spotlight data');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpotlight();
  }, []);

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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--color-clic-orange)] mb-4" />
            <p className="text-gray-400">Loading stories...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-red-400 mb-2">Failed to load stories</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-gray-400">No stories available yet.</p>
          </div>
        ) : (
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
                    <img src={stories[currentIndex].image_url} alt={stories[currentIndex].name} className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{stories[currentIndex].name}</h4>
                    <p className="text-[var(--color-clic-orange)] font-medium text-sm">{stories[currentIndex].project}</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10 mb-4">
                   <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-black/50 relative group">
                      <img src={stories[currentIndex].prototype_url} alt="Prototype" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" loading="lazy" />
                      <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white">Prototype</div>
                   </div>
                   <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
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
                      {stories[currentIndex].impact && (
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">The Impact</span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed pl-4 border-l-2 border-white/10">{stories[currentIndex].impact}</p>
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Controls */}
      {!isLoading && !error && stories.length > 0 && (
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
      )}
    </div>
  );
};

const NewsSection = () => {
  const { t } = useTranslation();
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?type=videos`);
        const data = await response.json();
        if (data.status === 'success') {
          setVideos(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch videos');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Helper function to extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <section id="news" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-zigzag opacity-[0.02] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-serif mb-4">Impact & Updates</h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              {t.newsDesc}
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
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Latest Videos</h3>
                    </div>
                    <a href="https://www.youtube.com/@clicethiopia/playlists" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[var(--color-clic-red)] hover:underline flex items-center gap-1">
                        View Channel <ArrowRight size={14} />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
                    {isLoading ? (
                      <div className="col-span-full flex flex-col items-center justify-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-clic-red)] mb-4" />
                        <p className="text-gray-500">Loading videos...</p>
                      </div>
                    ) : error ? (
                      <div className="col-span-full flex flex-col items-center justify-center h-64 text-center">
                        <p className="text-red-500 mb-2">Failed to load videos</p>
                        <p className="text-sm text-gray-500">{error}</p>
                      </div>
                    ) : videos.length === 0 ? (
                      <div className="col-span-full flex flex-col items-center justify-center h-64 text-center">
                        <p className="text-gray-500">No videos available yet.</p>
                      </div>
                    ) : videos.map((video) => {
                        const videoId = getYouTubeId(video.video_id) || video.video_id; // Fallback to video_id if URL parsing fails
                        return (
                        <div key={video.id} className="group">
                            {playingVideoId === video.id ? (
                                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 shadow-md bg-black">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    ></iframe>
                                </div>
                            ) : (
                                <div 
                                    className="relative aspect-video rounded-xl overflow-hidden mb-3 shadow-md bg-gray-100 cursor-pointer"
                                    onClick={() => setPlayingVideoId(video.id)}
                                >
                                    <img 
                                        src={video.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                                        alt={video.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        referrerPolicy="no-referrer"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                            <Play size={18} fill="currentColor" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                        {video.duration || 'Video'}
                                    </div>
                                </div>
                            )}
                            <h4 className="font-bold text-gray-900 dark:text-white leading-tight group-hover:text-[var(--color-clic-red)] transition-colors line-clamp-2">
                                {video.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">{video.date || 'Recently added'}</p>
                        </div>
                    )})}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
