import React, {FormEvent, useEffect, useState} from 'react';
import Title from "../../components/Panel/Title";
import Search from "../../components/Search";
import {motion} from "framer-motion";
import {PageTransition} from "../../motion";
import ProjectCard from "../../components/Cards/ProjectCard";
import {IProject} from "../../types/IProject";
import Link from 'next/link'
import {IModal} from "../../types/IModal";
import {toast} from "react-toastify";
import Modal from "../../components/Modal";
import CreateProject from "../../blocks/Project/CreateProject";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import SkeletonProject from "../../components/Skeleton/ SkeletonProject";
import {deleteProject, getProjectsProfileAll} from "../../redux/actions/ProjectsAction";
import {useSession} from "next-auth/react";

const Projects = () => {

    const {data: session} = useSession()

    const [query, setQuery] = useState("")
    const [id, setId] = useState(0)
    const {auth, info} = useAppSelector(state => state.profileSlice);
    const {projects, loading} = useAppSelector(state => state.projectSlice);
    const dispatch = useAppDispatch();
    const [modal, setModal] = useState<IModal []>([
        {id: '#users', isOpen: false},
        {id: '#popup', isOpen: false},
    ]);



    const handleOnSearch = (value: string) => {
        setQuery(value)
    }


    const handleDeleteProject = (id: number) => {
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
        dispatch(getProjectsProfileAll(token));
    }, [dispatch]);


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
                initial={`initial`}
                animate={`animate`}>
                <div className="row">
                    <div className="col">
                        <div>
                            <Title value={'Список ваши проектов'}/>
                        </div>
                        <div className={'mt-5'}>
                            <CreateProject/>
                        </div>

                        <div className={`col-xl-8 mt-5 mb-4`}>
                            <Search placeholder={'Поиск ...'} onSubmit={handleOnSearch}/>
                        </div>
                        <div className="row">
                            {
                                loading === 'PENDING' ? [...new Array(3)].map((_, index) => (
                                    <div key={index} className="col-xxl-4 col-lg-6 mb-4">
                                        <SkeletonProject/>
                                    </div>
                                )) : loading === 'FULFILLED' ? Array.isArray(projects) && projects.length > 0 ? projects.map((i: IProject, index) => (
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
                                                    <li onClick={() => handleDeleteProject(i.id)}>
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
                </div>
            </motion.div>
        </>
    );
};

export default Projects;