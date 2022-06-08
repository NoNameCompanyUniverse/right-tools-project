import React, {useState} from 'react';
import style from './index.module.scss';
import {PlusSmIcon, FolderAddIcon} from "@heroicons/react/outline";
import Link from 'next/link';
import {motion} from "framer-motion";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import {Mousewheel, Pagination} from "swiper";
import {IModal} from "../../../types/IModal";
import Modal from "../../../components/Modal";
import AddBoard from "../AddBoard";
import {IMindMap} from "../../../types/IMindMap";
import {IKanBan} from "../../../types/IKanBan";
import {IFile} from "../../../types/IFile";
import {IUser} from "../../../types/IUser";
import {genId} from "../../../helpers/functions";


interface IPanelInfo  {
    data: {
        id: number,
        name: string,
        description: string,
        team: Array<{ id: number, avatar: string }>,
        mindmap: Array<{ id: number, name: string }>,
        kanban: Array<{ id: number, name: string }>,
        file: Array<{ id: number, name: string }>,
    },
    addData: (data: IMindMap | IKanBan | IFile | IUser, type: 'KANBAN' | 'MINDMAP' | 'FILE' | 'TEAM' | string) => void,
}

const PanelInfo: React.FC<IPanelInfo> = ({data, addData}) => {

    const {id, kanban, name, file, mindmap, description, team} = data;

    const [type, setType] = useState<"KANBAN" | "MINDMAP">("KANBAN")

    const handleCreateBoard = (id: string, type: "KANBAN" | "MINDMAP") => {
        setType(type);
        handleOnModal(id)
    }

    const [modal, setModal] = useState<IModal []>([
        {id: '#DESCRIPTION', isOpen: false},
        {id: '#ADDBOARD', isOpen: false}
    ]);

    const handleOnModal = (id: string) => {
        let clone = modal.concat();
        clone = clone.map((e:IModal) => (
            e.id === id ? {id: e.id, isOpen: !e.isOpen} : e
        ))
        setModal(clone)
    }

    const handleOnProject = (action: {type: "KANBAN" | "MINDMAP", payload: IMindMap | IKanBan | IFile | IUser}) => {
        const {type, payload} = action;
        addData(payload, type)
    }

    const handleOnFile = (e:any) => {
        const file = e.currentTarget.files[0];
        console.log(file)
        const newFile: IFile = {
            id: genId(),
            link: '',
            name: file.name,
            size: Math.ceil(file.size / 1024),
            type: file.type.split('image/').join("")
        }
        addData(newFile, 'FILE')
    }

    const Title: React.FC<{ value: string }> = ({value}) => {
        return (
            <div className={style.title}>
                {value.substring(0, value.lastIndexOf(" "))}
                <span className="text-green ms-2">
                    {value.split(' ').pop()}
                </span>
            </div>
        )
    }

    return (
        <>
            <div className={style.container}>
                <div className={style.block}>
                    <div>
                        <div className={`mb-4`}>
                            <div className={style.title}>
                                {name}
                            </div>
                        </div>
                        <div className={`mb-4`}>
                            <div className={style.description}>
                                {description}
                            </div>
                        </div>
                        <div className={`mb-4`}>
                            <div className={style.banner}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={'/profile/user-banner.jpg'} alt=""/>
                            </div>
                        </div>
                        <div className="mb-2">
                            <button onClick={() => handleOnModal(modal[0].id)}
                                    type={'button'}
                                    className="btn-green btn">
                                Подробнее
                            </button>
                        </div>
                        <div className={`mb-4`}>
                            <Title value={`Разработчики проекта`}/>
                        </div>
                        <div className={`mb-5`}>
                            <div className={style.team}>
                                {team.length > 3 && (<div className={style.count}>
                                    {`+${team.length - 3}`}
                                </div>)}
                                {team.map((item: { avatar: string, id: number }, index: number) => {
                                    if (index < 3) {
                                        return (
                                            <>
                                                <div className={style.avatar}>
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={item.avatar} alt=""/>
                                                </div>
                                            </>
                                        )
                                    }
                                })}
                                <div className={style.addUser}>
                                    <PlusSmIcon/>
                                </div>
                            </div>
                        </div>
                        <div className={`mb-4`}>
                            <Title value={`Mind Maps проекта(${mindmap.length})`}/>
                        </div>
                        <div className={`mb-5`}>
                            <>
                                <Swiper
                                    spaceBetween={10}
                                    grabCursor={true}
                                    slidesPerView={2}
                                    mousewheel={true}
                                    modules={[Mousewheel, Pagination]}
                                    centeredSlides={true}>
                                    <SwiperSlide>
                                        <motion.div
                                            onClick={() => handleCreateBoard(modal[1].id, "MINDMAP")}
                                            whileTap={{scale: 0.95}}
                                            className={[style.item, 'd-flex', 'align-items-center', 'justify-content-center'].join(" ")}>
                                            <i className={'icon icon-lg'}>
                                                <FolderAddIcon/>
                                            </i>
                                        </motion.div>
                                    </SwiperSlide>
                                    {
                                        mindmap.map((item: { id: number, name: string }, index: number) => (
                                            <SwiperSlide key={index}>
                                                <motion.div
                                                    whileHover={{scale: .95}}
                                                    key={index} className={style.item}>
                                                    <Link href={`/`}>
                                                        <a>
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                </motion.div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </>
                        </div>
                        <div className={`mb-4`}>
                            <Title value={`KanBan boards(${kanban.length})`}/>
                        </div>
                        <div className={`mb-5`}>
                            <>
                                <Swiper
                                    spaceBetween={10}
                                    grabCursor={true}
                                    slidesPerView={2}
                                    mousewheel={true}
                                    modules={[Mousewheel, Pagination]}
                                    centeredSlides={true}>
                                    <SwiperSlide>
                                        <motion.div
                                            onClick={() => handleCreateBoard(modal[1].id, "KANBAN")}
                                            whileTap={{scale: 0.95}}
                                            className={[style.item, 'd-flex', 'align-items-center', 'justify-content-center'].join(" ")}>
                                            <i className={'icon icon-lg'}>
                                                <FolderAddIcon/>
                                            </i>
                                        </motion.div>
                                    </SwiperSlide>
                                    {
                                        kanban.map((item: { id: number, name: string }, index: number) => (
                                            <SwiperSlide key={index}>
                                                <div key={index} className={style.item}>
                                                    <Link href={`/`}>
                                                        <a>
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </>
                        </div>
                        <div className={`mb-4`}>
                            <Title value={`Вложение проекта(${file.length})`}/>
                        </div>
                        <div className={`mb-5`}>
                            <>
                                <Swiper
                                    spaceBetween={10}
                                    grabCursor={true}
                                    slidesPerView={2}
                                    mousewheel={true}
                                    modules={[Mousewheel, Pagination]}
                                    centeredSlides={true}>
                                    <SwiperSlide>
                                        <motion.div
                                            whileTap={{scale: 0.95}}
                                            style={{"position" : "relative"}}
                                            className={[style.item, 'd-flex', 'align-items-center', 'justify-content-center'].join(" ")}>
                                            <label style={{"width" : "100%", "height" : "100%", "position" : "absolute", "cursor" : "pointer"}}>
                                                <input onChange={handleOnFile} type="file" hidden={true}/>
                                            </label>
                                            <i className={'icon icon-lg'}>
                                                <FolderAddIcon/>
                                            </i>
                                        </motion.div>
                                    </SwiperSlide>
                                    {
                                        file.map((item: { id: number, name: string }, index: number) => (
                                            <SwiperSlide key={index}>
                                                <motion.div
                                                    whileHover={{scale: .95}}
                                                    className={style.item}>
                                                    <Link href={`/`}>
                                                        <a>
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                </motion.div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </>
                        </div>
                    </div>
                </div>
            </div>
            <Modal modal={modal[0]} onClose={handleOnModal}>
                <div className="row">
                    <div className="col-12">
                        <div className="fs-6 mb-2 fw-bold">Название</div>
                        <div className="fs-4">{name}</div>
                    </div>
                    <div className="col-12 mt-2">
                        <div className={style.banner} style={{"height": '15rem'}}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={'/profile/user-banner.jpg'} alt=""/>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="fs-6 mb-2 fw-bold">Описание</div>
                        <div className="fs-6">{description}</div>
                    </div>
                </div>
            </Modal>
            <AddBoard
                onProject={handleOnProject}
                modal={modal[1]}
                setModal={handleOnModal}
                type={type} />
        </>
    );
};

export default React.memo(PanelInfo);