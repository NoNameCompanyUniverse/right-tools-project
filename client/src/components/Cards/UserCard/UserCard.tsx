import React from 'react';
import style from './index.module.scss';
import DropDown from "../../DropDown";
import {motion} from "framer-motion";

type IUserCard = {
    id: number,
    avatar: string,
    name: string,
    status: string,
    tags: Array<{ id: number, name: string }>
}

const UserCard: React.FC<{ props: IUserCard }> = ({props}) => {

    const {id, status, name, avatar, tags} = props;

    return (
        <div className={style.block}>
            <motion.div
                whileHover={
                    {
                        width: '5.75rem',
                        height: '5.75rem',
                        transformOrigin: 'left top'
                    }}
                className={style.avatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatar} alt=""/>
            </motion.div>
            <div className={style.control}>
                <DropDown>
                    <ul>
                        <li>Подробнее</li>
                        <li>Добавить</li>
                    </ul>
                </DropDown>
            </div>
            <div className={style.name}>
                <span className="text-black">
                    {name}
                </span>
            </div>
            <div className={style.status}>
                <span className={`text-gray`}>
                    {status}
                </span>
            </div>
            <div className={`d-flex align-items-center flex-wrap`}>
                {
                    tags.map((tag: { id: number, name: string }, index: number) => (
                        <motion.div
                            whileHover={
                                {
                                    y: -5,
                                    transformOrigin: 'left top'
                                }}
                            key={index} className='tag'>
                            {tag.name}
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
};

export default UserCard;