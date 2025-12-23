import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-[100] bg-luxury-black/95 flex items-center justify-center">
            <div className="relative">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-2 border-gold-accent/20 border-t-gold-accent rounded-full"
                />

                {/* Inner Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-2 border-white/5 border-b-white/20 rounded-full"
                />

                {/* Logo or Center Piece */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-2 h-2 bg-gold-accent rounded-full shadow-[0_0_10px_rgba(197,160,33,0.5)]" />
                </motion.div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
