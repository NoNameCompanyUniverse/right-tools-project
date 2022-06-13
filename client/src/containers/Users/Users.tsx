import React, {useEffect, useState} from 'react';
import {fadeUp, PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import Search from "../../components/Search";
import users_data from "../../../data-users.json";
import UserCard from "../../components/Cards/UserCard";
import {motion} from "framer-motion";
import {IUser} from "../../types/IUser";

const Users = () => {


    const [usersData, setUsersData] = useState<IUser[]>(users_data)
    const [query, setQuery] = useState("")

    const handleOnSearch = (value: string) => {
        setQuery(value)
    }
    const [user, setUser] = useState<IUser | null>();

    const handleOnUser = (data: IUser) => {
        setUser(data);
    }

    useEffect(() => {
        if (users_data.length > 0) {
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
                                usersData.filter(user => user.firstname.toLowerCase().includes(query) || user.lastname.toLowerCase().includes(query))
                                    .map((user, index) => (
                                    <motion.div
                                        variants={fadeUp}
                                        initial={`initial`}
                                        animate={`animate`}
                                        custom={index}
                                        key={user.id}
                                        className={`col-xl-3 mb-3`}>
                                        <UserCard data={user}>
                                            <ul>
                                                <li onClick={() => handleOnUser(user)}>
                                                    Подробнее
                                                </li>
                                            </ul>
                                        </UserCard>
                                    </motion.div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Users;