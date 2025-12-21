import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Mail, Clock } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Contact = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 150]);

    const contactInfo = [
        {
            icon: <Phone className="text-gold-accent" size={24} />,
            title: "Call Us",
            value: "+91 9966909792",
            link: "tel:+919966909792",
            desc: "Mon-Sat, 10am - 9pm"
        },
        {
            icon: <MessageCircle className="text-gold-accent" size={24} />,
            title: "WhatsApp",
            value: "Direct Message",
            link: "https://wa.me/919966909792",
            desc: "Instant support available"
        },
        {
            icon: <Mail className="text-gold-accent" size={24} />,
            title: "Email",
            value: "theshoeclub@gmail.com",
            link: "mailto:theshoeclub@gmail.com",
            desc: "For general inquiries"
        },
        {
            icon: <MapPin className="text-gold-accent" size={24} />,
            title: "Visit Us",
            value: "Saheba Apartment",
            link: "https://maps.app.goo.gl/KWccwoyw1tcP81y97",
            desc: "Addimurthy Nagar, Anantapuramu"
        }
    ];

    return (
        <div className="bg-luxury-black min-h-screen text-cream font-sans">
            <Navbar />

            {/* Hero Section with Parallax */}
            <header className="relative h-[30vh] md:h-[40vh] flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src="/assets/banner2.png"
                        className="w-full h-full object-cover object-center opacity-40 grayscale-[20%] brightness-[0.5]"
                        alt="Contact Us"
                    />
                </motion.div>

                {/* Premium Overlay */}
                <div className="absolute inset-0 z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.9)_100%)]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-luxury-black"></div>
                </div>
                <div className="relative z-20 text-center px-4">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        variants={staggerContainer}
                    >
                        <motion.span
                            variants={fadeInUp}
                            className="text-gold-accent uppercase tracking-[0.4em] text-xs font-bold block mb-4"
                        >
                            Get In Touch
                        </motion.span>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl md:text-7xl font-serif text-white uppercase tracking-tighter"
                        >
                            Contact
                        </motion.h1>
                    </motion.div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={fadeInUp} className="text-4xl font-serif text-white">Connect With Us</motion.h2>
                    <motion.div variants={fadeInUp} className="h-px w-24 bg-gold-accent mx-auto mt-6"></motion.div>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {contactInfo.map((info, index) => (
                        <motion.a
                            key={index}
                            href={info.link}
                            target={info.link.startsWith('http') ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                            variants={fadeInUp}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="bg-charcoal/30 border border-white/5 p-6 md:p-8 rounded-[2.5rem] hover:border-gold-accent/30 transition-all duration-500 group text-center flex flex-col items-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                        >
                            <div className="p-5 bg-white/5 rounded-2xl group-hover:bg-gold-accent/10 transition-colors mb-6 border border-white/5 group-hover:border-gold-accent/20">
                                {info.icon}
                            </div>
                            <div>
                                <h3 className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mb-3">{info.title}</h3>
                                <p className="text-cream text-xl font-medium group-hover:text-gold-accent transition-colors mb-3 tracking-tight">{info.value}</p>
                                <p className="text-gray-500 text-sm font-light italic opacity-60 group-hover:opacity-100 transition-opacity">{info.desc}</p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Map Section */}
                <motion.div
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-32"
                >
                    <motion.div variants={fadeInUp} className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-white">Our Location</h2>
                        <div className="h-px w-24 bg-gold-accent mx-auto mt-6"></div>
                    </motion.div>
                    <motion.div
                        variants={fadeInUp}
                        className="w-full h-[350px] md:h-[550px] rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl group relative"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.593641894337!2d77.5986338!3d14.6789876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb14b05acd5cc9f%3A0xf4e470d6661ba35b!2sSaheba%20apartment!5e0!3m2!1sen!2sin!4v1766296678368!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.7) contrast(1.1)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Store Location"
                            className="grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-[1.01]"
                        ></iframe>
                        <div className="absolute inset-0 pointer-events-none border-[12px] border-luxury-black/10 rounded-[3rem]"></div>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
