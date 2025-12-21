import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';

const TipCard = ({ tip, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            onClick={() => onClick(tip)}
            className="group cursor-pointer bg-luxury-black/40 border border-white/5 p-8 rounded-2xl hover:border-gold-accent/30 transition-all duration-300 relative overflow-hidden"
        >
            {/* Hover Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-gold-accent/10 transition-colors"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 text-gold-accent/60 mb-4">
                    <Calendar size={14} />
                    <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">
                        {new Date(tip.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                    </span>
                </div>

                <h3 className="text-2xl font-serif text-cream mb-4 group-hover:text-gold-accent transition-colors duration-300 leading-tight">
                    {tip.title}
                </h3>

                <p className="text-gray-400 font-light leading-relaxed mb-6 line-clamp-3 text-sm">
                    {tip.content}
                </p>

                <div className="flex items-center gap-2 text-gold-accent text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read More
                    <ChevronRight size={14} />
                </div>
            </div>
        </motion.div>
    );
};

export default TipCard;
