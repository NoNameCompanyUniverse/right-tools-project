import React, {ReactElement, useEffect, useState} from 'react';
import {motion} from 'framer-motion'
import {PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import LayoutPanel from "../../layout/LayoutPanel";
import Search from "../../components/Search";
import User from "../../components/Panel/User";
import UserCard from "../../components/Cards/UserCard";

import users_data from '../../../data-users.json';
import {IUser} from "../../types/IUser";



const Users = () => {

    const handleOnSearch = (value:string) => {

    }

    const [user, setUser] = useState<IUser | null>();

    const handleOnUser = (data:IUser) => {
        setUser(data);
    }

    useEffect(() => {
        if(users_data.length > 0) {
            setUser(users_data[0])
        }
    }, [])



    return (
        <>
            <motion.div
                variants={PageTransition}
                initial={'initial'}
                animate={'animate'}>
                <div className="row">
                    <div className="col-xl">
                        <div>
                            <Title value={'Поиск новых сотрудников'}/>
                        </div>
                        <div className={`col-xl-8 my-5`}>
                            <Search placeholder={'Поиск ...'} onSubmit={handleOnSearch}/>
                        </div>
                        <div className={`row`}>
                            {
                                users_data.map((user, index) => (
                                    <div
                                        key={index}
                                        className={`col-xl-4 mb-3`}>
                                        <UserCard data={user}>
                                            <ul>
                                                <li onClick={() => handleOnUser(user)}>
                                                    Подробнее
                                                </li>
                                                <li>
                                                    Добавить
                                                </li>
                                            </ul>
                                        </UserCard>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-auto">
                            {
                                user && (
                                    <User
                                        data={user}
                                    />
                                )
                            }

                    </div>
                </div>
            </motion.div>
        </>
    );
};

Users.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Поиск сотрудников'}>
            {page}
        </LayoutPanel>
    )
}

export default Users;