import React from 'react';
import style from './index.module.scss';
import DropDown from "../../DropDown";
import {motion} from "framer-motion";

type ICard = {
    id: number,
    name: string,
    banner: string,
}


const Card:React.FC<{props: ICard}> = ({props}) => {

    const {id, banner, name} = props;

    return (
        <div className={style.block}>
            <motion.div
                whileHover={{width: '75%', height: '5.75rem', transformOrigin: 'left top'}}
                className={style.banner}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img whileHover={{scale: 1.05}} src={banner} alt=""/>
            </motion.div>
            <div className={style.title}>
                <span className={`text-black`}>{name}</span>
            </div>
            <div className={style.control}>
                <DropDown>
                    <ul>
                        <li>Открыть</li>
                        <li>Удалить</li>
                    </ul>
                </DropDown>
            </div>
        </div>
    );
};

export default Card;