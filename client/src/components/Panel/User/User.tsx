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
        first_name,
        username,
        subdivision,
        email,
        last_name,
        photo,
        phone,
        description,
        banner
    } = data;

    return (
        <div className={style.block}>
            <div className={style.title}>
                Профиль
            </div>
            <div className={style.banner}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={banner ? banner : '/profile/user-banner.jpg'} alt=""/>
            </div>
            <div className={style.body}>
                <div className={style.user}>
                    <div className={style.avatar}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo ? photo : '/profile/default-profile.png'} alt=""/>
                    </div>
                    {
                        children && children
                    }

                </div>
                <div className={`mt-3`}>
                    <div className={style.name}>
                        <span className={`text-black`}>
                            {`${last_name} ${first_name}`}
                        </span>
                    </div>
                    <div className={style.login}>
                        <span className="text-gray">
                            @{username}
                        </span>
                    </div>
                    {
                        subdivision && (
                            <div className={`mt-3 ${style.status}`}>
                                <span className="text-black">
                                    {subdivision.name}
                                 </span>
                            </div>
                        )
                    }

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
                            {phone}
                        </div>
                    </div>
                    <div className={`mt-3`}>
                        <span className="text-gray">Описание</span>
                        <div className={`text-black`} style={{"whiteSpace" : "pre-line"}}>
                            {description}
                        </div>
                    </div>

                </div>
                {/*<div className="mt-4">*/}
                {/*    <div className="text-gray mb-2">Мои способности</div>*/}
                {/*    <div className='d-flex flex-wrap align-items-center'>*/}
                {/*        {*/}
                {/*            tags.map((tag: { id: number, value: string }) => (*/}
                {/*                <motion.div*/}
                {/*                    whileHover={*/}
                {/*                        {*/}
                {/*                            y: -5,*/}
                {/*                            transformOrigin: 'left top'*/}
                {/*                        }}*/}
                {/*                    key={tag.id} className='tag'>*/}
                {/*                    {tag.value}*/}
                {/*                </motion.div>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default React.memo(User);