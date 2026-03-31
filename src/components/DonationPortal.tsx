import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, CreditCard, Globe, ArrowRight, CheckCircle, DollarSign, ArrowLeft } from 'lucide-react';

const DonationPortal = () => {
  const [step, setStep] = useState(1);
  const [frequency, setFrequency] = useState<'once'|'monthly'>('once');
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('general');
  const [paymentMethod, setPaymentMethod] = useState<string>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);

  const amounts = [10, 50, 100, 500];

  const handleNext = () => setStep(s => Math.min(s + 1, 4));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleDonate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(5); // Success step
    }, 2000);
  };

  return (
    <section id="donate" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden transition-colors duration-300">
      {/* Subtle African Motif Pattern */}
      <div className="absolute inset-0 bg-pattern-kuba opacity-[0.03] dark:opacity-[0.02] dark:invert pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Support Our Mission</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Empower the next generation of African innovators. Your contribution directly funds STEAM education and Fad.Lab infrastructure.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
          {/* Progress Bar */}
          <div className="flex bg-gray-100 dark:bg-gray-800 h-2">
            <motion.div 
              className="bg-[var(--color-clic-red)] h-full"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {/* STEP 1: Amount & Frequency */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Choose Your Impact</h3>
                  
                  <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-8 w-full max-w-md mx-auto">
                    <button
                      onClick={() => setFrequency('once')}
                      className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${frequency === 'once' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      Give Once
                    </button>
                    <button
                      onClick={() => setFrequency('monthly')}
                      className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${frequency === 'monthly' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                      Monthly
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {amounts.map(amt => (
                      <button
                        key={amt}
                        onClick={() => { setAmount(amt); setCustomAmount(''); }}
                        className={`py-4 rounded-xl border-2 font-bold text-lg transition-all ${amount === amt && !customAmount ? 'border-[var(--color-clic-red)] bg-[var(--color-clic-red)]/5 text-[var(--color-clic-red)]' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[var(--color-clic-red)]/30'}`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>

                  <div className="relative mb-8">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount(0);
                      }}
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--color-clic-red)] focus:border-transparent outline-none transition-all dark:text-white"
                    />
                  </div>

                  <button onClick={handleNext} className="w-full py-4 bg-[var(--color-clic-red)] hover:bg-red-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: Purpose */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button onClick={handleBack} className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Where should your donation go?</h3>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      { id: 'general', title: 'General Support', desc: 'Direct funds where they are needed most.' },
                      { id: 'fadlab', title: 'Sponsor a Fad.Lab Workstation', desc: 'Provide hardware and tools for a local school.' },
                      { id: 'bootcamp', title: 'Fund a STEAM Bootcamp', desc: 'Cover tuition and materials for 50 students.' }
                    ].map(p => (
                      <div 
                        key={p.id}
                        onClick={() => setPurpose(p.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${purpose === p.id ? 'border-[var(--color-clic-blue)] bg-[var(--color-clic-blue)]/5' : 'border-gray-200 dark:border-gray-700 hover:border-[var(--color-clic-blue)]/30'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className={`font-bold text-lg ${purpose === p.id ? 'text-[var(--color-clic-blue)]' : 'text-gray-900 dark:text-white'}`}>{p.title}</h4>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{p.desc}</p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${purpose === p.id ? 'border-[var(--color-clic-blue)]' : 'border-gray-300 dark:border-gray-600'}`}>
                            {purpose === p.id && <div className="w-3 h-3 rounded-full bg-[var(--color-clic-blue)]" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button onClick={handleNext} className="w-full py-4 bg-[var(--color-clic-blue)] hover:bg-blue-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* STEP 3: Details */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button onClick={handleBack} className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Details</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--color-clic-green)] outline-none dark:text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--color-clic-green)] outline-none dark:text-white" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                      <input type="email" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-[var(--color-clic-green)] outline-none dark:text-white" />
                    </div>
                  </div>

                  <button onClick={handleNext} className="w-full py-4 bg-[var(--color-clic-green)] hover:bg-green-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
                    Continue to Payment <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* STEP 4: Payment */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button onClick={handleBack} className="flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </button>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Method</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                      { id: 'stripe', name: 'Credit Card', icon: CreditCard, desc: 'International' },
                      { id: 'flutterwave', name: 'Flutterwave', icon: Globe, desc: 'Pan-African' },
                      { id: 'paystack', name: 'Paystack', icon: Globe, desc: 'Local/Regional' }
                    ].map(method => (
                      <div 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${paymentMethod === method.id ? 'border-[var(--color-clic-orange)] bg-[var(--color-clic-orange)]/5' : 'border-gray-200 dark:border-gray-700 hover:border-[var(--color-clic-orange)]/30'}`}
                      >
                        <method.icon className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === method.id ? 'text-[var(--color-clic-orange)]' : 'text-gray-400'}`} />
                        <h4 className={`font-bold ${paymentMethod === method.id ? 'text-[var(--color-clic-orange)]' : 'text-gray-900 dark:text-white'}`}>{method.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{method.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl mb-8 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Donation</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">${customAmount || amount} <span className="text-sm font-normal text-gray-500">{frequency === 'monthly' ? '/ month' : 'one-time'}</span></p>
                    </div>
                    <Heart className="w-8 h-8 text-[var(--color-clic-red)]" />
                  </div>

                  <button 
                    onClick={handleDonate} 
                    disabled={isProcessing}
                    className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                  >
                    {isProcessing ? 'Processing...' : `Donate $${customAmount || amount}`}
                  </button>
                </motion.div>
              )}

              {/* STEP 5: Success */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-serif">Thank You!</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Your generous donation of ${customAmount || amount} will help us empower the next generation of African innovators. A receipt has been sent to your email.
                  </p>
                  <button onClick={() => setStep(1)} className="py-3 px-8 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Make Another Donation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationPortal;
