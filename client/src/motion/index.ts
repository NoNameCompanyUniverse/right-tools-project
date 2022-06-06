import {Variants} from "framer-motion";

export const PageTransition: Variants = {
    initial: {
        opacity: 0,
        x: -10,
    },
    animate: {
        opacity: 1,
        x: 0,
    },

}

export const fadeUp: Variants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    animate: i => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,

        }
    }),
}

export const rightIn: Variants = {
    initial: {
        opacity: 0,
        x: 20,
    },
    animate: i => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            ease: `easeOut`,
            duration: .5
        }
    }),
}

export const leftIn: Variants = {
    initial: {
        opacity: 0,
        x: -20,
    },
    animate: i => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            ease: `easeOut`,
        }
    }),
}

export const scaleIn: Variants = {
    initial: {
        scale: 0.3,
        opacity: 0
    },
    animate: i => ({
        scale: 1,
        opacity: 1,
        transition: {
            delay: i * 0.1,
            duration: .3
        }
    }),
}

export const fadeIn: Variants = {
    initial: {
        opacity: 0,
    },
    animate: i => ({
        opacity: 1,
        transition: {
            delay: i * 0.1,
            duration: .5,
            ease: `easeOut`
        }
    }),
}

export const fadeUpRotateRight: Variants = {
    initial: {
        opacity: 0,
        y: 100,
        rotate: 5,
        transformOrigin: "left"
    },
    animate: i => ({
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: {
            delay: i * 0.1,
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    })
}

export const fadeScroll: Variants = {
    initial: {
        opacity: 0, y: 20
    },
    animate: {
        opacity: 1, y: 0
    },
    exit: {
        opacity: 0, y: -20
    }
}