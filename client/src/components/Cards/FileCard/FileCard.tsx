import React from 'react';
import style from './index.module.scss';
import {DocumentTextIcon} from "@heroicons/react/outline";
import {motion} from "framer-motion";
import {IFile} from "../../../types/IFile";
import DropDown from "../../DropDown";



const FileCard:React.FC<{props: IFile}> = ({props}) => {

    const {id, size, link, name, type} = props;

    return (
        <motion.div whileTap={{scale: 0.97}} className={style.container}>
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
                                    {type.toUpperCase()} / {size} Kb
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className={style.control}>
                <DropDown>
                    <ul>
                        <li>
                            <a href={link}>
                                Скачать
                            </a>
                        </li>
                        <li>Удалить</li>
                    </ul>
                </DropDown>
            </div>
        </motion.div>
    );
};

export default FileCard;