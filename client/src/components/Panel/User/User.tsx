import React, {ReactNode} from 'react';
import style from './index.module.scss';
import {IUser} from "../../../types/IUser";
import {motion} from "framer-motion";


interface UserInfo {
    data: IUser,
    children?: ReactNode | ReactNode []
}

const User: React.FC<UserInfo> = ({data, children}) => {

    const {
        id,
        firstname,
        tel, login,
        status,
        email,
        lastname,
        avatar,
        banner,
        tags
    } = data;

    return (
        <div className={style.block}>
            <div className={style.title}>
                Профиль
            </div>
            <div className={style.banner}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={banner} alt=""/>
            </div>
            <div className={style.body}>
                <div className={style.user}>
                    <div className={style.avatar}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={avatar} alt=""/>
                    </div>
                    {
                        children && children
                    }

                </div>
                <div className={`mt-3`}>
                    <div className={style.name}>
                        <span className={`text-black`}>
                            {`${lastname} ${firstname}`}
                        </span>
                    </div>
                    <div className={style.login}>
                        <span className="text-gray">
                            @{login}
                        </span>
                    </div>
                    <div className={`mt-3 ${style.status}`}>
                        <span className="text-black">
                            {status}
                        </span>
                    </div>
                </div>
                <div className={`mt-3`}>
                    <div>
                        <span className="text-gray">Email</span>
                        <div className={`text-black`}>
                            {email}
                        </div>
                    </div>
                    <div className={`mt-3`}>
                        <span className="text-gray">Телефон</span>
                        <div className={`text-black`}>
                            {tel}
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="text-gray mb-2">Мои способности</div>
                    <div className='d-flex flex-wrap align-items-center'>
                        {
                            tags.map((tag: { id: number, value: string }) => (
                                <motion.div
                                    whileHover={
                                        {
                                            y: -5,
                                            transformOrigin: 'left top'
                                        }}
                                    key={tag.id} className='tag'>
                                    {tag.value}
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;