import React, {FormEvent, useEffect, useState} from 'react';
import {IModal} from "../../../types/IModal";
import style from "../../../styles/project/index.module.scss";
import {FolderAddIcon} from "@heroicons/react/outline";
import {motion} from "framer-motion";
import Modal from "../../../components/Modal";
import FormInput from "../../../components/Form/FormInput/FormInput";
import FormTextarea from "../../../components/Form/FormTextarea/FormTextarea";
import {data} from "dom7";
import ControlSubdivision from "../ControlSubdivision";
import {getSubdivision} from "../../../redux/actions/SubdivisionAction";
import {useSession} from "next-auth/react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";


const CreateUser: React.FC<{ onSubmit: (data: any) => void }> = ({onSubmit}) => {

    const [modal, setModal] = useState<IModal[]>([
        {id: '#modal', isOpen: false},
        {id: '#subdivision', isOpen: false}
    ]);
    const {data: session} = useSession()
    const {subdivision} = useAppSelector(state => state.subdivisionSlice);
    const dispatch = useAppDispatch();


    const [sData, setSData] = useState<{ id: number, name: string }>({id: 1, name: 'Главный Отдел'})
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

    const handleOnSubdivision = (value: number, name: string) => {
        setState(state => ({...state, subdivision: value}));
        setSData({id: value, name: name});
    }

    const handleOnModal = (id: string) => {
        let clone = modal.concat();
        clone = clone.map((e: IModal) => (
            e.id === id ? {id: e.id, isOpen: !e.isOpen} : e
        ))
        setModal(clone)
    }

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(state);
        handleOnModal(modal[0].id)
    }

    useEffect(() => {
        if(!modal[0].isOpen) {
            setState({
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
            setSData({id: 1, name:'Главный отдел'})
        }
    }, [modal])


    useEffect(() => {
        //@ts-ignore
        const token: string = session?.accessToken;
        dispatch(getSubdivision({token}))
    }, [dispatch])


    return (
        <>
            <motion.div
                onClick={() => handleOnModal(modal[0].id)}
                whileHover={{scale: 1.05}}
                whileTap={{scale: .95}}
                className={[style.create, 'd-flex', 'align-items-center', 'justify-content-center'].join(" ")}>
                <i className={'icon icon-lg'}>
                    <FolderAddIcon/>
                </i>
            </motion.div>
            <Modal modal={modal[0]} onClose={handleOnModal} title={'Создать пользователя'}>
                <form onSubmit={handleOnSubmit}>
                    <div className="row gx-2">
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
                        <div className="col-6 mb-3">
                            <FormInput
                                placeholder={'Введите email'}
                                name={'email'}
                                value={state.email}
                                setValue={handleSetValue}
                                type={'email'}/>
                        </div>
                        <div className="col-7 mb-3"
                             onClick={() => handleOnModal(modal[1].id)}>
                            <FormInput
                                setValue={handleSetValue}
                                placeholder={'Выберите отдел'}
                                value={sData.name}
                                readonly={true}/>
                        </div>

                        <div className="col-5 mb-3">
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
            <ControlSubdivision
                onSubdivision={handleOnSubdivision}
                subdivision={state.subdivision}
                subdivisions={subdivision}
                modal={modal[1]}
                onModal={handleOnModal}/>
        </>
    );
};

export default CreateUser;