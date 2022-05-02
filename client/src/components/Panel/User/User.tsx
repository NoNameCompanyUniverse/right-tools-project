import React from 'react';
import style from './index.module.scss';


type IUser = {
    firstname: string,
    lastname: string,
    login: string,
    email: string,
    tel: string,
    status: string,
    avatar: string,
    banner: string
}

const User: React.FC<IUser> = (
    {
        firstname,
        tel,
        login,
        status,
        email,
        lastname,
        avatar,
        banner
    }) => {
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
                    <button type={`button`} className={`btn btn-sm btn-green ms-2 rounded-pill`}>
                        Изменить
                    </button>
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
            </div>
        </div>
    );
};

export default User;