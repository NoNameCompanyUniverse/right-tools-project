import React, {FormEvent, useState} from 'react';
import style from "../../../styles/auth/index.module.scss";
import {motion} from "framer-motion";
import {fadeUp, rightIn} from "../../../motion";
import FormInput from "../../../components/Form/FormInput/FormInput";


const SignIn: React.FC<{ onSubmit: (data: {username: string, password: string}) => void }> = (
    {
        children,
        onSubmit
    }) => {

    const [state, setState] = useState({username: '', password: ''});

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(state);
    }


    const handleOnChange = (value: string, name: string = '') => {
        setState(state => ({...state, [name]: value}))
    }

    return (
        <form onSubmit={handleOnSubmit} className={style.form}>
            <div className={style.title}>
                <motion.h2
                    variants={fadeUp}
                    custom={3}
                    initial={`initial`}
                    animate={`animate`}
                    className={`mb-3`}>
                    Добро пожаловать!
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
                    <motion.div
                        custom={3}
                        initial={`initial`}
                        animate={`animate`}
                        variants={rightIn}>
                        <FormInput
                            value={state.username}
                            name={'username'}
                            placeholder={`Введите логин`}
                            type={'text'}
                            setValue={handleOnChange}
                        />
                    </motion.div>
                </div>
                <div className={`col-12 mt-4`}>
                    <motion.div
                        variants={rightIn}
                        custom={6}
                        initial={`initial`}
                        animate={`animate`}>
                        <FormInput
                            value={state.password}
                            name={'password'}
                            placeholder={`Введите пароль`}
                            type={'password'}
                            setValue={handleOnChange}
                        />
                    </motion.div>
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
                <div className={`col-12 mt-5`}>
                    {children}
                </div>
            </div>
        </form>
    );
};

export default SignIn;