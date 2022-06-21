import React, {FormEvent, useEffect, useState} from 'react';
import {IProject} from "../../types/IProject";
import {IModal} from "../../types/IModal";
import {toast} from "react-toastify";
import ControlProfile from "../../blocks/Profile/ControlProfile";
import {motion} from "framer-motion";
import {PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import StatisticsCard from "../../components/Panel/StatisticsCard";
import User from "../../components/Panel/User";
import Users from "../../components/Panel/Users";
import Modal from '../../components/Modal';
import {useSession} from "next-auth/react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getUsers} from "../../redux/actions/UsersAction";
import {IUser} from "../../types/IUser";
import SkeletonProfile from "../../components/Skeleton/SkeletonProfile";
import SkeletonProject from "../../components/Skeleton/ SkeletonProject";
import {getProfileInfo, putMe} from "../../redux/actions/ProfileAction";
import {deleteProject, getProjectsProfile} from "../../redux/actions/ProjectsAction";
import ProjectCard from "../../components/Cards/ProjectCard/ProjectCard";
import Link from 'next/link'

const Profile = () => {

    const {data: session} = useSession()

    const {users, isFetching} = useAppSelector(state => state.usersSlice);
    const {auth, info} = useAppSelector(state => state.profileSlice);
    const {projects, loading} = useAppSelector(state => state.projectSlice);
    const dispatch = useAppDispatch();


    const [modal, setModal] = useState<IModal []>([
        {id: '#controlUser', isOpen: false},
        {id: '#popup', isOpen: false}
    ]);

    const [id, setId] = useState(0)

    const handleSetProfile = (_data: IUser, photo: any, banner: any) => {
        //@ts-ignore
        const token: string = session?.accessToken;
        const data = {
            username: _data.username,
            first_name: _data.first_name,
            last_name: _data.last_name,
            phone: _data.phone,
            email: _data.email,
            description: _data.description,
            date_birth: _data.date_birth,
            subdivision: _data.subdivision ? _data.subdivision.id : 1
        }
        console.log(photo)
        dispatch(putMe({token, data, id: _data.id, photo, banner}))
    };

    const handleDelete = (id: number) => {
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
        dispatch(deleteProject({token, id}))
        setId(0);
        handleOnModal(modal[1].id);
    }

    useEffect(() => {
        //@ts-ignore
        const token: string = session?.accessToken;
        dispatch(getUsers({token, limit: 4}));
        dispatch(getProfileInfo(token));
        dispatch(getProjectsProfile({token, limit: 3}));
    }, [dispatch]);

    return (
        <>
            {
                auth && (
                    <ControlProfile
                        modal={modal[0]}
                        setModal={handleOnModal}
                        data={auth}
                        onProfile={handleSetProfile}/>
                )
            }
            <motion.div
                variants={PageTransition}
                initial={`initial`}
                animate={'animate'}>
                <div className="row">
                    <div className="col-xl">
                        <div>
                            <Title value={'С возвращением в RightTool'}/>
                        </div>
                        <div className="row mt-5 mb-3 gx-3">
                            <div className="col-sm-4">
                                <StatisticsCard
                                    title={`Количество сотрудников`}
                                    count={info.users}
                                    description={`Количество сотрудников в вашей корпоративной среде`}
                                    background={'#868974'}
                                />
                            </div>
                            <div className="col-sm-4">
                                <StatisticsCard
                                    title={`Количество проектов вашим участием`}
                                    count={info.projects_with_me}
                                    description={`Количество проектов в которых вы принимаете участие`}
                                    background={`#F0B878`}
                                />
                            </div>
                            <div className="col-sm-4">
                                <StatisticsCard
                                    title={`Количество ваших проектов`}
                                    count={info.projects_admin}
                                    description={`Количество ваших личных проектов`}
                                    background={`#8E9993`}
                                />
                            </div>
                        </div>
                        <div>
                            <Title value={'Ваши проекты'}/>
                        </div>
                        <div className="row my-5 gx-4">
                            {
                                loading === 'PENDING' ? [...new Array(3)].map((_, index) => (
                                    <div key={index} className="col-xxl-4 col-lg-6 mb-4">
                                        <SkeletonProject/>
                                    </div>
                                )) : loading === 'FULFILLED' ? Array.isArray(projects) && projects.length > 0 ? projects
                                        .slice(0, 3).map((i: IProject, index) => (
                                            <div key={index} className="col-xxl-4 col-lg-6 mb-4">
                                                <ProjectCard data={i} root={auth ? auth.id : 0}>
                                                    <ul>
                                                        <li>
                                                            <Link href={`/project/${i.id}`}>
                                                                <a>
                                                                    Подробнее
                                                                </a>
                                                            </Link>
                                                        </li>
                                                        <li onClick={() => handleDelete(i.id)}>
                                                            Удалить
                                                        </li>
                                                    </ul>
                                                </ProjectCard>
                                            </div>
                                        )) : <>Нет проектов</>
                                    : <>Ошибка загрузки</>
                            }
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className={`mb-3`}>
                            {
                                auth ? (
                                    <User data={auth}>
                                        <button
                                            type={`button`}
                                            onClick={() => handleOnModal(modal[0].id)}
                                            className={`btn btn-sm btn-green ms-2 rounded-pill`}>
                                            Изменить
                                        </button>
                                    </User>
                                ) : <SkeletonProfile/>
                            }
                        </div>
                        <div className={`mb-3`}>
                            <Users users={users}/>
                        </div>
                    </div>
                </div>
            </motion.div>
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
        </>
    );
};

export default Profile;