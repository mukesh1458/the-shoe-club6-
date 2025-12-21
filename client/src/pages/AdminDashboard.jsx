import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fadeInUp, staggerContainer } from '../utils/animations';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [tips, setTips] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({});

    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? window.location.origin : 'http://localhost:5000');

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'products') {
                const res = await axios.get(`${API_BASE}/api/products`);
                setProducts(res.data);
            } else {
                const res = await axios.get(`${API_BASE}/api/tips`);
                setTips(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleOpenModal = (item = null) => {
        setEditingItem(item);
        setSelectedFile(null);
        if (item) {
            setFormData(item);
        } else {
            // Reset form based on tab
            setFormData(activeTab === 'products' ? { title: '', price: '', category: '', description: '' } : { title: '', content: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({});
        setSelectedFile(null);
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setSelectedFile(e.target.files[0]);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const endpoint = activeTab === 'products' ? 'products' : 'tips';

        try {
            let data;
            let headers = {};

            if (activeTab === 'products') {
                data = new FormData();
                Object.keys(formData).forEach(key => {
                    data.append(key, formData[key]);
                });
                if (selectedFile) {
                    data.append('image', selectedFile);
                }
                headers = {}; // Axios will set correct multipart headers with boundary automatically
            } else {
                data = formData;
            }

            if (editingItem) {
                await axios.put(`${API_BASE}/api/${endpoint}/${editingItem._id}`, data, { headers });
            } else {
                await axios.post(`${API_BASE}/api/${endpoint}`, data, { headers });
            }
            fetchData();
            handleCloseModal();
        } catch (err) {
            console.error(err);
            alert('Failed to save');
        }
    };

    const handleDelete = async (id) => {
        console.log('Attempting to delete item with ID:', id);
        if (!id) {
            console.error('No ID provided for deletion');
            return;
        }

        const endpoint = activeTab === 'products' ? 'products' : 'tips';
        console.log('Delete endpoint:', `${API_BASE}/api/${endpoint}/${id}`);

        try {
            const res = await axios.delete(`${API_BASE}/api/${endpoint}/${id}`);
            console.log('Delete response:', res.data);
            fetchData();
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete: ' + (err.response?.data?.msg || err.message));
        }
    };


    return (
        <div className="min-h-screen bg-luxury-black text-cream font-sans relative">
            {/* Admin Header */}
            <header className="bg-charcoal border-b border-white/10 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-serif text-gold-accent">The Shoe Club Admin</h1>
                    <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white">Logout</button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex space-x-6 mb-8 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`pb-4 px-2 text-sm font-medium tracking-wide uppercase transition-colors ${activeTab === 'products' ? 'border-b-2 border-gold-accent text-gold-accent' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('tips')}
                        className={`pb-4 px-2 text-sm font-medium tracking-wide uppercase transition-colors ${activeTab === 'tips' ? 'border-b-2 border-gold-accent text-gold-accent' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        Fashion Tips
                    </button>
                </div>

                <div className="bg-charcoal rounded-lg p-6 border border-white/5 min-h-[500px]">
                    {activeTab === 'products' ? (
                        <div>
                            <div className="flex justify-between mb-6">
                                <h2 className="text-2xl font-serif">Product Manager</h2>
                                <button onClick={() => handleOpenModal()} className="bg-gold-accent text-luxury-black px-4 py-2 rounded text-sm font-bold uppercase hover:bg-yellow-600 transition">
                                    + Add Product
                                </button>
                            </div>

                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                                className="grid grid-cols-1 gap-4"
                            >
                                {products.map(item => (
                                    <motion.div
                                        key={item._id}
                                        variants={fadeInUp}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-luxury-black p-4 rounded border border-white/5 hover:border-white/10 transition gap-4"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="h-16 w-16 bg-gray-700 rounded flex-shrink-0 overflow-hidden">
                                                <img src={item.image ? (item.image.startsWith('http') || item.image.startsWith('/assets') ? item.image : `${API_BASE}${item.image}`) : 'https://via.placeholder.com/150'} className="h-full w-full object-cover" alt={item.title} />
                                            </div>
                                            <div>
                                                <h4 className="font-serif text-lg leading-tight">{item.title}</h4>
                                                <p className="text-sm text-gold-accent mt-1">{item.price}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3 justify-end sm:justify-start">
                                            <button onClick={() => handleOpenModal(item)} className="text-gray-400 hover:text-white transition uppercase text-xs tracking-wider border border-white/10 px-3 py-1 rounded">Edit</button>
                                            <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300 transition uppercase text-xs tracking-wider border border-red-900/30 px-3 py-1 rounded">Delete</button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex justify-between mb-6">
                                <h2 className="text-2xl font-serif">Tip Manager</h2>
                                <button onClick={() => handleOpenModal()} className="bg-gold-accent text-luxury-black px-4 py-2 rounded text-sm font-bold uppercase hover:bg-yellow-600 transition">
                                    + Add Tip
                                </button>
                            </div>

                            <motion.div
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                                className="space-y-4"
                            >
                                {tips.map(item => (
                                    <motion.div
                                        key={item._id}
                                        variants={fadeInUp}
                                        className="bg-luxury-black p-4 rounded border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
                                    >
                                        <div>
                                            <h4 className="font-serif text-lg leading-tight">{item.title}</h4>
                                            <span className="text-xs text-gray-500 uppercase tracking-wider mt-1 block">{new Date(item.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex space-x-3 justify-end sm:justify-start">
                                            <button onClick={() => handleOpenModal(item)} className="text-gray-400 hover:text-white transition uppercase text-xs tracking-wider border border-white/10 px-3 py-1 rounded">Edit</button>
                                            <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300 transition uppercase text-xs tracking-wider border border-red-900/30 px-3 py-1 rounded">Delete</button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-charcoal p-8 rounded-lg w-full max-w-lg border border-white/10 shadow-2xl">
                        <h3 className="text-2xl font-serif mb-6 text-cream">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full bg-luxury-black border border-white/10 rounded p-2 text-white focus:border-gold-accent outline-none" required />
                            </div>

                            {activeTab === 'products' ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Price</label>
                                            <input name="price" value={formData.price || ''} onChange={handleChange} className="w-full bg-luxury-black border border-white/10 rounded p-2 text-white focus:border-gold-accent outline-none" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">Category</label>
                                            <input name="category" value={formData.category || ''} onChange={handleChange} className="w-full bg-luxury-black border border-white/10 rounded p-2 text-white focus:border-gold-accent outline-none" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Product Image</label>
                                        <input type="file" name="image" onChange={handleChange} className="w-full bg-luxury-black border border-white/10 rounded p-2 text-white focus:border-gold-accent outline-none file:bg-gold-accent/10 file:text-gold-accent file:border-none file:px-4 file:py-1 file:rounded-full file:text-xs file:uppercase file:tracking-wider hover:file:bg-gold-accent/20 cursor-pointer" />
                                        {(selectedFile || (editingItem && editingItem.image)) && (
                                            <div className="mt-2 h-20 w-20 rounded overflow-hidden border border-white/10">
                                                <img
                                                    src={selectedFile ? URL.createObjectURL(selectedFile) : (editingItem.image.startsWith('http') || editingItem.image.startsWith('/assets') ? editingItem.image : `${API_BASE}${editingItem.image}`)}
                                                    className="h-full w-full object-cover"
                                                    alt="Preview"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Description</label>
                                        <textarea name="description" value={formData.description || ''} onChange={handleChange} className="w-full bg-luxury-black border border-white/10 rounded p-2 text-white focus:border-gold-accent outline-none" rows="3" />
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Content (Tip)</label>
                                    <textarea name="content" value={formData.content || ''} onChange={handleChange} className="w-full bg-luxury-black border border-white/10 rounded p-2 text-white focus:border-gold-accent outline-none" rows="5" required />
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 mt-6">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-400 hover:text-white transition">Cancel</button>
                                <button type="submit" className="bg-gold-accent text-luxury-black px-6 py-2 rounded font-bold uppercase hover:bg-yellow-600 transition">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
