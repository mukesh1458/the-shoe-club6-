import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-luxury-black flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 mb-8 text-gold-accent opacity-20">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-serif text-gold-accent mb-4">Something went wrong</h2>
                    <p className="text-gray-400 max-w-md mb-8">
                        Experience interrupted. We've been notified and are working to restore the seamless experience you expect.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-gold-accent text-luxury-black font-bold uppercase tracking-widest hover:bg-gold-light transition-colors duration-300 rounded-full text-sm"
                    >
                        Reload Experience
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
