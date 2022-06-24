import React, {FormEvent, useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {IModal} from "../../types/IModal";
import {motion} from "framer-motion";
import Link from 'next/link';
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
import {
    deleteKanBan,
    deleteMindMap,
    deleteProjectDocument,
    deleteProjectParticipant,
    getProject
} from "../../redux/actions/ProjectsAction";
import {IUserMin} from "../../types/IUser";
import SkeletonUser from "../../components/Skeleton/SkeletonUser";
import SkeletonFile from "../../components/Skeleton/SkeletonFile";
import SkeletonCard from "../../components/Skeleton/SkeletonCard";
import Card from "../../components/Project/Card/Card";
import ControlBoard from "../../blocks/Project/ControlBoard";

const Project = () => {

    const router = useRouter();
    const {data: session} = useSession()
    const dispatch = useAppDispatch();
    const {project, loading} = useAppSelector(state => state.projectSlice);
    const {auth} = useAppSelector(state => state.profileSlice);
    const [modal, setModal] = useState<IModal[]>([
        {id: '#popup', isOpen: false},
        {id: '#controlBoard', isOpen: false}
    ]);
    const [board, setBoard] = useState<{id: number, name: string, description: string} | null>(null)

    const [type, setType] = useState<"KANBAN" | "MINDMAP">("KANBAN")


    const handleBoard = (id: string, type: "KANBAN" | "MINDMAP", data: {id: number, name: string, description: string}) => {
        setType(type);
        setBoard(data)
        handleOnModal(id)
    }

    const handleOnModal = (id: string) => {
        let clone = modal.concat();
        clone = clone.map((e: IModal) => (
            e.id === id ? {id: e.id, isOpen: !e.isOpen} : e
        ))
        setModal(clone)
    }

    const [buf, setBuf] = useState<{
        type: string | 'TEAM' | 'MINDMAP' | 'KANBAN' | 'FILE',
        id: number
    }>({
        type: '',
        id: 0
    });

    const handleSwitchDelete = (id: number, type: string) => {
        setBuf({type, id});
        handleOnModal(modal[0].id);
    }

    const handleOnDelete = (e: FormEvent) => {
        e.preventDefault();
        //@ts-ignore
        const token: string = session?.accessToken;
        const type = buf.type;
        //@ts-ignore
        const idP: number = router.query.id;
        switch (type) {
            case 'TEAM' : {
                // @ts-ignore
                dispatch(deleteProjectParticipant({token, id: idP, data: {participants: [buf.id]}}))
                break;
            }
            case 'FILE':{
                // @ts-ignore
                dispatch(deleteProjectDocument({token, id: buf.id}))
                break;
            }
            case 'MINDMAP': {
                // @ts-ignore
                dispatch(deleteMindMap({token, id: buf.id}));
                break;
            }
            case 'KANBAN': {
                // @ts-ignore
                dispatch(deleteKanBan({token, id: buf.id}));
                break;
            }
            default : {
                break;
            }
        }
        setBuf({type: '', id: 0});
        handleOnModal(modal[0].id);
    }

    function IsAdmin(Component:any) {
        if (auth && project.info) {
            if (auth.id === project.info.admin.id) {
                return Component
            } else {
                return ''
            }
        }
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
                        <div className="col-xl-4 col-lg-5 mt-3 mb-5">
                            {
                                loading === 'PENDING' || loading === 'REJECTED'
                                    ? <SkeletonUser/>
                                    : project.info && <UserCard data={project.info.admin}/>
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
                                                    loading === 'PENDING' || loading === 'REJECTED' ? [...new Array(3)].map((_, index) => (
                                                        <div key={index} className={`col-xl-4 mb-3`}>
                                                            <SkeletonUser/>
                                                        </div>
                                                    )) : Array.isArray(project.participants) && project.participants.length > 0 ? project.participants.map((i: IUserMin, index) => (
                                                        <div key={index} className={`col-xl-4 mb-3`}>
                                                            <UserCard data={i}>
                                                                {
                                                                    IsAdmin(<ul>
                                                                        <li onClick={() => handleSwitchDelete(i.id, 'TEAM')}>
                                                                            Удалить
                                                                        </li>
                                                                    </ul>)
                                                                }
                                                            </UserCard>
                                                        </div>
                                                    )) : <>Нет проектов</>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Title value={`Mind Maps проекта`}/>
                                        <div className={`mt-4`}>
                                            <div className={`row`}>
                                                {
                                                    loading === 'PENDING' && [...new Array(3)].map((_, index) => (
                                                            <div key={index} className={`col-xl-4 col-lg-6 mb-3`}>
                                                                <SkeletonCard/>
                                                            </div>
                                                        ))
                                                }
                                                {
                                                    loading === 'FULFILLED' && Array.isArray(project.mindmaps) && project.mindmaps.length > 0 ?
                                                        project.mindmaps.map((map, index) => (
                                                            <div key={index} className={`col-xl-4 col-lg-6 mb-3`}>
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
                                                                        {
                                                                            IsAdmin(<>
                                                                                <li onClick={() => handleSwitchDelete(map.id, 'MINDMAP')}>Удалить</li>
                                                                                <li onClick={() => handleBoard(modal[1].id, 'MINDMAP', map)}>Изменить</li>
                                                                            </>)
                                                                        }
                                                                    </ul>
                                                                </Card>
                                                            </div>
                                                        )) : <>No Data</>
                                                }

                                                {
                                                    loading === 'REJECTED' && <>Error Data</>
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Title value={`KanBan boards`}/>
                                        <div className={`mt-4`}>
                                            <div className={`row`}>
                                                {
                                                    loading === 'PENDING' && [...new Array(3)].map((_, index) => (
                                                        <div key={index} className={`col-xl-4 col-lg-6 mb-3`}>
                                                            <SkeletonCard/>
                                                        </div>
                                                    ))
                                                }
                                                {
                                                    loading === 'FULFILLED' && Array.isArray(project.kanban) && project.kanban.length > 0 ?
                                                        project.kanban.map((map, index) => (
                                                            <div key={index} className={`col-xl-4 col-lg-6 mb-3`}>
                                                                <Card data={map}>
                                                                    <ul>
                                                                        <li>
                                                                            <Link
                                                                                href={`${router.asPath}/kanban/${map.id}`}>
                                                                                <a>
                                                                                    Открыть
                                                                                </a>
                                                                            </Link>
                                                                        </li>
                                                                        {
                                                                            IsAdmin(<>
                                                                                <li onClick={() => handleSwitchDelete(map.id, 'KANBAN')}>Удалить</li>
                                                                                <li onClick={() => handleBoard(modal[1].id, 'KANBAN', map)}>Изменить</li>
                                                                            </>)
                                                                        }

                                                                    </ul>
                                                                </Card>
                                                            </div>
                                                        )) : <>No Data</>
                                                }

                                                {
                                                    loading === 'REJECTED' && <>Error Data</>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Title value={`Вложения проекта`}/>
                                        <div className={`mt-4`}>
                                            <div className="row gx-3">
                                                {
                                                    loading === 'PENDING' || loading === 'REJECTED'
                                                        ? [...new Array(5)].map((_, index) => (
                                                            <div key={index}
                                                                 className={`col-xxl-4 col-xl-6 col-lg-12 mb-3`}>
                                                                <SkeletonFile/>
                                                            </div>))
                                                        : project.files.map((file: IFile, index) => (
                                                            <div key={index}
                                                                 className={`col-xxl-4 col-xl-6 col-lg-12 mb-3`}>
                                                                <FileCard props={file}>
                                                                    <ul>
                                                                        {
                                                                            IsAdmin(<li onClick={() => handleSwitchDelete(file.id, 'FILE')}>
                                                                                Удалить
                                                                            </li>)
                                                                        }

                                                                        <li>
                                                                            <a href={file.file} download>Скачать</a>
                                                                        </li>
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
            <ControlBoard
                data={board}
                modal={modal[1]}
                setModal={handleOnModal}
                type={type}
                status={'UPDATE'}/>
            <Modal modal={modal[0]} onClose={handleOnModal} title={'Внимание'}>
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