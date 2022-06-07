import React, {useState} from 'react';
import style from "../../../styles/auth/index.module.scss";
import {motion} from "framer-motion";
import {fadeUp, rightIn} from "../../../motion";
import FormInput from "../../../components/Form/FormInput/FormInput";

const SignUp:React.FC = ({children}) => {

    const [state, setState] = useState({
        username: '',
        password: '',
        email: ''
    })

    const handleOnChange = (value: string, name: string = '') => {
        setState(state => ({...state, [name]: value}))
    }

    return (
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
                    <motion.div
                        variants={rightIn}
                        custom={3}
                        initial={`initial`}
                        animate={`animate`}>
                        <FormInput
                            setValue={handleOnChange}
                            value={state.username}
                            type={'text'}
                            placeholder={`Введите логин`}
                            name={'username'}
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
                            setValue={handleOnChange}
                            value={state.password}
                            type={'text'}
                            placeholder={`Введите пароль`}
                            name={'password'}
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
                            setValue={handleOnChange}
                            value={state.email}
                            type={'email'}
                            placeholder={`Введите email`}
                            name={'email'}
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

export default SignUp;