import React from 'react';
import style from './index.module.scss';


type IUsers = {
    users: Array<{id: number, name: string, status: string, avatar: string}>
}

const Users:React.FC<IUsers> = ({users}) => {

    const User:React.FC<{props: {id: number, name: string, status: string, avatar: string}}> = ({props}) => {

        const {id, status, name, avatar} = props;

        return (
            <>
                <div className={`d-flex align-items-center`}>
                    <div className={style.avatar}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={avatar} alt=""/>
                    </div>
                    <div className={`ms-3`}>
                        <div className={style.name}>
                            <span className={`text-black`}>
                                {name}
                            </span>
                        </div>
                        <div className={style.status}>
                            <span className="text-gray">
                                {status}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className={style.block}>
            <div className={style.title}>
                Пользователи
            </div>
            {

                users.map((user, index) => (
                    <div key={index} className={`mb-3`}>
                        <User props={user}/>
                    </div>
                ))

            }
        </div>
    );
};

export default Users;