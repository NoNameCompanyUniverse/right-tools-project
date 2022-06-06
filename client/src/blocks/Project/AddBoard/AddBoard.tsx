import React, {FormEvent, useEffect, useState} from 'react';
import Modal from '../../../components/Modal';
import {IModal} from "../../../types/IModal";
import FormFile from "../../../components/Form/FormFile";

type IData = {
    name: string
}

interface IAddBoard {
    onProject: (action: {type: "KANBAN" | "MINDMAP", payload: IData}) => void,
    modal: IModal,
    setModal: (id: string) => void,
    type: "KANBAN" | "MINDMAP"
}



const AddBoard:React.FC<IAddBoard> = (
    {
        modal,
        onProject,
        setModal,
        type
    }) => {

    const {id, isOpen} = modal;

    const [state, setState] = useState({
        banner: '',
        name: ''
    });

    const handleOnModal = (id: string) => setModal(id);

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        setModal(id)
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
        !isOpen ? setState({banner: '', name: ''}) : '';
    }, [isOpen])

    return (
        <Modal modal={modal} onClose={handleOnModal} title={['Cоздать', `${type === 'KANBAN' ? 'Канбан доску' : 'Mind map'}`].join(" ")}>
            <form onSubmit={handleOnSubmit}>
                <div className="row">
                    <div className="col-12">
                        <FormFile
                            onFile={handleOnFile}
                            value={state.banner}
                            name={'BANNER'}/>
                    </div>
                    <div className="col-12 mt-3">
                        <input
                            type="text"
                            onChange={event => handleSetValue(event.target.value, event.target.name)}
                            name={'name'}
                            value={state.name}
                            placeholder={'Введите название'}
                            className='form-control'/>
                    </div>
                    <div className="col-12 mt-5">
                        <div className="d-flex justify-content-end">
                            <button type={'submit'} className={'btn btn-wood'}>
                                Создать
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default AddBoard;