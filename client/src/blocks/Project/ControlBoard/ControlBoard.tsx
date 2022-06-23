import React, {FormEvent, useEffect, useState} from 'react';
import Modal from '../../../components/Modal';
import {IModal} from "../../../types/IModal";
import FormFile from "../../../components/Form/FormFile";
import {IMindMap} from "../../../types/old/IMindMap";
import {IKanBan} from "../../../types/old/IKanBan";
import {IFile} from "../../../types/old/IFile";
import {IUser} from "../../../types/old/IUser";
import {genId} from "../../../helpers/functions";
import columns from '../../../../data-board-kanban.json'
import FormTextarea from "../../../components/Form/FormTextarea/FormTextarea";
import FormInput from "../../../components/Form/FormInput/FormInput";
import {useAppDispatch} from "../../../redux/hooks";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {postKanBan, postMindMap, putKanBan, putMindMap} from "../../../redux/actions/ProjectsAction";


interface IControlBoard {
    //onProject: (action: {type: "KANBAN" | "MINDMAP", payload: IMindMap | IKanBan | IFile | IUser}) => void,
    modal: IModal,
    setModal: (id: string) => void,
    type: "KANBAN" | "MINDMAP",
    status: 'CREATE' | 'UPDATE',
    data?: { id: number, name: string, description: string } | null
}


const ControlBoard: React.FC<IControlBoard> = (
    {
        modal,
        status,
        //onProject,
        setModal,
        data = null,
        type
    }) => {

    const {id, isOpen} = modal;

    const [state, setState] = useState({
        description: '',
        name: ''
    });

    const router = useRouter();
    const {data: session} = useSession()
    const dispatch = useAppDispatch()

    const handleOnModal = (id: string) => setModal(id);

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        const idP = router.query.id;
        //@ts-ignore
        const token: string = session?.accessToken;
        switch (type) {
            case "MINDMAP": {
                const newEl = {
                    name: state.name,
                    description: state.description,
                }

                status === 'CREATE' // @ts-ignore
                    ? dispatch(postMindMap({token, id: idP, data: newEl}))
                    : dispatch(putMindMap({token, id: data ? data.id : 0, data: state}))
                break;
            }
            case 'KANBAN' : {
                const newEl = {
                    name: state.name,
                    description: state.description,
                }
                status === 'CREATE' // @ts-ignore
                    ? dispatch(postKanBan({token, id: idP, data: newEl}))
                    : dispatch(putKanBan({token, id: data ? data.id : 0, data: state}))
                break;
            }
            default : {
                break;
            }
        }
        setModal(id);
    }

    const handleSetValue = (value: string, name: string) => {
        setState((state: any) => ({
            ...state,
            [name]: value
        }))
    }

    useEffect(() => {
        !isOpen
            ? setState({name: '', description: ''})
            : data
                ? setState({name: data.name, description: data.description})
                : '';
    }, [isOpen]);


    return (
        <Modal modal={modal} onClose={handleOnModal}
               title={[status === 'CREATE' ? 'Cоздать' : 'Изменить', `${type === 'KANBAN' ? 'Канбан доску' : 'Mind map'}`].join(" ")}>
            <form onSubmit={handleOnSubmit}>
                <div className="row">
                    <div className="col-12 mt-3">
                        <FormInput
                            name={'name'}
                            placeholder={'Введите название'}
                            value={state.name}
                            setValue={handleSetValue}/>
                    </div>
                    <div className="col-12 mt-3">
                        <FormTextarea
                            maxLength={200}
                            value={state.description}
                            setValue={handleSetValue}
                            placeholder={'Введите описание'}
                            name={'description'}/>
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
        </Modal>
    );
};

export default ControlBoard;