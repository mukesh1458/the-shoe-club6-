import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-luxury-black border-t border-white/10 pt-10 pb-6 md:pt-16 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div>
                        <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-gold-accent transition-colors font-light">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-gold-accent transition-colors font-light">Contact</Link>
                            </li>
                            <li>
                                <a href="/#collection" className="text-gray-400 hover:text-gold-accent transition-colors font-light">Collection</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Contact</h4>
                        <div className="space-y-4">
                            <a
                                href="https://maps.app.goo.gl/KWccwoyw1tcP81y97"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 text-gray-400 hover:text-gold-accent transition-colors"
                            >
                                <MapPin size={18} className="text-gold-accent mt-1 flex-shrink-0" />
                                <p className="font-light leading-relaxed">
                                    Shubash Road, Adimurthy Nagar,<br />
                                    Saheba Apartment, Anantapuramu,<br />
                                    Andhra Pradesh
                                </p>
                            </a>
                            <div className="flex items-center gap-3 text-gray-400">
                                <Phone size={18} className="text-gold-accent flex-shrink-0" />
                                <p className="font-light">+91 9966909792</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Connect</h4>
                        <div className="space-y-6">
                            <a
                                href="https://www.instagram.com/theshoeclub6?igsh=amZiemY4M3VvdXgz"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-gray-400 hover:text-gold-accent transition-colors group"
                            >
                                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                                <span className="font-light">Instagram</span>
                            </a>

                            <div className="pt-4 border-t border-white/5">
                                <p className="text-white text-xs font-semibold uppercase tracking-widest mb-3">Join Our Community</p>
                                <a
                                    href="https://chat.whatsapp.com/KI7bO9My3IAA4Fm8kQp3qO"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-600/10 text-green-500 hover:bg-green-600/20 px-4 py-2 rounded-full border border-green-500/20 transition-all group"
                                >
                                    <MessageCircle size={18} className="group-hover:rotate-12 transition-transform" />
                                    <span className="text-sm font-medium">WhatsApp Community</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/5 pt-8 text-center flex flex-col items-center gap-2">
                    <p className="text-gray-600 text-sm">
                        &copy; 2025 The Shoe Club. All rights reserved.
                    </p>
                    <Link to="/login" className="text-[10px] text-gray-800 hover:text-gray-600 transition-colors uppercase tracking-[0.2em]">
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
