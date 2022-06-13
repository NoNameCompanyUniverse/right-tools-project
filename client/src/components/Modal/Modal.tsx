import React from 'react';
import style from './index.module.scss';
import {XIcon} from "@heroicons/react/outline";
import {AnimatePresence, motion, Variants} from "framer-motion"

type IModal = {
    modal: { id: string, isOpen: boolean },
    onClose: (id: string) => void,
    title?: string
}


const scaleModal: Variants = {
    initial: {
        scale: 0.3,
        opacity: .5
    },
    animate: {
        scale: 1,
        opacity: 1,
    }
}

const Modal: React.FC<IModal> = (
    {
        modal,
        onClose,
        title,
        children
    }) => {

    const {id, isOpen} = modal;

    const handleOnClose = () => onClose(id);

    const handleOnModal = (event:any) => {
        (!event.target.closest(`${'.'+style.dialog}`)) ? onClose(id) : ''

    }


    return (
        <>
            <AnimatePresence exitBeforeEnter>
                {
                    isOpen && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={handleOnModal}
                            className={style.container}>
                            <motion.div
                                variants={scaleModal}
                                initial={`initial`}
                                animate={`animate`}
                                exit={`initial`}
                                whileHover={{scale: 1.01}}
                                className={style.dialog}>
                                <motion.button
                                    whileHover={{scale: 1.3}}
                                    onClick={handleOnClose}
                                    type={`button`}
                                    className={style.close}>
                                    <XIcon/>
                                </motion.button>
                                {title && <div className={style.header}><h2>{title}</h2></div>}
                                <div className={style.body}>
                                    {children}
                                </div>
                            </motion.div>
                        </motion.div>

                    )
                }
            </AnimatePresence>
        </>
    );
};

export default Modal;