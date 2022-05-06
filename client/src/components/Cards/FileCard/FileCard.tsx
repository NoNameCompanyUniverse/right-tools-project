import React from 'react';
import style from './index.module.scss';
import {DocumentTextIcon} from "@heroicons/react/outline";
import {motion} from "framer-motion";


type IFileCard = {
    id: number,
    name: string,
    type: string,
    size: string,
    date: string,
}

const FileCard:React.FC<{props: IFileCard}> = ({props}) => {

    const {id, date, size, name, type} = props;

    return (
        <motion.div whileTap={{scale: 0.95}} className={style.container}>
            <div className={`row align-items-center justify-content-between`}>
                <div className="col-auto">
                    <div className={`d-flex align-items-center`}>
                        <div className={`${style.icon} ${style[type.toLowerCase()]}`}>
                            <DocumentTextIcon/>
                        </div>
                        <div className={`ms-1`}>
                            <div className={style.title}>
                                <span className="text-black">
                                    {name}
                                </span>
                            </div>
                            <div className={style.typeSize}>
                                <span className="text-gray">
                                    {type.toUpperCase()} / {size}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-auto">
                    <div className={style.date}>
                        <span className="text-gray">
                            {date}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FileCard;