import React, {useState} from 'react';
import {DotsVerticalIcon} from "@heroicons/react/solid";
import style from './index.module.scss';
import {motion} from "framer-motion";

const DropDown: React.FC = ({children}) => {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={style.block}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${style.control} ${isOpen ? style.active : ''}`}
                type={`button`}>
                <DotsVerticalIcon/>
            </button>

            {
                isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0,
                            translateX: '-100%',
                            transformOrigin: 'top right'
                        }}
                        animate={{
                            translateX: '-100%',
                            opacity: 1,
                            scale: 1,
                        }}
                        className={style.list}>
                        {
                            children
                        }
                    </motion.div>
                )
            }

        </div>
    );
};

export default DropDown;