import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="relative h-screen overflow-hidden flex items-center justify-center bg-luxury-black">
            {/* Background Image/Banner with Parallax */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="/assets/banner2.png"
                    className="w-full h-full object-cover opacity-50 grayscale-[20%] brightness-[0.7]"
                    alt="Background"
                />
            </motion.div>

            {/* Premium Multi-layered Overlay */}
            <div className="absolute inset-0 z-10">
                {/* Vignette Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.8)_100%)]"></div>
                {/* Top/Bottom Blending Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black opacity-90"></div>
            </div>

            {/* Animated Content */}
            <div className="relative z-20 text-center px-4">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="block text-gold-accent text-sm md:text-base tracking-[0.3em] uppercase mb-8"
                >
                    Est. 2025
                </motion.span>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mb-6 md:mb-10 flex justify-center"
                >
                    <img src="/assets/logo.jpg" alt="The Shoe Club Logo" className="h-32 md:h-64 object-contain shadow-2xl rounded-sm" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-3xl sm:text-6xl md:text-8xl font-serif text-cream mb-4 leading-tight"
                >
                    The Shoe Club
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 font-light"
                >
                    Walking the fine line between heritage and modernity.
                    <br className="hidden sm:block" /> Experience the pinnacle of craftsmanship.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    onClick={() => {
                        const element = document.getElementById('collection');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="px-8 py-3 bg-cream text-luxury-black uppercase tracking-widest text-sm font-semibold hover:bg-gold-accent transition-colors duration-300 shadow-xl"
                >
                    Shop Premium
                </motion.button>
            </div>

            {/* Background Texture/Image (Optional simple effect) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] mix-blend-overlay"></div>
        </div>
    );
};

export default Hero;
