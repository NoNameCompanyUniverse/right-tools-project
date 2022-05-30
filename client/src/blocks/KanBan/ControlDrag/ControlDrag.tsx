import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";
import {IDrag, INewDrag} from "../../../types/IDrag";
import Tabs from "../../../components/Tabs";

import style from './../../../components/KanBan/DragItem/index.module.scss'

interface IControlDrag {
    data: IDrag | null,
    onDrag: (action: { type: "EDIT" | "DELETE", payload: IDrag }) => void
}

const ControlDrag: React.FC<IControlDrag> = ({data, onDrag}) => {


    const [state, setState] = useState<IDrag | null>(null);
    const [modal, setModal] = useState<IModal>({id: '#controlDrag', isOpen: false});
    const [valid, setValid] = useState(false);
    const [status, setStatus] = useState<boolean>(false)

    const handleOnModal = (id: string) => {
        setModal({id: id, isOpen: !modal.isOpen})
    }

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        state ? onDrag({type: "EDIT", payload: {...state, priority: +state.priority}}) : '';
        handleOnModal(modal.id);
    }

    const handleOnDelete = () => {
        state ? onDrag({type: "DELETE", payload: state}) : '';
        handleOnModal(modal.id);
    }

    const types: Array<{ option: string, label: string }> = [
        {option: '0', label: 'Низкий приоритет'},
        {option: '1', label: 'Средний приоритет'},
        {option: '2', label: 'Высокий приоритет'}
    ];

    // @ts-ignore
    const handleSetValue = (value: string, name: string) => setState(state => ({...state, [name]: value}));

    useEffect(() => {
        if (!modal.isOpen) {
            setState(null);
            setStatus(false)
        }
    }, [modal])

    useEffect(() => {
        if (data) {
            setModal({id: modal.id, isOpen: true});
            setState(data)
        }
    }, [data]);

    useEffect(() => {
        let formValid: boolean = state !== null ? state.title !== '' && state.description !== '' : false;
        setValid(formValid)
    }, [state])

    return (
        <>
            <Modal modal={modal} onClose={handleOnModal} title={'Карточка'}>
                {
                    state && (
                        <>
                            <Tabs tabs={['Просмотр', 'Редактировать']}>
                                <>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className={`${style.title} fs-4`}>{state.title}</div>
                                        </div>
                                        <div className="col-12 mt-3">
                                            <div
                                                className={`${style.tag} fs-6 ${state.priority === 0 ? style.low : state.priority === 1 ? style.medium : style.high}`}>
                                                {state.priority === 0 ? "Низкий приоритет" : state.priority === 1 ? "Средний приоритет" : "Высокий приоритет"}
                                            </div>
                                        </div>
                                        <div className="col-12 mt-4">
                                            <div className={`${style.description} fs-6`}>{state.description}</div>
                                        </div>
                                    </div>
                                    <form onSubmit={event => handleOnSubmit(event)}>
                                        <div className="row">
                                            <div className="col-12">
                                                <input
                                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                                    value={state.title}
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
                                                    value={state.priority}
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
                                                        value={state.description}
                                                    />
                                            </div>
                                            <div className="col-12 mt-4">
                                                <div className="d-flex justify-content-end">
                                                    <button
                                                        onClick={() => handleOnDelete()}
                                                        type={`button`}
                                                        className="btn btn-danger me-3">
                                                        Удалить карточку
                                                    </button>
                                                    <button
                                                        disabled={!valid}
                                                        type={`submit`}
                                                        className="btn btn-green">
                                                        Сохранить изменения
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </>
                            </Tabs>
                        </>
                    )
                }
            </Modal>
        </>
    );
};

export default ControlDrag;