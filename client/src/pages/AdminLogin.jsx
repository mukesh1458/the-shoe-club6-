import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, PlusCircle, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSetup, setIsSetup] = useState(true);
    const [checking, setChecking] = useState(false);
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_URL || 'https://the-shoe-club6.onrender.com';

    useEffect(() => {
        checkSetup();
    }, []);

    const checkSetup = async () => {
        try {
            const res = await axios.get(`${API_BASE}/api/auth/is-setup`);
            setIsSetup(res.data.isSetup);
        } catch (err) {
            console.error('Failed to check setup status');
        } finally {
            setChecking(false);
        }
    };

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post(`${API_BASE}/api/auth/login`, { password });
            localStorage.setItem('token', res.data.token);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid Password');
        }
    };

    if (checking) return (
        <div className="min-h-screen bg-luxury-black flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gold-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full bg-charcoal p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-accent/10 text-gold-accent mb-4">
                        {isSetup ? <Lock size={32} /> : <PlusCircle size={32} />}
                    </div>
                    <h2 className="text-3xl font-serif text-cream">
                        {isSetup ? 'Admin Access' : 'Initial Setup'}
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        {isSetup ? 'Welcome back. Please sign in to your account.' : 'Create your admin account to get started.'}
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-center mb-6 p-3 rounded-lg text-sm ${error.includes('created') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold text-gold-accent uppercase tracking-widest mb-2">Password</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                <Lock size={18} />
                            </span>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="block w-full bg-luxury-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-cream focus:outline-none focus:border-gold-accent transition-all placeholder:text-gray-600"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl text-luxury-black bg-gold-accent hover:bg-yellow-600 font-bold tracking-widest uppercase transition-all duration-300 transform active:scale-95 shadow-lg shadow-gold-accent/20"
                    >
                        <span>{isSetup ? 'Sign In' : 'Create Admin'}</span>
                        <ArrowRight size={18} />
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                        Unauthorized access is strictly prohibited
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
