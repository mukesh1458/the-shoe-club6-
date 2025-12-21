import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentDiscountBadge = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Auto-expand every 20 seconds
        const interval = setInterval(() => {
            if (!isExpanded) {
                setIsExpanded(true);
                // Auto-collapse after 7 seconds
                timeoutRef.current = setTimeout(() => {
                    setIsExpanded(false);
                }, 7000);
            }
        }, 20000);

        return () => {
            clearInterval(interval);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isExpanded]);

    const handleManualExpand = () => {
        setIsExpanded(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    const handleScroll = (e) => {
        e.preventDefault();
        setIsExpanded(false);

        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: 'collection' } });
        } else {
            const element = document.getElementById('collection');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[100] pointer-events-none">
            <AnimatePresence>
                {!isExpanded ? (
                    <motion.button
                        key="badge-collapsed"
                        initial={{ scale: 0, opacity: 0, rotate: -45 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            rotate: 0,
                            y: [0, -8, 0],
                        }}
                        exit={{ scale: 0, opacity: 0, rotate: 45 }}
                        transition={{
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            default: { type: "spring", stiffness: 260, damping: 20 }
                        }}
                        onClick={handleManualExpand}
                        className="pointer-events-auto group relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-luxury-black/80 backdrop-blur-xl border border-gold-accent/50 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-shadow duration-500 overflow-hidden"
                    >
                        <GraduationCap className="text-gold-accent w-5 h-5 md:w-7 md:h-7" />

                        {/* Shimmer Effect */}
                        <motion.div
                            animate={{ left: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                            className="absolute top-0 bottom-0 w-8 bg-white/10 -skew-x-12 z-0"
                        />

                        {/* Tooltip hint */}
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="absolute left-20 bg-luxury-black/90 border border-white/10 px-3 py-1 rounded-md whitespace-nowrap text-[10px] text-gold-accent uppercase tracking-widest font-bold"
                        >
                            Student Offer
                        </motion.div>
                    </motion.button>
                ) : (
                    <motion.div
                        key="badge-expanded"
                        initial={{ width: 48, height: 48, opacity: 0, x: -20 }}
                        animate={{ width: "auto", height: "auto", opacity: 1, x: 0 }}
                        exit={{ width: 48, height: 48, opacity: 0, x: -20 }}
                        className="pointer-events-auto relative p-4 md:p-6 bg-luxury-black/95 backdrop-blur-2xl border border-gold-accent/30 rounded-3xl shadow-2xl max-w-xs overflow-hidden"
                    >
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors p-1"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center border border-gold-accent/20">
                                    <GraduationCap className="text-gold-accent w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] md:text-[10px] text-gold-accent font-bold uppercase tracking-widest">Limited Offer</span>
                                    <h4 className="text-xl md:text-2xl font-serif text-cream">15% Off</h4>
                                </div>
                            </div>

                            <p className="text-sm text-gray-400 font-light leading-relaxed">
                                Exclusive styling privilege for the academic elite. Unlock your modern heritage.
                            </p>

                            <button
                                onClick={handleScroll}
                                className="group flex items-center justify-between gap-4 bg-gold-accent hover:bg-yellow-600 text-luxury-black px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300"
                            >
                                Shop Collection
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Particle shadows or glow */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold-accent/5 rounded-full blur-3xl pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StudentDiscountBadge;
