import React, {ReactNode} from 'react';
import style from './index.module.scss';
import DropDown from "../../DropDown";
import {motion} from "framer-motion";
import {IUserMin} from "../../../types/IUser";

type IUserCard = {
    data: IUserMin,
    children?: ReactNode | ReactNode []
}

const UserCard: React.FC<IUserCard> = ({data, children}) => {

    const {id, subdivision, full_name, photo} = data;

    return (
        <div className={style.block}>
            <motion.div
                whileHover={
                    {
                        width: '5.15rem',
                        height: '5.15rem',
                        transformOrigin: 'left top'
                    }}
                className={style.avatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo ? photo : '/profile/default-profile.png'} alt=""/>
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
                    {full_name}
                </span>
            </div>
            <div className={style.status}>
                <span className={`text-gray`}>
                    {subdivision.name}
                </span>
            </div>
            {/*<div className={`d-flex align-items-center flex-wrap`}>*/}
            {/*    {*/}
            {/*        tags.map((tag: { id: number, value: string }, index: number) => (*/}
            {/*            <motion.div*/}
            {/*                whileHover={*/}
            {/*                    {*/}
            {/*                        y: -5,*/}
            {/*                        transformOrigin: 'left top'*/}
            {/*                    }}*/}
            {/*                key={index} className='tag'>*/}
            {/*                {tag.value}*/}
            {/*            </motion.div>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    );
};

export default React.memo(UserCard);