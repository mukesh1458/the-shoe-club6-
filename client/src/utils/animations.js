const premiumEase = [0.22, 1, 0.36, 1];

export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.8, ease: premiumEase }
};

export const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

export const pageTransition = {
    initial: { opacity: 0, scale: 0.99 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: premiumEase
        }
    },
    exit: {
        opacity: 0,
        scale: 1.01,
        transition: {
            duration: 0.5,
            ease: premiumEase
        }
    }
};

export const floatAnimation = {
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const glowAnimation = {
    animate: {
        boxShadow: [
            "0 0 10px rgba(212, 175, 55, 0.2)",
            "0 0 25px rgba(212, 175, 55, 0.5)",
            "0 0 10px rgba(212, 175, 55, 0.2)"
        ],
        transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

export const hoverScale = {
    whileHover: { scale: 1.03, transition: { duration: 0.3, ease: premiumEase } },
    whileTap: { scale: 0.97 }
};
