import React, {FormEvent, useState} from 'react';
import Link from 'next/link';
import {motion} from "framer-motion";
import {signIn, useSession} from "next-auth/react";
import style from '../../styles/auth/index.module.scss';
import {fadeIn, fadeUp, rightIn, scaleIn} from '../../motion';
import SignIn from "../../blocks/Auth/SignIn";
import SignUp from "../../blocks/Auth/SignUp";


const Auth = () => {

    const [isRegistration, setIsRegistration] = useState<boolean>(true);


    const [auth, setAuth] = useState({username: '', password: ''});

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value,
            name: string = e.currentTarget.name;
        setAuth(state => ({...state, [name]: value}))
    }

    const handleOnLogin = async (data: { username: string, password: string }) => {
        const {username, password} = data;
        await signIn('credentials', {
            username: username,
            password: password,
            callbackUrl: `${process.env.baseURL}/profile/`
        })
    }

    return (
        <section className={style.container}>
            <div className={style.main}>
                <motion.div
                    variants={fadeIn}
                    custom={3}
                    initial={`initial`}
                    animate={`animate`}
                    className={style.logo}>
                    <Link href={`/`}>
                        <a>
                            Right <span>Tools</span>
                        </a>
                    </Link>
                </motion.div>
                {
                    !isRegistration ? (
                        <SignUp>
                            <motion.div
                                variants={fadeIn}
                                custom={11}
                                initial={`initial`}
                                animate={`animate`}
                                className={style.registration}>
                                У вас есть аккаунт?
                                <span className={`ms-1`} onClick={() => setIsRegistration(true)}>
                                            Войти
                                        </span>
                            </motion.div>
                        </SignUp>
                    ) : (
                        <SignIn onSubmit={handleOnLogin}>
                            <motion.div
                                variants={fadeIn}
                                custom={11}
                                initial={`initial`}
                                animate={`animate`}
                                className={style.registration}>
                                Вы здесь впервые?
                                <span
                                    className={`ms-1`}
                                    onClick={() => setIsRegistration(false)}>
                                    Регистрация
                                </span>
                            </motion.div>
                        </SignIn>
                    )
                }

                <div className={style.copyright}>
                    Все права защищены 2022г.
                </div>
            </div>
            <div className={style.banner}>
                <motion.div
                    variants={scaleIn}
                    custom={8}
                    initial={`initial`}
                    animate={`animate`}
                    className={style.card}>
                    <h2>
                        Lorem ipsum dolor sit amet,
                        consectetur adipisicing elit.
                    </h2>
                    <motion.p
                        variants={fadeIn}
                        custom={3}
                        initial={`initial`}
                        animate={`animate`}
                        className={`mt-4`}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        facilis illum nostrum quibusdam recusandae ut veniam!
                    </motion.p>
                </motion.div>
                <img src="/auth/auth-bg.jpg" alt=""/>
            </div>
        </section>
    );
};


export default Auth;