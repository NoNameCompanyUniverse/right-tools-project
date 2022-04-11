import React, {useState} from 'react';
import Link from 'next/link';
import {motion} from "framer-motion";

import style from '../../styles/auth/index.module.scss';
import {fadeIn, fadeUp, rightIn, scaleIn} from '../../motion';


const Auth = () => {

    const [isRegistration, setIsRegistration] = useState<boolean>(true)

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
                    isRegistration && (
                        <form className={style.form}>
                            <div className={style.title}>
                                <motion.h2
                                    variants={fadeUp}
                                    custom={3}
                                    initial={`initial`}
                                    animate={`animate`}
                                    className={`mb-3`}>
                                    Присоединиться<br/>к нам!
                                </motion.h2>
                                <motion.p
                                    variants={fadeUp}
                                    custom={6}
                                    initial={`initial`}
                                    animate={`animate`}>
                                    Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit.
                                    A expedita illo, illum placeat
                                    temporibus voluptate.
                                </motion.p>
                            </div>
                            <div className={`row`}>
                                <div className={`col-12`}>
                                    <motion.input
                                        variants={rightIn}
                                        custom={3}
                                        initial={`initial`}
                                        animate={`animate`}
                                        className={`form-control`}
                                        placeholder={`Введите логин`}
                                        type="text"/>
                                </div>
                                <div className={`col-12 mt-4`}>
                                    <motion.input
                                        variants={rightIn}
                                        custom={6}
                                        initial={`initial`}
                                        animate={`animate`}
                                        className={`form-control`}
                                        placeholder={`Введите пароль`}
                                        type="text"/>
                                </div>
                                <div className={`col-12 mt-4`}>
                                <motion.input
                                    variants={rightIn}
                                    custom={6}
                                    initial={`initial`}
                                    animate={`animate`}
                                    className={`form-control`}
                                    placeholder={`Введите почту`}
                                    type="text"/>
                            </div>
                                <div className={`col-12 mt-4 d-flex`}>
                                    <motion.button
                                        variants={rightIn}
                                        custom={9}
                                        initial={`initial`}
                                        animate={`animate`}
                                        className={`btn btn-lg flex-grow-1 btn-black rounded`}
                                        type={`submit`}>
                                        Отправить
                                    </motion.button>
                                </div>
                                {/*<div className={`col-12 mt-5`}>*/}
                                {/*    <motion.div*/}
                                {/*        variants={fadeIn}*/}
                                {/*        custom={11}*/}
                                {/*        initial={`initial`}*/}
                                {/*        animate={`animate`}*/}
                                {/*        className={style.registration}>*/}
                                {/*        У вас есть аккаунт?*/}
                                {/*        <span onClick={() => setIsRegistration(false)}>*/}
                                {/*            Войти*/}
                                {/*        </span>*/}
                                {/*    </motion.div>*/}
                                {/*</div>*/}
                            </div>
                        </form>
                    )
                }
                {/*{*/}
                {/*    !isRegistration && (*/}
                {/*        <form className={style.form}>*/}
                {/*            <div className={style.title}>*/}
                {/*                <motion.h2*/}
                {/*                    variants={fadeUp}*/}
                {/*                    custom={3}*/}
                {/*                    initial={`initial`}*/}
                {/*                    animate={`animate`}*/}
                {/*                    className={`mb-3`}>*/}
                {/*                    Добро пожаловать!*/}
                {/*                </motion.h2>*/}
                {/*                <motion.p*/}
                {/*                    variants={fadeUp}*/}
                {/*                    custom={6}*/}
                {/*                    initial={`initial`}*/}
                {/*                    animate={`animate`}>*/}
                {/*                    Lorem ipsum dolor sit amet,*/}
                {/*                    consectetur adipisicing elit.*/}
                {/*                    A expedita illo, illum placeat*/}
                {/*                    temporibus voluptate.*/}
                {/*                </motion.p>*/}
                {/*            </div>*/}
                {/*            <div className={`row`}>*/}
                {/*                <div className={`col-12`}>*/}
                {/*                    <motion.input*/}
                {/*                        variants={rightIn}*/}
                {/*                        custom={3}*/}
                {/*                        initial={`initial`}*/}
                {/*                        animate={`animate`}*/}
                {/*                        className={`form-control`}*/}
                {/*                        placeholder={`Введите логин`}*/}
                {/*                        type="text"/>*/}
                {/*                </div>*/}
                {/*                <div className={`col-12 mt-4`}>*/}
                {/*                    <motion.input*/}
                {/*                        variants={rightIn}*/}
                {/*                        custom={6}*/}
                {/*                        initial={`initial`}*/}
                {/*                        animate={`animate`}*/}
                {/*                        className={`form-control`}*/}
                {/*                        placeholder={`Введите пароль`}*/}
                {/*                        type="text"/>*/}
                {/*                </div>*/}
                {/*                <div className={`col-12 mt-4 d-flex`}>*/}
                {/*                    <motion.button*/}
                {/*                        variants={rightIn}*/}
                {/*                        custom={9}*/}
                {/*                        initial={`initial`}*/}
                {/*                        animate={`animate`}*/}
                {/*                        className={`btn btn-lg flex-grow-1 btn-black rounded`}*/}
                {/*                        type={`submit`}>*/}
                {/*                        Отправить*/}
                {/*                    </motion.button>*/}
                {/*                </div>*/}
                {/*                <div className={`col-12 mt-5`}>*/}
                {/*                    <motion.div*/}
                {/*                        variants={fadeIn}*/}
                {/*                        custom={11}*/}
                {/*                        initial={`initial`}*/}
                {/*                        animate={`animate`}*/}
                {/*                        className={style.registration}>*/}
                {/*                        Вы здесь впервые?*/}
                {/*                        <span onClick={() => setIsRegistration(true)}>*/}
                {/*                             Регистрация*/}
                {/*                        </span>*/}
                {/*                    </motion.div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </form>*/}
                {/*    )*/}
                {/*}*/}
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