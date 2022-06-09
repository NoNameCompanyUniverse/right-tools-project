import React, {useState, useRef, useEffect} from 'react';
import {DotsVerticalIcon} from "@heroicons/react/solid";
import style from './index.module.scss';
import {motion} from "framer-motion";


const useOutSideClick = (ref: any, setOpen: (open: boolean) => void) => {
    useEffect(() => {
        const handleOnClickOutSide = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {setOpen(false)}
        }
        document.addEventListener("mousedown", handleOnClickOutSide);
        return () => {document.removeEventListener("mousedown", handleOnClickOutSide);};
    }, [ref])
}
const DropDown: React.FC = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const elem = useRef(null);
    const handleOnClick = () => setIsOpen(!isOpen);
    useOutSideClick(elem, setIsOpen)
    return (
        <div ref={elem} className={[style.block, "dropdown"].join(" ")}>
            <button
                onClick={() => handleOnClick()}
                className={`${style.control} ${isOpen ? style.active : ''}`}
                type={`button`}>
                <DotsVerticalIcon/>
            </button>
            {
                isOpen && (
                    <motion.div onClick={() => setIsOpen(false)}
                        initial={{opacity: 0, scale: 0, translateX: '-100%', transformOrigin: 'top right'}}
                        animate={{translateX: '-100%', opacity: 1, scale: 1,}}
                        className={style.list}>{children}
                    </motion.div>
                )
            }
        </div>
    );
};

export default DropDown;