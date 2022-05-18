import React, {useState} from 'react';
import Head from 'next/head';
import style from './index.module.scss';
import TodayDate from "../../components/Panel/TodayDate";
import Link from 'next/link';
import {UserIcon, UserGroupIcon, CollectionIcon, LogoutIcon} from "@heroicons/react/outline";

type ILayoutPanel = {
    title: string,
}
const LayoutPanel: React.FC<ILayoutPanel> = (
    {
        children,
        title,
    }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <div className={style.aside}>
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
                                    <Link href={`/profile/1`}>
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
                            <button type={`button`} className={style.link}>
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
                    <TodayDate/>
                    {
                        children
                    }
                </div>
            </div>
        </>
    );
};

export default LayoutPanel;