import React from 'react';
import {AnimatePresence, motion} from "framer-motion";
import style from './index.module.scss';

const Preloader = () => {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className={style.block}>
            <div className={style.center}>
                <span/>
                <span/>
                <span/>
                <span/>
            </div>
        </motion.div>
    );
};

export default Preloader;