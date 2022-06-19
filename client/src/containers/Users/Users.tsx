import React, {useEffect, useState} from 'react';
import {fadeUp, PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import Search from "../../components/Search";
import UserCard from "../../components/Cards/UserCard";
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useSession} from "next-auth/react";
import {getUsersAll, postUser} from "../../redux/actions/UsersAction";
import {IUserMin} from "../../types/IUser";
import CreateUser from "../../blocks/Users/CreateUser";
import SkeletonUser from "../../components/Skeleton/SkeletonUser";

const Users = () => {


    const [query, setQuery] = useState("")

    const {users, isFetching} = useAppSelector(state => state.usersSlice);
    const dispatch = useAppDispatch();

    const handleOnSearch = (value: string) => {
        setQuery(value)
    }
    const [user, setUser] = useState<IUserMin | null>();

    const handleOnUser = (data: IUserMin) => {
        setUser(data);
    }


    const {data: session} = useSession()
    useEffect(() => {
        //@ts-ignore
        const token: string = session?.accessToken;
        dispatch(getUsersAll(token));
    }, [dispatch]);


    const handleOnSubmit = (data: any) => {
        //@ts-ignore
        const token: string = session?.accessToken;
        dispatch(postUser({token, data}));
    }

    useEffect(() => {
        //@ts-ignore
        const token: string = session?.accessToken;
        if (isFetching === 'FULFILLED') {
            dispatch(getUsersAll(token))
        }
    }, [isFetching])


    return (
        <>
            <motion.div
                variants={PageTransition}
                initial={'initial'}
                animate={'animate'}>
                <div className="row">
                    <div className="col-xl">
                        <div>
                            <Title value={'Ваши сотрудники'}/>
                        </div>
                        <div className="mt-5">
                            <CreateUser
                                onSubmit={handleOnSubmit}/>
                        </div>
                        <div className={`col-xl-8 my-5`}>
                            <Search placeholder={'Поиск ...'} onSubmit={handleOnSearch}/>
                        </div>
                        <div className={`row`}>
                            {
                                Array.isArray(users) && users.length <= 0
                                    ? [...new Array(6)].map((_, index) => (
                                        <div key={index} className={`col-xl-3 mb-3`}>
                                            <SkeletonUser/>
                                        </div>
                                    ))
                                    : users.filter(user => user.full_name.toLowerCase().includes(query))
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