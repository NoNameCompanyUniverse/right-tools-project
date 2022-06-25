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

    const {id, subdivision, full_name, photo, online} = data;

    return (
        <motion.div
            className={style.block}
            whileHover={{y: -10}}>
            <div className={[style.avatar, online ? style.online : ''].join(" ")}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo ? photo : '/profile/default-profile.png'} alt=""/>
            </div>
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
            {
                subdivision && (
                    <div className={style.status}>
                        <span className={`text-gray`}>
                            {subdivision.name}
                        </span>
                    </div>
                )
            }

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
        </motion.div>
    );
};

export default React.memo(UserCard);