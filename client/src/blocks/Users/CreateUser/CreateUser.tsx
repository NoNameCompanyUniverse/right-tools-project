import React, {FormEvent, useEffect, useState} from 'react';
import {IModal} from "../../../types/IModal";
import style from "../../../styles/project/index.module.scss";
import {FolderAddIcon} from "@heroicons/react/outline";
import {motion} from "framer-motion";
import Modal from "../../../components/Modal";
import FormInput from "../../../components/Form/FormInput/FormInput";
import FormTextarea from "../../../components/Form/FormTextarea/FormTextarea";
import {data} from "dom7";


const CreateUser: React.FC<{ onSubmit: (data: any) => void }> = ({onSubmit}) => {

    const [modal, setModal] = useState<IModal>({id: '#modal', isOpen: false});

    const [state, setState] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        description: '',
        date_birth: '',
        subdivision: 1
    })

    const handleSetValue = (value: string, name: string) => {
        setState(state => ({...state, [name]: value}))
    };

    const handleOnModal = (id: string) => {
        setModal({id, isOpen: !modal.isOpen})
    }

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(state);
        //handleOnModal(modal.id)
    }

    useEffect(() => {
        !modal.isOpen ? setState({
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            phone: '',
            email: '',
            description: '',
            date_birth: '',
            subdivision: 1
        }) : '';
    }, [modal])

    return (
        <>
            <motion.div
                onClick={() => handleOnModal(modal.id)}
                whileHover={{scale: 1.05}}
                whileTap={{scale: .95}}
                className={[style.create, 'd-flex', 'align-items-center', 'justify-content-center'].join(" ")}>
                <i className={'icon icon-lg'}>
                    <FolderAddIcon/>
                </i>
            </motion.div>
            <Modal modal={modal} onClose={handleOnModal} title={'Создать пользователя'}>
                <form onSubmit={handleOnSubmit}>
                    <div className="row">
                        <div className="col-6 mb-3">
                            <FormInput
                                placeholder={'Введите логин'}
                                name={'username'}
                                value={state.username}
                                setValue={handleSetValue}
                                type={'text'}/>
                        </div>
                        <div className="col-6 mb-3">
                            <FormInput
                                placeholder={'Введите пароль'}
                                name={'password'}
                                value={state.password}
                                setValue={handleSetValue}
                                type={'text'}/>
                        </div>

                        <div className="col-6 mb-3">
                            <FormInput
                                placeholder={'Введите имя'}
                                name={'last_name'}
                                value={state.last_name}
                                setValue={handleSetValue}
                                type={'text'}/>
                        </div>
                        <div className="col-6 mb-3">
                            <FormInput
                                placeholder={'Введите фамилию'}
                                name={'first_name'}
                                value={state.first_name}
                                setValue={handleSetValue}
                                type={'text'}/>
                        </div>
                        <div className="col-6 mb-3">
                            <FormInput
                                placeholder={'Введите телефон'}
                                name={'phone'}
                                value={state.phone}
                                setValue={handleSetValue}
                                type={'text'}/>
                        </div>
                        <div className="col-12 mb-3">
                            <FormInput
                                placeholder={'Введите email'}
                                name={'email'}
                                value={state.email}
                                setValue={handleSetValue}
                                type={'email'}/>
                        </div>
                        <div className="col-6 mb-3">
                            <FormInput
                                placeholder={'Введите дату рождения'}
                                name={'date_birth'}
                                value={state.date_birth}
                                setValue={handleSetValue}
                                type={'date'}/>
                        </div>
                        <div className="col-12 mb-4">
                            <FormTextarea
                                value={state.description}
                                setValue={handleSetValue}
                                name={'description'}
                                placeholder={'Введите описание'}
                                maxLength={150}
                                rows={5}/>
                        </div>
                        <div className="col-12 mt-4">
                            <div className="d-flex justify-content-end">
                                <button
                                    type={`submit`}
                                    className="btn btn-green">
                                    Создать пользователя
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CreateUser;