import React, {FormEvent, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {IModal} from "../../types/IModal";
import {motion} from "framer-motion";
import {PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import UserCard from "../../components/Cards/UserCard";
import Tabs from "../../components/Tabs";
import FileCard from "../../components/Cards/FileCard";
import PanelInfo from "../../blocks/Project/PanelInfo";
import Modal from "../../components/Modal";
import {IFile} from "../../types/IFile";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useSession} from "next-auth/react";
import {deleteProjectParticipant, getProject} from "../../redux/actions/ProjectsAction";
import {IUserMin} from "../../types/IUser";

const Project = () => {

    const router = useRouter();
    const {data: session} = useSession()
    const dispatch = useAppDispatch();
    const {project} = useAppSelector(state => state.projectSlice);

    const [modal, setModal] = useState<IModal>({id: '#popup', isOpen: false});

    const handleOnModal = (id: string) => setModal({...modal, isOpen: !modal.isOpen});

    const [buf, setBuf] = useState<{
        type: string | 'TEAM' | 'MINDMAP' | 'KANBAN' | 'FILE',
        id: number
    }>({
        type: '',
        id: 0
    });

    const handleSwitchDelete = (id: number, type: string) => {
        setBuf({type, id});
        handleOnModal(modal.id);
    }

    const handleOnDelete = (e: FormEvent) => {
        e.preventDefault();
        //@ts-ignore
        const token: string = session?.accessToken;
        const type = buf.type;
        switch (type) {
            case 'TEAM' : {
                // @ts-ignore
                dispatch(deleteProjectParticipant({token, id: router.query.id, data: {participants: [buf.id]}}))
                break;
            }
            default : {
                break;
            }
        }
        setBuf({type: '', id: 0});
        handleOnModal(modal.id);
    }

    useEffect(() => {
        //@ts-ignore
        const token: string = session?.accessToken;
        if (!router.isReady) return;
        // @ts-ignore
        dispatch(getProject({token, id: router.query.id}))
    }, [dispatch, router.isReady])



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
                        <div className="col-xl-3 mt-3 mb-5">
                            {
                                project.info && (
                                    <UserCard data={project.info.admin}/>
                                )
                            }
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
                                                    project.participants.map((user: IUserMin, index) => (
                                                        <div key={index} className={`col-xl-4 mb-3`}>
                                                            <UserCard data={user}>
                                                                <ul>
                                                                    <li onClick={() => handleSwitchDelete(user.id, 'TEAM')}>
                                                                        Удалить
                                                                    </li>
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
                                                    // projectData.mindmap.map((map, index) => (
                                                    //     <div key={index} className={`col-xxl-3 col-xl-4 col-lg-6 mb-3`}>
                                                    //         <Card data={map}>
                                                    //             <ul>
                                                    //                 <li>
                                                    //                     <Link
                                                    //                         href={`${router.asPath}/mindmap/${map.id}`}>
                                                    //                         <a>
                                                    //                             Открыть
                                                    //                         </a>
                                                    //                     </Link>
                                                    //                 </li>
                                                    //                 <li onClick={() => handleDeleteProject(map.id, 'MINDMAP')}>Удалить</li>
                                                    //             </ul>
                                                    //         </Card>
                                                    //     </div>
                                                    // ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Title value={`KanBan boards`}/>
                                        <div className={`mt-4`}>
                                            <div className={`row`}>
                                                {
                                                    // projectData.kanban.map((kanban, index) => (
                                                    //     <div key={index} className={`col-xxl-3 col-xl-4 col-lg-6 mb-3`}>
                                                    //         <Card data={kanban}>
                                                    //             <ul>
                                                    //                 <li>
                                                    //                     <Link
                                                    //                         href={`${router.asPath}/kanban/${kanban.id}`}>
                                                    //                         <a>
                                                    //                             Открыть
                                                    //                         </a>
                                                    //                     </Link>
                                                    //                 </li>
                                                    //                 <li onClick={() => handleDeleteProject(kanban.id, 'KANBAN')}>Удалить</li>
                                                    //             </ul>
                                                    //         </Card>
                                                    //     </div>
                                                    // ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Title value={`Вложения проекта`}/>
                                        <div className={`mt-4`}>
                                            <div className="row gx-3">
                                                {
                                                    project.files.map((file: IFile, index) => (
                                                        <div key={index}
                                                             className={`col-xxl-4 col-xl-6 col-lg-12 mb-3`}>
                                                            <FileCard props={file}>
                                                                <ul>

                                                                    <li onClick={() => handleSwitchDelete(file.id, 'FILE')}>Удалить</li>

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
                        <PanelInfo/>
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