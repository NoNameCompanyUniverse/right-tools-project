import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";
//import {IDrag, INewDrag} from "../../../types/old/IDrag";
import Tabs from "../../../components/Tabs";

import style from './../../../components/KanBan/DragItem/index.module.scss'
import {IDrag} from '../../../types/IKanBan';
import FormTextarea from "../../../components/Form/FormTextarea/FormTextarea";
import FormInput from "../../../components/Form/FormInput/FormInput";

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
        state ? onDrag({type: "EDIT", payload: {...state, priority: state.priority}}) : '';
        handleOnModal(modal.id);
    }

    const handleOnDelete = () => {
        state ? onDrag({type: "DELETE", payload: state}) : '';
        handleOnModal(modal.id);
    }

    const types: Array<{ option: string, label: string }> = [
        {option: 'L', label: 'Низкий приоритет'},
        {option: 'A', label: 'Средний приоритет'},
        {option: 'H', label: 'Высокий приоритет'}
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
        let formValid: boolean = state !== null ? state.name !== '' && state.description !== '' : false;
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
                                            <div className={`${style.title} fs-4`}>{state.name}</div>
                                        </div>
                                        <div className="col-12 mt-3">
                                            <div
                                                className={`${style.tag} fs-6 ${state.priority === "L" 
                                                    ? style.low 
                                                    : state.priority === 'A' 
                                                        ? style.medium 
                                                        : style.high}`}>
                                                {state.priority === 'L'
                                                    ? "Низкий приоритет"
                                                    : state.priority === 'A'
                                                        ? "Средний приоритет"
                                                        : "Высокий приоритет"}
                                            </div>
                                        </div>
                                        <div className="col-12 mt-4">
                                            <div className={`${style.description} fs-6`}>{state.description}</div>
                                        </div>
                                    </div>
                                    <form onSubmit={event => handleOnSubmit(event)}>
                                        <div className="row">
                                            <div className="col-12">
                                                <FormInput
                                                    name={'name'}
                                                    value={state.name}
                                                    setValue={handleSetValue}
                                                    placeholder={`Введите название`}/>
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
                                                <FormTextarea
                                                    placeholder={`Введите описание`}
                                                    setValue={handleSetValue}
                                                    value={state.description ? state.description : ''}
                                                    name={'description'}
                                                    rows={5}/>
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