import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";
import {IUser} from "../../../types/IUser";
import FormFile from "../../../components/Form/FormFile";
import {motion} from "framer-motion";
import {genId} from "../../../helpers/functions";
import {XIcon} from "@heroicons/react/outline";
import FormInput from "../../../components/Form/FormInput/FormInput";

interface IControlProfile {
    data: IUser | null,
    onProfile: (data: IUser) => void,
    modal: IModal,
    setModal: (id:string) => void
}

const ControlProfile: React.FC<IControlProfile> = (
    {data, onProfile, modal, setModal}) => {

    const {id, isOpen} = modal;

    const [state, setState] = useState<IUser | null>(null);
    const [tag, setTag] = useState('')

    const handleOnModal = (id: string) => setModal(id);

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        state && onProfile(state as IUser);
        setModal(id);
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
                                    name={'banner'}/>
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
                                <FormInput
                                    name={'lastname'}
                                    type={'text'}
                                    value={state.lastname}
                                    setValue={handleSetValue}
                                    placeholder={'Введите фамилия'}
                                />
                            </div>
                            <div className="col-6 mb-3">
                                <div className="f-7 mb-2 fw-bold">Имя</div>
                                <FormInput
                                    name={'firstname'}
                                    type={'text'}
                                    value={state.firstname}
                                    setValue={handleSetValue}
                                    placeholder={'Введите фамилия'}
                                />
                            </div>
                            <div className="col-12 mb-3">
                                <div className="f-7 mb-2 fw-bold">Статус</div>
                                <FormInput
                                    name={'status'}
                                    type={'text'}
                                    value={state.status}
                                    setValue={handleSetValue}
                                    placeholder={'Введите имя'}
                                />
                            </div>
                            <div className="col-6 mb-4">
                                <div className="f-7 mb-2 fw-bold">Телефон</div>
                                <FormInput
                                    name={'tel'}
                                    type={'tel'}
                                    value={state.tel}
                                    setValue={handleSetValue}
                                    placeholder={'Введите фамилия'}
                                />
                            </div>
                            <div className="col-6 mb-4">
                                <div className="f-7 mb-2 fw-bold">Email</div>
                                <FormInput
                                    name={'email'}
                                    placeholder={'Введите почту'}
                                    type={'email'}
                                    value={state.email}
                                    setValue={handleSetValue}
                                />
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