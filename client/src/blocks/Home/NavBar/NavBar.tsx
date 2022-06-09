import React, {useEffect, useState} from 'react';
import style from "../../../styles/home/Home.module.scss";
import Link from "next/link";
import {useSession} from "next-auth/react";
import API from "../../../helpers/api";

const NavBar = () => {

    const {data: session, status} = useSession();

    const [state, setState] = useState<any>();

    useEffect(() => {
        async function load() {
            console.log(status)
            if (status === 'authenticated') {
                //@ts-ignore
                const token: string = session?.accessToken;
                const res = await API.getMe(token);
                setState(res)
            }
        }
        load()
    }, [status])


    useEffect(() => {
        console.log(state)
    }, [state])

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
                            state ? (
                                <div className={`d-flex align-items-center`}>
                                    <div className={`me-3`}>
                                        <Link href={`/profile/`}>
                                            <a className={style.link}>
                                                {state.full_name}
                                            </a>
                                        </Link>
                                    </div>
                                    <div className={style.avatar}>
                                        <img src={state.photo} alt=""/>
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