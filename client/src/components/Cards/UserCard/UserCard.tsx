import React, {ReactNode} from 'react';
import style from './index.module.scss';
import DropDown from "../../DropDown";
import {motion} from "framer-motion";
import {IUser} from "../../../types/IUser";

type IUserCard = {
    data: IUser,
    children?: ReactNode | ReactNode []
}

const UserCard: React.FC<IUserCard> = ({data, children}) => {

    const {id, status, firstname, lastname, avatar, tags} = data;

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
                {
                    children && (
                        <DropDown>{children}</DropDown>
                    )
                }
            </div>
            <div className={style.name}>
                <span className="text-black">
                    {`${lastname} ${firstname}`}
                </span>
            </div>
            <div className={style.status}>
                <span className={`text-gray`}>
                    {status}
                </span>
            </div>
            <div className={`d-flex align-items-center flex-wrap`}>
                {
                    tags.map((tag: { id: number, value: string }, index: number) => (
                        <motion.div
                            whileHover={
                                {
                                    y: -5,
                                    transformOrigin: 'left top'
                                }}
                            key={index} className='tag'>
                            {tag.value}
                        </motion.div>
                    ))
                }
            </div>
        </div>
    );
};

export default React.memo(UserCard);