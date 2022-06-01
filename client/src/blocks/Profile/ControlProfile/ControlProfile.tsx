import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";
import {IUser} from "../../../types/IUser";
import FormFile from "../../../components/Form/FormFile";
import {motion} from "framer-motion";
import {genId} from "../../../helpers/functions";
import {XIcon} from "@heroicons/react/outline";

interface IControlProfile {
    data: IUser | null,
    onProfile: (data: IUser) => void,
    modal: IModal,
    setModal: () => void
}

const ControlProfile: React.FC<IControlProfile> = (
    {data, onProfile, modal, setModal}) => {


    const [state, setState] = useState<IUser | null>(null);
    const [tag, setTag] = useState('')

    const handleOnModal = (id: string) => setModal();

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        state && onProfile(state as IUser);
        setModal();
    }

    const handleAddTag = () => {
        setState((state: any) => ({
            ...state,
            tags: [...state.tags, {value: tag, id: genId()}]
        }))
        setTag('')
    }

    const handleDeleteTag = (id: number) => {
        setState((state: any) => ({
            ...state,
            tags: state.tags.filter((tag: { id: number, value: string }) => tag.id !== id)
        }))
    }

    const handleOnFile = (data: any, name: string) => {

    }

    const handleSetValue = (value: string, name: string) => {
        setState((state:any) => ({
            ...state,
            [name]: value
        }))
    }

    useEffect(() => {
        if(modal.isOpen) {
            setState(data);
        }
    }, [modal])


    return (
        <Modal modal={modal} onClose={handleOnModal} title={"Изменить"}>
            {
                state && (
                    <form onSubmit={event => handleOnSubmit(event)}>
                        <div className="row gx-3">
                            <div className="col-12">
                                <FormFile
                                    onFile={handleOnFile}
                                    value={state.banner}
                                    name={'BANNER'}/>
                            </div>
                            <div className={['col-12', 'mx-4', 'mb-3'].join(" ")} style={{"marginTop": "-3rem"}}>
                                <FormFile
                                    rounded={true}
                                    value={state.avatar}
                                    name={'AVATAR'}
                                    onFile={handleOnFile}/>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="f-7 mb-2 fw-bold">Фамилия</div>
                                <input
                                    type="text"
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    name={'lastname'}
                                    value={state.lastname}
                                    placeholder={'Введите фамилия'}
                                    className='form-control'/>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="f-7 mb-2 fw-bold">Имя</div>
                                <input
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    type="text"
                                    name={'firstname'}
                                    placeholder={'Введите имя'}
                                    value={state.firstname}
                                    className='form-control'/>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="f-7 mb-2 fw-bold">Статус</div>
                                <input
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    type="text"
                                    name={'status'}
                                    placeholder={'Введите статус'}
                                    value={state.status}
                                    className='form-control'/>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="f-7 mb-2 fw-bold">Телефон</div>
                                <input
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    type="text"
                                    name={'tel'}
                                    placeholder={'Введите телефон'}
                                    value={state.tel}
                                    className='form-control'/>
                            </div>
                            <div className="col-6 mb-3">
                                <div className="f-7 mb-2 fw-bold">Email</div>
                                <input
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    type="text"
                                    name={'email'}
                                    placeholder={'Введите почту'}
                                    value={state.email}
                                    className='form-control'/>
                            </div>
                            <div className="col-12">
                                <div className="f-7 mb-2 fw-bold">Ваши способности</div>
                                <div className="d-flex" style={{'overflow': 'auto auto'}}>
                                    {
                                        state.tags.map((tag: { id: number, value: string }) => (
                                            <motion.div
                                                whileHover={{x: 2}}
                                                key={tag.id}
                                                className='tag'>
                                                <div className={'d-flex align-items-center'}>
                                                    <span>{tag.value}</span>
                                                    <button onClick={() => handleDeleteTag(tag.id)} type={'button'} className={'ms-1 btn'}>
                                                        <XIcon/>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    }
                                </div>
                                <div className="d-flex mt-2 align-items-stretch">
                                    <input
                                        type="text"
                                        name={'email'}
                                        onChange={event => setTag(event.target.value)}
                                        value={tag}
                                        placeholder={'Введите навык'}
                                        className='form-control'/>
                                    <button
                                        disabled={tag.length <= 0}
                                        onClick={() => handleAddTag()}
                                        type={'button'}
                                        className="btn ms-2 btn-green">
                                        Добавить
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 mt-5">
                                <div className="d-flex justify-content-end">
                                    <button type={'submit'} className={'btn btn-wood'}>
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )
            }
        </Modal>
    );
};

export default ControlProfile;