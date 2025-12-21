import React from 'react';
import { motion } from 'framer-motion';

const PromotionBanner = () => {
    const handleScroll = (e) => {
        const element = document.getElementById('collection');
        if (element) {
            e.preventDefault();
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-gold-accent via-yellow-600 to-gold-accent text-luxury-black py-2 px-4 text-center z-[60] relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                <span className="hidden sm:inline opacity-80">The Shoe Club | Exclusive Offer</span>
                <span className="flex items-center gap-2">
                    15% OFF FOR COLLEGE STUDENTS
                    <span className="w-1 h-1 bg-luxury-black/30 rounded-full mx-1"></span>
                    <a
                        href="#collection"
                        onClick={handleScroll}
                        className="underline hover:text-white transition-colors duration-300"
                    >
                        Shop the Collection
                    </a>
                </span>
            </div>

            {/* Subtle Shine Effect */}
            <motion.div
                animate={{
                    left: ['-100%', '200%']
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2
                }}
                className="absolute top-0 bottom-0 w-32 bg-white/20 -skew-x-[45deg] z-0 pointer-events-none"
            />
        </motion.div>
    );
};

export default PromotionBanner;
