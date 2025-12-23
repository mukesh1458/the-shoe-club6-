export const getApiBase = () => {
    // If we have an environment variable, use it
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // Otherwise, detect if we are running on localhost
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    // Return localhost server if local, otherwise the Render production URL
    return isLocalhost
        ? 'http://localhost:5000'
        : 'https://the-shoe-clubv.vercel.app'; // Updated to the latest domain
};

export const API_BASE = getApiBase();
