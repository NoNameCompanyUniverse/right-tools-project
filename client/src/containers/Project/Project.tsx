import React, {FormEvent, useState} from 'react';
import {useRouter} from "next/router";
import {IModal} from "../../types/IModal";
import {IProjectFull} from "../../types/IProject";
import project_data from "../../../data-project.json";
import {motion} from "framer-motion";
import {PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import UserCard from "../../components/Cards/UserCard";
import Tabs from "../../components/Tabs";
import Card from "../../components/Project/Card";
import Link from "next/link";
import FileCard from "../../components/Cards/FileCard";
import PanelInfo from "../../blocks/Project/PanelInfo";
import Modal from "../../components/Modal";
import {toast} from "react-toastify";
import {IMindMap} from "../../types/IMindMap";
import {IUser} from "../../types/IUser";
import {IKanBan} from "../../types/IKanBan";
import {IFile} from "../../types/IFile";

const Project = () => {
    const router = useRouter();


    const [modal, setModal] = useState<IModal>({id: '#popup', isOpen: false});

    const handleOnModal = (id: string) => setModal({...modal, isOpen: !modal.isOpen});

    const [projectData, setProjectData] = useState<IProjectFull>(project_data);

    const [buf, setBuf] = useState<{
        type: string | 'TEAM' | 'MINDMAP' | 'KANBAN' | 'FILE',
        id: number
    }>({
        type: '',
        id: 0
    });

    const handleDeleteProject = (id: number, type: string) => {
        setBuf({type, id});
        handleOnModal(modal.id);
    }

    const handleOnDelete = (e: FormEvent) => {
        e.preventDefault();
        const type = buf.type.toLowerCase();
        setProjectData((state: any) => ({
            ...state,
            [type]: state[type].filter((i: { id: number; }) => i.id !== buf.id)
        }))
        setBuf({type: '', id: 0});
        toast.error('Удалено');
        handleOnModal(modal.id);
    }

    const handleAddData = (data: IMindMap | IUser | IKanBan | IFile, type: string) => {
        const path = type.toLowerCase();
        setProjectData((state: any) => ({
            ...state,
            [path]: [...state[path], data]
        }))
        toast.success('Добавлено!')
    }


    return (
        <>

            <motion.div
                variants={PageTransition}
                initial={`initial`}
                animate={`animate`}>
                <div className={`row`}>
                    <div className={`col-xl`}>
                        <div>
                            <Title value={`Администратор проекта`}/>
                        </div>
                        <div className="col-xl-4 mt-3 mb-5">
                            <UserCard data={projectData.team[0]}/>
                        </div>
                        <div>
                            <Tabs tabs={[
                                'Разработчики проекта',
                                'Mind Maps проекта',
                                'KanBan boards',
                                'Вложения'
                            ]}>
                                <>
                                    <div>
                                        <Title value={`Разработчики проекта`}/>
                                        <div className={`mt-4`}>
                                            <div className={`row`}>
                                                {
                                                    projectData.team.map((user, index) => (
                                                        <div key={index} className={`col-xl-4 mb-3`}>
                                                            <UserCard data={user}>
                                                                <ul>
                                                                    <li onClick={() => handleDeleteProject(user.id, 'TEAM')}>Удалить</li>
                                                                </ul>
                                                            </UserCard>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Title value={`Mind Maps проекта`}/>
                                        <div className={`mt-4`}>
                                            <div className={`row`}>
                                                {
                                                    projectData.mindmap.map((map, index) => (
                                                        <div key={index} className={`col-xxl-3 col-xl-4 col-lg-6 mb-3`}>
                                                            <Card data={map}>
                                                                <ul>
                                                                    <li>
                                                                        <Link
                                                                            href={`${router.asPath}/mindmap/${map.id}`}>
                                                                            <a>
                                                                                Открыть
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                    <li onClick={() => handleDeleteProject(map.id, 'MINDMAP')}>Удалить</li>
                                                                </ul>
                                                            </Card>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Title value={`KanBan boards`}/>
                                        <div className={`mt-4`}>
                                            <div className={`row`}>
                                                {
                                                    projectData.kanban.map((kanban, index) => (
                                                        <div key={index} className={`col-xxl-3 col-xl-4 col-lg-6 mb-3`}>
                                                            <Card data={kanban}>
                                                                <ul>
                                                                    <li>
                                                                        <Link
                                                                            href={`${router.asPath}/kanban/${kanban.id}`}>
                                                                            <a>
                                                                                Открыть
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                    <li onClick={() => handleDeleteProject(kanban.id, 'KANBAN')}>Удалить</li>
                                                                </ul>
                                                            </Card>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Title value={`Вложения проекта`}/>
                                        <div className={`mt-4`}>
                                            <div className="row gx-3">
                                                {
                                                    projectData.file.map((file, index) => (
                                                        <div key={index}
                                                             className={`col-xxl-4 col-xl-6 col-lg-12 mb-3`}>
                                                            <FileCard props={file}>
                                                                <ul>

                                                                    <li onClick={() => handleDeleteProject(file.id, 'FILE')}>Удалить</li>

                                                                </ul>
                                                            </FileCard>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </Tabs>
                        </div>
                    </div>
                    <div className="col-auto">
                        <PanelInfo addData={handleAddData} data={projectData}/>
                    </div>
                </div>
            </motion.div>
            <Modal modal={modal} onClose={handleOnModal} title={'Внимание'}>
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

export default Project;