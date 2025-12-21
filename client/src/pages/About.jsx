import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, ShieldCheck, Zap } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

const About = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);

    return (
        <div className="bg-luxury-black min-h-screen text-cream font-sans">
            <Navbar />

            <header className="relative h-[45vh] flex items-center justify-center overflow-hidden">
                {/* Parallax Background */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="/assets/banner2.png"
                        className="w-full h-full object-cover object-center opacity-50 grayscale-[10%] brightness-[0.6]"
                        alt="The Shoe Club"
                    />
                </motion.div>

                {/* Premium Overlay */}
                <div className="absolute inset-0 z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_60%,rgba(0,0,0,0.9)_100%)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/80 via-transparent to-luxury-black"></div>
                </div>
                <div className="relative z-20 text-center px-4">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.span
                            variants={fadeInUp}
                            className="text-gold-accent uppercase tracking-widest text-sm font-semibold block mb-4"
                        >
                            Our Heritage
                        </motion.span>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-7xl font-serif"
                        >
                            The Art of Walking
                        </motion.h1>
                    </motion.div>
                </div>
            </header>

            <motion.section
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl font-serif mb-6 text-gold-accent">Defining Sophistication Since 2025</h2>
                        <p className="text-gray-400 leading-relaxed mb-6 font-light text-lg">
                            Born from a passion for timeless elegance and exceptional craftsmanship, The Shoe Club represents the pinnacle of luxury footwear. Every pair we curate or create is a testament to the enduring beauty of traditional techniques merged with modern design sensibilities.
                        </p>
                        <p className="text-gray-400 leading-relaxed font-light text-lg">
                            Our journey began in Anantapuramu with a single goal: to provide the modern individual with footwear that doesn't just complement an outfit, but defines a presence.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeInUp}
                        className="aspect-square bg-white/5 rounded-2xl overflow-hidden border border-white/10 relative group"
                    >
                        <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full object-contain p-12 opacity-80 group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gold-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                className="bg-charcoal py-24"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-serif">Our Values</h2>
                        <div className="h-px w-24 bg-gold-accent mx-auto mt-6"></div>
                    </motion.div>
                    <motion.div
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        {[
                            {
                                icon: <Award className="w-8 h-8 text-gold-accent" />,
                                title: "Uncompromising Quality",
                                desc: "We source only the finest materials, from premium Italian leathers to sustainable components."
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-gold-accent" />,
                                title: "Expert Craftsmanship",
                                desc: "Every stitch is placed with precision by artisans who have dedicated their lives to the trade."
                            },
                            {
                                icon: <Zap className="w-8 h-8 text-gold-accent" />,
                                title: "Timeless Design",
                                desc: "We favor enduring style over fleeting trends, creating pieces that remain relevant for decades."
                            }
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                variants={fadeInUp}
                                className="bg-luxury-black/50 p-10 rounded-2xl border border-white/5 hover:border-gold-accent/30 transition-all duration-500 hover:-translate-y-2 group"
                            >
                                <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity">{value.icon}</div>
                                <h3 className="text-xl font-serif mb-4 group-hover:text-gold-accent transition-colors">{value.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="py-24 max-w-4xl mx-auto px-4 text-center"
            >
                <motion.h2 variants={fadeInUp} className="text-3xl font-serif mb-8 italic text-gold-accent/80">"Quality is remembered long after price is forgotten."</motion.h2>
                <motion.div variants={fadeInUp} className="h-px w-24 bg-gold-accent mx-auto"></motion.div>
            </motion.section>

            <Footer />
        </div>
    );
};

export default About;
