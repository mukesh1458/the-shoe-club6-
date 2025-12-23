import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, MapPin, Phone } from 'lucide-react';
import { fadeInUp, hoverScale } from '../utils/animations';
import { API_BASE } from '../utils/api';

const ProductCard = ({ product }) => {
    const imageUrl = product.image ? (product.image.startsWith('http') || product.image.startsWith('/assets') || product.image.startsWith('data:') ? product.image : `${API_BASE}${product.image}`) : 'https://via.placeholder.com/150';

    return (
        <motion.div
            variants={fadeInUp}
            {...hoverScale}
            className="group relative bg-charcoal/30 rounded-2xl overflow-hidden border border-white/5 hover:border-gold-accent/30 transition-all duration-700 shadow-2xl"
        >
            <div className="aspect-[4/5] w-full overflow-hidden bg-gray-950 relative">
                <img
                    src={imageUrl}
                    alt={product.title || 'Luxury Footwear'}
                    loading="lazy"
                    className="h-full w-full object-cover object-center scale-[1.02] group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.22, 1, 0.36, 1]"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x800?text=The+Shoe+Club';
                        e.target.onerror = null;
                    }}
                />

                {/* Shimmer on Hover */}
                <div className="absolute inset-x-0 top-0 h-full w-32 bg-white/5 -skew-x-12 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-1000 ease-in-out pointer-events-none" />

                {/* Premium Hover Overlay */}
                <div className="absolute inset-0 bg-luxury-black/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-4 text-center">
                    <motion.div
                        className="w-full flex flex-col items-center"
                    >
                        <h4 className="text-gold-accent font-serif text-xl md:text-2xl mb-4 md:mb-6 tracking-wide">
                            Enquire Now
                        </h4>

                        <div className="space-y-2 md:space-y-3 w-full max-w-[160px] md:max-w-[180px] mb-4 md:mb-6">
                            <a
                                href="tel:+919966909792"
                                className="flex items-center justify-center gap-2 bg-gold-accent/90 hover:bg-gold-accent text-luxury-black py-2 md:py-2.5 px-4 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all w-full shadow-lg"
                            >
                                <Phone size={12} />
                                Call Now
                            </a>
                            <a
                                href="https://wa.me/919966909792"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-green-600/20 text-cream py-2 md:py-2.5 px-4 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-all w-full"
                            >
                                <MessageCircle size={12} />
                                WhatsApp
                            </a>
                            <a
                                href="https://www.instagram.com/theshoeclub6?igsh=amZiemY4M3VvdXgz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-purple-600/20 text-cream py-2 md:py-2.5 px-4 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-white/10 transition-all w-full"
                            >
                                <Instagram size={12} />
                                Instagram
                            </a>
                        </div>

                        <a
                            href="https://maps.app.goo.gl/KWccwoyw1tcP81y97"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-[8px] md:text-[9px] text-gray-400 hover:text-gold-accent transition-colors max-w-[140px] md:max-w-[160px] mx-auto group/map"
                        >
                            <MapPin size={12} className="text-gold-accent flex-shrink-0" />
                            <p className="leading-relaxed text-left opacity-70 group-hover/map:opacity-100">
                                Shubash Road, Adimurthy Nagar,<br />
                                Saheba Apartment, Anantapuramu
                            </p>
                        </a>
                    </motion.div>
                </div>
            </div>

            <div className="p-4 md:p-6 bg-gradient-to-b from-transparent to-black/40">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg md:text-xl text-cream font-serif font-medium group-hover:text-gold-accent transition-colors duration-500 leading-tight">
                        {product.title}
                    </h3>
                    <p className="text-base md:text-lg font-serif text-gold-accent tracking-tighter shrink-0 ml-4">₹{product.price ? product.price.toString().replace(/[^\d]/g, '') : '0'}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em] md:tracking-[0.3em] font-medium">{product.category}</p>
                    <span className="text-[8px] md:text-xs text-gold-accent/30 uppercase tracking-widest italic">Exclusive</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
