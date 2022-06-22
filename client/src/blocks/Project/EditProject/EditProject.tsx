import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import FormFile from "../../../components/Form/FormFile";
import FormInput from "../../../components/Form/FormInput/FormInput";
import FormTextarea from "../../../components/Form/FormTextarea";
import {putProject} from "../../../redux/actions/ProjectsAction";

interface IControlProject {
    modal: IModal,
    setModal: (id:string) => void
}

const EditProject:React.FC<IControlProject> = ({modal, setModal}) => {

    const {id, isOpen} = modal;

    const [state, setState] = useState<{name: string, description: string, picture: any | null} | null>(null);
    const [picture, setPicture] = useState<any | null>(null)
    const {project} = useAppSelector(state => state.projectSlice);
    const router = useRouter();
    const {data: session} = useSession()
    const dispatch = useAppDispatch();

    const handleOnModal = (id: string) => setModal(id);

    const handleOnFile = (data: any, name: string) => {
        setPicture(data.file)
    }

    const handleSetValue = (value: string, name: string) => {
        setState((state:any) => ({
            ...state,
            [name]: value
        }))
    }

    const handleOnSubmit = (e:FormEvent) => {
        e.preventDefault();
        //@ts-ignore
        const token: string = session?.accessToken;
        // @ts-ignore
        dispatch(putProject({token, id: router.query.id, data: state, picture}))
        setModal(id);
    }

    useEffect(() => {
        if(modal.isOpen && project.info) {
            setState({
                name: project.info.name,
                description: project.info.description,
                picture: project.info.picture
            })
        }
    }, [modal])

    return (
        <Modal modal={modal} onClose={handleOnModal} title={'Изменить'}>
            {
                state && (
                    <form onSubmit={handleOnSubmit}>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <FormFile
                                    onFile={handleOnFile}
                                    value={state.picture ? state.picture : ''}
                                    name={'picture'}/>
                            </div>
                            <div className="col-12 mb-3">
                                <div className="f-7 mb-2 fw-bold">Телефон</div>
                                <FormInput
                                    name={'name'}
                                    type={'text'}
                                    value={state.name}
                                    setValue={handleSetValue}
                                    placeholder={'Введите название'}
                                />
                            </div>
                            <div className="col-12">
                                <div className="f-7 mb-2 fw-bold">Описание</div>
                                <FormTextarea
                                    placeholder={'Введите описание'}
                                    value={state.description}
                                    rows={5}
                                    name={'description'}
                                    setValue={handleSetValue}/>
                            </div>
                            <div className="col-12 mt-5">
                                <div className="d-flex justify-content-end">
                                    <button type={'submit'} className={'btn btn-wood'}>
                                        Сохранить
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

export default EditProject;