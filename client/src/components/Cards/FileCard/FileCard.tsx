import React, {ReactNode} from 'react';
import style from './index.module.scss';
import {DocumentTextIcon} from "@heroicons/react/outline";
import {motion} from "framer-motion";
import {IFile} from "../../../types/IFile";
import DropDown from "../../DropDown";


const FileCard: React.FC<{ props: IFile, children?: ReactNode | ReactNode[] }> = ({props, children}) => {
    const {id, size, file, name, format} = props;
    return (
        <div className={style.container}>
            <div className={`row align-items-center justify-content-between`}>
                <div className="col-auto">
                    <div className={`row gx-1 align-items-center flex-nowrap`}>
                        <div className={`${style.icon} ${style[format.toLowerCase()]} col-auto`}>
                            <DocumentTextIcon/>
                        </div>
                        <div className={[`col`, style.info].join(" ")}>
                            <a href={file} download className={[style.title, "text-black"].join(" ")}>
                                {name}
                            </a>
                            <div className={style.typeSize}>
                                <span className="text-gray">
                                    {format.toUpperCase()} / {Math.ceil(+size / 1024)} Kb
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.control}>
                {
                    children && (
                        <DropDown>
                            {children}
                        </DropDown>
                    )
                }
            </div>
        </div>
    );
};

export default FileCard;