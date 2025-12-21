import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleScroll = (e, id) => {
        e.preventDefault();
        setIsOpen(false);

        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: id } });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navItems = [
        { name: 'Collection', id: 'collection' },
        { name: 'Journal', id: 'journal' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav className="fixed w-full z-50 bg-luxury-black/90 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex-shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img
                            src="/assets/logo.jpg"
                            alt="The Shoe Club"
                            className="h-12 w-auto object-contain hover:scale-105 transition-transform"
                        />
                    </Link>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item) => (
                                item.path ? (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className="text-gray-400 hover:text-gold-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium tracking-widest uppercase relative group"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-accent group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                ) : (
                                    <button
                                        key={item.name}
                                        onClick={(e) => handleScroll(e, item.id)}
                                        className="text-gray-400 hover:text-gold-accent transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium tracking-widest uppercase relative group"
                                    >
                                        {item.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-accent group-hover:w-full transition-all duration-300"></span>
                                    </button>
                                )
                            ))}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-luxury-black border-b border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                item.path ? (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className="text-gray-300 hover:text-gold-accent block px-3 py-2 rounded-md text-base font-medium tracking-widest uppercase"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <button
                                        key={item.name}
                                        onClick={(e) => handleScroll(e, item.id)}
                                        className="text-gray-300 hover:text-gold-accent block px-3 py-2 rounded-md text-base font-medium tracking-widest uppercase w-full text-left"
                                    >
                                        {item.name}
                                    </button>
                                )
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
