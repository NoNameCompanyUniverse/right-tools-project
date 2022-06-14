import React, {FormEvent, useState} from 'react';
import Title from "../../components/Panel/Title";
import {FolderAddIcon} from "@heroicons/react/outline";
import Search from "../../components/Search";
import {motion} from "framer-motion";
import {fadeUp, PageTransition} from "../../motion";
import ProjectCard from "../../components/Cards/ProjectCard";
import {IProject} from "../../types/IProject";
import projects_data from "../../../data-projects.json";
import Link from 'next/link'
import {IModal} from "../../types/IModal";
import {toast} from "react-toastify";
import Modal from "../../components/Modal";
import CreateProject from "../../blocks/Project/CreateProject";

const Projects = () => {
    const [query, setQuery] = useState("")
    const [id, setId] = useState(0)
    const [modal, setModal] = useState<IModal []>([
        {id: '#users', isOpen: false},
        {id: '#popup', isOpen: false},
    ]);

    const [projectsData, setProjectsData] = useState<Array<IProject>>(projects_data);

    const handleOnSearch = (value: string) => {
        setQuery(value)
    }



    const handleDeleteProject = (id: number) => {
        setId(id);
        handleOnModal(modal[1].id);
    }
    const handleOnModal = (id: string) => {
        let clone = modal.concat();
        clone = clone.map((e:IModal) => (
            e.id === id ? {id: e.id, isOpen: !e.isOpen} : e
        ))
        setModal(clone)
    }
    const handleOnDelete = (e:FormEvent) => {
        e.preventDefault();
        setProjectsData(projectsData.filter(i => i.id !== id));
        toast.error('Проект удален');
        setId(0);
        handleOnModal(modal[1].id);
    }


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
                                projectsData.filter(project => project.name.toLowerCase().includes(query)).map(
                                    (project, index) => (

                                        <motion.div
                                            variants={fadeUp}
                                            initial={`initial`}
                                            animate={`animate`}
                                            custom={index}
                                            key={project.id}
                                            className="col-xxl-4 col-lg-6 mb-4">
                                            <ProjectCard
                                                data={project}
                                            >
                                                <ul>
                                                    <li>
                                                        <Link href={`/project/${project.id}`}>
                                                            Подробнее
                                                        </Link>
                                                    </li>
                                                    <li onClick={() => handleDeleteProject(project.id)}>
                                                        Удалить
                                                    </li>
                                                </ul>
                                            </ProjectCard>
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

export default Projects;