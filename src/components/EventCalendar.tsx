import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Clock, Users, X, ArrowRight, CheckCircle } from 'lucide-react';

const events = [
  { id: 1, title: 'National STEAM Hackathon', date: 'Oct 15, 2026', time: '09:00 AM - 05:00 PM', location: 'Addis Ababa University', type: 'Hackathon', spots: 200, color: 'var(--color-clic-blue)' },
  { id: 2, title: 'Fad.Lab Instructor Training', date: 'Nov 02, 2026', time: '10:00 AM - 03:00 PM', location: 'Virtual', type: 'Workshop', spots: 50, color: 'var(--color-clic-orange)' },
  { id: 3, title: 'Women in Tech Bootcamp', date: 'Nov 20, 2026', time: '08:00 AM - 04:00 PM', location: 'CLIC HQ, Addis Ababa', type: 'Bootcamp', spots: 100, color: 'var(--color-clic-red)' },
  { id: 4, title: 'AI for Agriculture Symposium', date: 'Dec 05, 2026', time: '09:00 AM - 12:00 PM', location: 'Hawassa University', type: 'Symposium', spots: 150, color: 'var(--color-clic-green)' },
];

const EventCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call
    setTimeout(() => {
      setIsRegistered(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsRegistered(false);
      }, 2000);
    }, 1000);
  };

  return (
    <section id="events" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-zigzag opacity-[0.03] dark:opacity-[0.02] dark:invert pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 font-serif">Upcoming Events & Workshops</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join our bootcamps, hackathons, and national initiatives. We've hosted over 150 workshops empowering the next generation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Calendar List */}
          <div className="lg:col-span-8 space-y-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl transition-all flex flex-col md:flex-row gap-6 items-start md:items-center group"
              >
                <div className="flex-shrink-0 w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white" style={{ backgroundColor: event.color }}>
                  <span className="text-sm font-bold uppercase opacity-80">{event.date.split(' ')[0]}</span>
                  <span className="text-3xl font-black">{event.date.split(' ')[1].replace(',', '')}</span>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
                      {event.type}
                    </span>
                    <span className="text-sm text-[var(--color-clic-red)] font-bold flex items-center gap-1">
                      <Users className="w-4 h-4" /> {event.spots} spots
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[var(--color-clic-blue)] transition-colors">{event.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                  </div>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto">
                  <button 
                    onClick={() => { setSelectedEvent(event); setIsModalOpen(true); }}
                    className="w-full md:w-auto px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    Register <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats / Info Side */}
          <div className="lg:col-span-4">
            <div className="bg-[var(--color-clic-blue)] rounded-3xl p-8 text-white sticky top-24">
              <h3 className="text-2xl font-bold mb-6 font-serif">Why Attend?</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Network</h4>
                    <p className="text-blue-100 text-sm">Connect with industry leaders, mentors, and fellow innovators.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Hands-on Experience</h4>
                    <p className="text-blue-100 text-sm">Apply theoretical knowledge to practical, real-world challenges.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Certification</h4>
                    <p className="text-blue-100 text-sm">Receive official CLIC Ethiopia certificates upon completion.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-4xl font-black mb-2">150+</p>
                <p className="text-blue-100 font-bold uppercase tracking-wider text-sm">Workshops Hosted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {isRegistered ? (
                <div className="p-12 text-center">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Registered!</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    You're all set for the {selectedEvent.title}. We've sent the details to your email.
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-8 pb-6 border-b border-gray-100 dark:border-gray-800" style={{ borderTop: `6px solid ${selectedEvent.color}` }}>
                    <span className="text-xs font-bold px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full mb-4 inline-block">
                      {selectedEvent.type}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedEvent.title}</h3>
                    <div className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {selectedEvent.date} • {selectedEvent.time}</span>
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedEvent.location}</span>
                    </div>
                  </div>
                  
                  <form onSubmit={handleRegister} className="p-8 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                        <input required type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none dark:text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                        <input required type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none dark:text-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                      <input required type="email" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School / Organization</label>
                      <input required type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--color-clic-blue)] outline-none dark:text-white" />
                    </div>
                    <button type="submit" className="w-full mt-4 py-4 bg-[var(--color-clic-blue)] hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-colors">
                      Confirm Registration
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventCalendar;
