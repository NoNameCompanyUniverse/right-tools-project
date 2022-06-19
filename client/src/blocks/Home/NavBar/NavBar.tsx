import React from 'react';
import style from "../../../styles/home/Home.module.scss";
import Link from "next/link";
import {useAppSelector} from "../../../redux/hooks";

const NavBar = () => {

    const {auth} = useAppSelector(state => state.profileSlice)


    return (
        <div className={style.nav}>
            <div className={`container-fluid`}>
                <div className={`row justify-content-between align-items-center`}>
                    <div className={`col-auto`}>
                        <div className={style.logo}>
                            <Link href={`/`}>
                                <a>
                                    Right <span>Tools</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className={`col-auto`}>
                        <ul className={`d-flex align-items-center`}>
                            <li><a href="#" className={style.link}>Item 1</a></li>
                            <li><a href="#" className={style.link}>Item 2</a></li>
                            <li><a href="#" className={style.link}>Item 3</a></li>
                            <li><a href="#" className={style.link}>Item 4</a></li>
                        </ul>
                    </div>
                    <div className={`col-auto`}>
                        {
                            auth ? (
                                <div className={`d-flex align-items-center`}>
                                    <div className={`me-3`}>
                                        <Link href={`/profile/`}>
                                            <a className={style.link}>
                                                {[auth.last_name, auth.first_name].join(" ")}
                                            </a>
                                        </Link>
                                    </div>
                                    <div className={style.avatar}>
                                        <img src={auth.photo ? auth.photo : '/profile/default-profile.png'} alt=""/>
                                    </div>
                                </div>
                            ) : (
                                <Link href={'/auth'}>
                                    <a className={style.link}>Авторизация</a>
                                </Link>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;