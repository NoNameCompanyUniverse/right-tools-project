import React, {FormEvent, useEffect, useState} from 'react';
import {fadeUp, PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import Search from "../../components/Search";
import UserCard from "../../components/Cards/UserCard";
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useSession} from "next-auth/react";
import {deleteUser, getUsersAll, postUser} from "../../redux/actions/UsersAction";
import {IUserMin} from "../../types/IUser";
import CreateUser from "../../blocks/Users/CreateUser";
import SkeletonUser from "../../components/Skeleton/SkeletonUser";
import {IModal} from "../../types/IModal";
import Modal from "../../components/Modal";
import Link from 'next/link'

const Users = () => {


    const [query, setQuery] = useState("")
    const [id, setId] = useState(0)
    const {users, isFetching} = useAppSelector(state => state.usersSlice);
    const {auth} = useAppSelector(state => state.profileSlice);
    const dispatch = useAppDispatch();

    const [modal, setModal] = useState<IModal []>([
        {id: '#users', isOpen: false},
        {id: '#popup', isOpen: false},
    ]);

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

    const handleDeleteUser = (id: number) => {
        setId(id);
        handleOnModal(modal[1].id);
    }
    const handleOnModal = (id: string) => {
        let clone = modal.concat();
        clone = clone.map((e: IModal) => (
            e.id === id ? {id: e.id, isOpen: !e.isOpen} : e
        ))
        setModal(clone)
    }


    const handleOnDelete = (e: FormEvent) => {
        e.preventDefault();
        //@ts-ignore
        const token: string = session?.accessToken;
        dispatch(deleteUser({token, id}))
        setId(0);
        handleOnModal(modal[1].id);
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
            <Modal modal={modal[1]} onClose={handleOnModal} title={'Внимание'}>
                <form onSubmit={handleOnDelete}>
                    <div className="row">
                        <div className="col-12">
                            <p className={'text-black fs-5'}>
                                Вы точно хотите продолжить действие?
                                <br/>
                                Данные будут утеряны без возможности их восстановления
                            </p>
                        </div>
                        <div className="col-12 mt-5">
                            <div className="d-flex justify-content-end">
                                <button type={'submit'} className={'btn btn-danger'}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
            <motion.div
                variants={PageTransition}
                initial={'initial'}
                animate={'animate'}>
                <div className="row">
                    <div className="col-xl">
                        <div>
                            <Title value={'Ваши сотрудники'}/>
                        </div>
                        {
                            auth?.is_staff && (
                                <div className="mt-5">
                                    <CreateUser
                                        onSubmit={handleOnSubmit}/>
                                </div>
                            )
                        }
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
                                                    {
                                                        auth?.id !== user.id && (
                                                            <ul>
                                                                <li onClick={() => handleOnUser(user)}>
                                                                    <Link href={`/profile/${user.id}/`}>
                                                                        <a>Подробнее</a>
                                                                    </Link>
                                                                </li>
                                                                {
                                                                    auth?.is_staff && <li onClick={() => handleDeleteUser(user.id)}>
                                                                        Удалить
                                                                    </li>
                                                                }
                                                            </ul>
                                                        )
                                                    }
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