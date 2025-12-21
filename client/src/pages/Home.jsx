import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import TipCard from '../components/TipCard';
import Footer from '../components/Footer';
import axios from 'axios';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Quote } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTip, setSelectedTip] = useState(null);
    const location = useLocation();

    const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? window.location.origin : 'http://localhost:5000');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [prodRes, tipRes] = await Promise.all([
                    axios.get(`${API_BASE}/api/products`),
                    axios.get(`${API_BASE}/api/tips`)
                ]);
                setProducts(prodRes.data || []);
                setTips(tipRes.data || []);
                setError(null);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load content. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Clear state to avoid scrolling again on back/forward
                    window.history.replaceState({}, document.title);
                }, 500);
            }
        }
    }, [location.state]);

    return (
        <div className="bg-luxury-black min-h-screen text-cream font-sans relative">
            <Navbar />
            <Hero />

            {/* Product Showcase */}
            <motion.section
                id="collection"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-20px" }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24"
            >
                <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-16">
                    <span className="text-gold-accent uppercase tracking-widest text-sm font-semibold">The Collection</span>
                    <h2 className="text-4xl font-serif mt-3">Curated Excellence</h2>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-accent"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-400">
                        <p>{error}</p>
                    </div>
                ) : products.length > 0 ? (
                    <motion.div
                        variants={staggerContainer}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-y-10 gap-x-8"
                    >
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        <p>No products available at the moment.</p>
                    </div>
                )}
            </motion.section>

            {/* Fashion Tips (Journal) */}
            <motion.section
                id="journal"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-20px" }}
                className="bg-charcoal py-24 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-24">
                    <motion.div variants={fadeInUp} className="text-center mb-10 md:mb-16">
                        <span className="text-gold-accent uppercase tracking-widest text-sm font-semibold">The Journal</span>
                        <h2 className="text-3xl md:text-4xl font-serif mt-3 text-white">Style & Substance</h2>
                    </motion.div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 bg-luxury-black/50 animate-pulse rounded-2xl border border-white/5"></div>
                            ))}
                        </div>
                    ) : tips.length > 0 ? (
                        <motion.div
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {tips.map((tip, index) => (
                                <TipCard key={tip._id} tip={tip} index={index} onClick={setSelectedTip} />
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-10 text-gray-500">
                            <p>Check back soon for new fashion insights.</p>
                        </div>
                    )}
                </div>
            </motion.section>

            {/* Tip Detail Modal */}
            <AnimatePresence>
                {selectedTip && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTip(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full max-w-2xl bg-charcoal border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <button
                                onClick={() => setSelectedTip(null)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-4 text-gold-accent/60 mb-8 border-b border-white/5 pb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        <span className="text-xs uppercase tracking-widest">
                                            {new Date(selectedTip.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                                    <div className="flex items-center gap-2">
                                        <User size={14} />
                                        <span className="text-xs uppercase tracking-widest font-semibold text-gray-500">Editorial</span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <Quote className="absolute -top-6 -left-6 text-gold-accent/10 w-20 h-20 -z-0" />
                                    <h2 className="text-3xl md:text-4xl font-serif text-cream mb-8 relative z-10 leading-tight">
                                        {selectedTip.title}
                                    </h2>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <p className="text-gray-300 font-light leading-relaxed text-lg whitespace-pre-wrap">
                                        {selectedTip.content}
                                    </p>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                                    <button
                                        onClick={() => setSelectedTip(null)}
                                        className="text-gold-accent uppercase tracking-[0.3em] text-[10px] font-bold hover:tracking-[0.4em] transition-all"
                                    >
                                        Close Journal Entry
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};


export default Home;
