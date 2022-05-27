import React, {FormEvent, useEffect, useState} from 'react';
import {CollectionIcon} from "@heroicons/react/outline";
import Modal from "../../../components/Modal";
import {genId} from '../../../helpers/functions';
import {IDrag, INewDrag} from '../../../types/IDrag';
import {IModal} from "../../../types/IModal";


interface ICreateDrag {
    onDrag: (action: { type: "CREATE" | "EDIT" | "DELETE", payload: INewDrag }) => void,
}

const CreateDrag: React.FC<ICreateDrag> = ({onDrag}) => {


    const [modal, setModal] = useState<IModal>({id: '1', isOpen: false});

    const [drag, setDrag] = useState<IDrag>({
        title: '',
        priority: '0',
        description: ''
    });


    const types: Array<{ option: string, label: string }> = [
        {option: '0', label: 'Низкий приоритет'},
        {option: '1', label: 'Средний приоритет'},
        {option: '2', label: 'Высокий приоритет'}
    ];

    const handleSetValue = (value: string, name: string) => setDrag(state => ({...state, [name]: value}));

    const handleOnModal = (id: string) => {
        setModal({id: id, isOpen: !modal.isOpen})
    }


    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        const newDrag: INewDrag = {
            id: genId(),
            title: drag.title,
            description: drag.description,
            priority: +drag.priority
        }
        onDrag({type: "CREATE", payload: newDrag});
        handleOnModal(modal.id);
    }
    useEffect(() => {
        if (!modal.isOpen) {
            setDrag({title: '', description: '', priority: '0'});
        }

    }, [modal])


    return (
        <>
            <div className={`mb-3`}>
                <button
                    onClick={() => handleOnModal(modal.id)}
                    className={`btn btn-green d-flex align-items-center`}>
                    <i className="icon me-2">
                        <CollectionIcon/>
                    </i>
                    <span>
                       Добавить карточку
                   </span>
                </button>
            </div>
            <Modal modal={modal} onClose={handleOnModal} title={'Создать карточку'}>
                <>
                    <form onSubmit={event => handleOnSubmit(event)}>
                        <div className="row">
                            <div className="col-12">
                                <input
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    value={drag.title}
                                    name={`title`}
                                    type="text"
                                    placeholder={`Введите название`}
                                    className="form-control"/>
                            </div>
                            <div className="col-12 mt-3">
                                <select
                                    className={'form-select'}
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    name="priority"
                                    value={drag.priority}
                                >
                                    {types.map((item: { option: string, label: string }, index: number) => (
                                        <option key={index} value={item.option}>{item.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 mt-3">
                                <textarea
                                    rows={5}
                                    placeholder={`Введите описание`}
                                    className="form-control"
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    name="description"
                                    value={drag.description}
                                />
                            </div>
                            <div className="col-12 mt-4">
                                <div className="d-flex justify-content-end">
                                    <button
                                        type={`submit`}
                                        className="btn btn-green">
                                        Создать карточку
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </>
            </Modal>
        </>
    );
};

export default CreateDrag;