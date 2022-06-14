import React, {ReactNode, useState} from 'react';
import style from './index.module.scss';
import Link from 'next/link'
import {CollectionIcon, LogoutIcon, MenuAlt1Icon, UserGroupIcon, UserIcon} from "@heroicons/react/outline";
import TodayDate from "../Panel/TodayDate";
import {motion} from "framer-motion";
import {signOut} from 'next-auth/react';
import {IModal} from "../../types/IModal";
import Modal from '../Modal';

const Layout: React.FC = ({children}) => {

    const [isOpen, setIsOpen] = useState(false);

    const [modal, setModal] = useState<IModal>({id: '#exit', isOpen: false});

    const handleOnModal = (id: string) => {
        setModal({id, isOpen: !modal.isOpen})
    }

    return (
        <>
            <Modal modal={modal} onClose={handleOnModal} title={'Внимание'}>
                <p className={'text-black fs-5 mb-3'}>
                    Вы точно хотите выйти из аккаунта?
                </p>
                <div className={'d-flex justify-content-end'}>
                    <button className={'btn btn-danger'} onClick={() => signOut()} type={'button'}>
                        Выйти
                    </button>
                </div>
            </Modal>
            <div className={[style.aside, isOpen ? style.open : ''].join(" ")}>
                <div className="d-flex flex-column" style={{'height': '100%'}}>
                    <div className="mb-5">
                        <Link href={`/`}>
                            <a className={`d-flex align-items-center`}>
                                <span className={style.logo}/>
                                <span className={`ms-3`}>
                                        Right <span className="text-success ms-1">Tools</span>
                                    </span>
                            </a>
                        </Link>
                    </div>
                    <div className="flex-grow-1">
                        <ul className={style.nav}>
                            <li>
                                <Link href={`/profile`}>
                                    <a className={style.link}>
                                        <i className={style.icon}>
                                            <UserIcon/>
                                        </i>
                                        <span>Профиль</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/users`}>
                                    <a className={style.link}>
                                        <i className={style.icon}>
                                            <UserGroupIcon/>
                                        </i>
                                        <span>Пользователи</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/projects`}>
                                    <a className={style.link}>
                                        <i className={style.icon}>
                                            <CollectionIcon/>
                                        </i>
                                        <span>Проекты</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <button
                            type={`button`}
                            onClick={() => handleOnModal(modal.id)}
                            className={style.link}>
                            <i className={style.icon}>
                                <LogoutIcon/>
                            </i>
                            <span>
                                    Выйти
                                </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className={style.main}>
                <div className="d-flex align-items-center mb-4">
                    <motion.button
                        type={'button'}
                        initial={false}
                        animate={isOpen ? {scaleX: 1, scaleY: 1} : {scaleX: -1, scaleY: 1}}
                        onClick={() => setIsOpen(!isOpen)}
                        className={[style.menu, 'me-4'].join(" ")}>
                            <span className="icon">
                                <MenuAlt1Icon/>
                            </span>
                    </motion.button>
                    <TodayDate/>
                </div>
                {
                    children
                }
            </div>

        </>
    );
};

export default Layout;