import React, {ReactElement, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {PageTransition} from "../../../motion";
import LayoutPanel from "../../../layout/LayoutPanel";
import Title from "../../../components/Panel/Title";
import UserCard from "../../../components/Cards/UserCard";
import PanelInfo from "../../../components/Project/PanelInfo";
import Tabs from "../../../components/Tabs";
import Card from '../../../components/Project/Card';
import FileCard from "../../../components/Cards/FileCard";
import project_data from '../../../../data-project.json';
import {IProjectFull} from "../../../types/IProject";
import {useRouter} from "next/router";
import Link from 'next/link'
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";



const Project = () => {

    const router = useRouter();


    const [modal, setModal] = useState<IModal>({id: '#popup', isOpen: false});

    const handleOnModal = (id:string) => setModal({...modal, isOpen: !modal.isOpen});

    const [projectData, setProjectData] = useState<IProjectFull>(project_data)

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
                                                                    <li onClick={() => handleOnModal(modal.id)}>Удалить</li>
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
                                                                        <Link href={`${router.asPath}/mindmap/${map.id}`}>
                                                                            <a>
                                                                                Открыть
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                    <li onClick={() => handleOnModal(modal.id)}>Удалить</li>
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
                                                                        <Link href={`${router.asPath}/kanban/${kanban.id}`}>
                                                                            <a>
                                                                                Открыть
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                    <li onClick={() => handleOnModal(modal.id)}>Удалить</li>
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
                                                        <div key={index} className={`col-xxl-4 col-xl-6 col-lg-12 mb-3`}>
                                                            <FileCard props={file}/>
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
                        <PanelInfo props={projectData}/>
                    </div>
                </div>
            </motion.div>
            <Modal modal={modal} onClose={handleOnModal} title={'Внимание'}>
                <form>
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

Project.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Текущий проект'}>
            {page}
        </LayoutPanel>
    )
}

export default Project;