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
import Modal from "../../Modal";


type IPanelInfo = {
    id: number,
    name: string,
    description: string,
    team: Array<{ id: number, avatar: string }>,
    mindmap: Array<{ id: number, name: string }>,
    kanban: Array<{ id: number, name: string }>,
    file: Array<{ id: number, name: string }>,
}

const PanelInfo: React.FC<{ props: IPanelInfo }> = ({props}) => {

    const {id, kanban, name, file, mindmap, description, team} = props;


    const [modal, setModal] = useState<IModal>({id: '#DESCRIPTION', isOpen: false});

    const handleOnModal = (id: string) => {
        setModal({...modal, isOpen: !modal.isOpen});
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
                            <button onClick={() => handleOnModal(modal.id)}
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
                                        <div
                                            className={[style.item, 'd-flex', 'align-items-center', 'justify-content-center'].join(" ")}>
                                            <i className={'icon icon-lg'}>
                                                <FolderAddIcon/>
                                            </i>
                                        </div>
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
                                            className={[style.item, 'd-flex', 'align-items-center', 'justify-content-center'].join(" ")}>
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
            <Modal modal={modal} onClose={handleOnModal}>
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
        </>
    );
};

export default PanelInfo;