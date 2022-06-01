import React from 'react';
import { IUser } from '../../../types/IUser';
import style from './index.module.scss';


type IUsers = {
    users: Array<IUser>
}

const Users:React.FC<IUsers> = ({users}) => {

    const User:React.FC<{props: IUser}> = ({props}) => {

        const {id, status, firstname, lastname, avatar} = props;

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
                                {[lastname, firstname].join(" ")}
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
                Ваши коллеги
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