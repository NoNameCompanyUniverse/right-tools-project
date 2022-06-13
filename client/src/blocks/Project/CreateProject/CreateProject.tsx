import React, {useState} from 'react';
import style from "../../../containers/Projects/index.module.scss";
import {FolderAddIcon} from "@heroicons/react/outline";
import {motion} from "framer-motion";
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";
import FormInput from "../../../components/Form/FormInput/FormInput";
import FormFile from "../../../components/Form/FormFile";

const CreateProject = () => {

    const [modal, setModal] = useState<IModal>({id: '1', isOpen: false});

    const [state, setState] = useState({
        name: '',
        description: '',
        picture: '',
        participant: []
    })

    const handleOnModal = (id: string) => {
        setModal({id: id, isOpen: !modal.isOpen})
    }

    const handleSetValue = (value: string, name: string) => setState(state => ({...state, [name]: value}));

    const handleOnFile = (data: any, name: string) => {

    }



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
            <Modal modal={modal} onClose={handleOnModal} title={'Создать проект'}>
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
                        <div className="col-12 mt-3">
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
        </>
    );
};

export default CreateProject;