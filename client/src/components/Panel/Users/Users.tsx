import React from 'react';
import {IUserMin} from '../../../types/IUser';
import style from './index.module.scss';
import Link from 'next/link'
import SkeletonMinUser from "../../Skeleton/SkeletonMinUser";


type IUsers = {
    users: Array<IUserMin>
}

const Users: React.FC<IUsers> = ({users}) => {

    const User: React.FC<{ props: IUserMin }> = ({props}) => {

        const {id, subdivision, full_name, photo} = props;

        return (
            <>
                <div className={`d-flex align-items-center`}>
                    <div className={style.avatar}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo ? photo : '/profile/default-profile.png'} alt=""/>
                    </div>
                    <div className={`ms-3`}>
                        <div className={style.name}>
                            <span className={`text-black`}>
                                {full_name}
                            </span>
                        </div>
                        <div className={style.status}>
                            <span className="text-gray">
                                {subdivision.name}
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
                Array.isArray(users) && users.length <= 0
                    ? [...new Array(4)].map((_, index) => (
                        <div key={index} className={`mb-3`}>
                            <SkeletonMinUser/>
                        </div>
                    )) : (
                        users.map((user, index) => (
                            <div key={index} className={`mb-3`}>
                                <User props={user}/>
                            </div>
                        ))
                    )
            }
            <div className={'mt-3'}>
                <Link href={'/users'}>
                    <a className={'text-black'}>Смотреть еще</a>
                </Link>
            </div>
        </div>
    );
};

export default Users;