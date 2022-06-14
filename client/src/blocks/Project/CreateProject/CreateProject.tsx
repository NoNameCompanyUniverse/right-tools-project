import React, {useState} from 'react';
import style from '../../../styles/project/index.module.scss';
import {FolderAddIcon, PlusSmIcon} from "@heroicons/react/outline";
import {motion} from "framer-motion";
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";
import FormInput from "../../../components/Form/FormInput/FormInput";
import FormFile from "../../../components/Form/FormFile";
import AddUser from "../AddUser";
import users_data from '../../../../data-users.json';
import {XIcon} from "@heroicons/react/outline";

const CreateProject = () => {

    const [modal, setModal] = useState<IModal []>([
        {id: '1', isOpen: false},
        {id: '2', isOpen: false},
    ]);

    const [state, setState] = useState({
        name: '',
        description: '',
        picture: '',
        participant: [  ]
    })

    const handleOnModal = (id: string) => {
        let clone = modal.concat();
        clone = clone.map((e: IModal) => (
            e.id === id ? {id: e.id, isOpen: !e.isOpen} : e
        ))
        setModal(clone)
    }

    const handleSetValue = (value: string, name: string) => setState(state => ({...state, [name]: value}));

    const handleOnFile = (data: any, name: string) => {

    }

    const handleAddUser = (data:Array<number>) => {
        setState((state:any) => ({
            ...state,
            participant: data
        }))
    }

    const handleDeleteUser = (id: number) => {
        setState((state:any) => ({
            ...state,
            participant: state.participant.filter((p: number) => p !== id)
        }))
    }


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
            <Modal modal={modal[0]} onClose={handleOnModal} title={'Создать проект'}>
                <form>
                    <div className={'row'}>
                        <div className="col-12">
                            <FormFile value={state.picture} name={'picture'} onFile={handleOnFile}/>
                        </div>
                        <div className="col-12 mt-3">
                            <FormInput
                                name={'name'}
                                type={'text'}
                                value={state.name}
                                placeholder={'Введите название'}
                                setValue={handleSetValue}
                            />
                        </div>
                        <div className="col-12 mt-4">
                            <div className={style.team}>
                                {state.participant.length > 3 && (<div className={style.count}>
                                    {`+${users_data.length - 3}`}
                                </div>)}
                                {
                                    users_data.filter(u => state.participant.some(p => u.id === p))
                                        .map((item: { avatar: string, id: number }, index) => {
                                            if (index < 3) {
                                                return (
                                                    <>
                                                        <div className={style.avatar}>
                                                            <button
                                                                onClick={() => handleDeleteUser(item.id)}
                                                                className={style.delete}
                                                                type={'button'}>
                                                                <XIcon/>
                                                            </button>

                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img src={item.avatar} alt=""/>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        })}
                                <div className={style.addUser} onClick={() => handleOnModal(modal[1].id)}>
                                    <PlusSmIcon/>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-4">
                            <textarea
                                rows={5}
                                placeholder={`Введите описание`}
                                className="form-control"
                                onChange={event => handleSetValue(event.target.value, event.target.name)}
                                name="description"
                                value={state.description}
                            />
                        </div>
                        <div className="col-12 mt-4">
                            <div className="d-flex justify-content-end">
                                <button
                                    type={`submit`}
                                    className="btn btn-green">
                                    Создать проект
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
            <AddUser onUsers={handleAddUser} modal={modal[1]} onModal={handleOnModal} participant={state.participant}/>
        </>
    );
};

export default CreateProject;