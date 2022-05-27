import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";
import {INewDrag} from "../../../types/IDrag";
import Tabs from "../../../components/Tabs";

import style from './../../../components/KanBan/DragItem/index.module.scss'

interface IControlDrag {
    data: INewDrag | null,
}

const ControlDrag:React.FC<IControlDrag> = ({data}) => {


    const [drag, setDrag] = useState<INewDrag | null>(null);
    const [modal, setModal] = useState<IModal>({id: '#controlDrag', isOpen: false});

    const handleOnModal = (id: string) => {
        setModal({id: id, isOpen: !modal.isOpen})
    }

    const handleOnSubmit = (event:FormEvent) => {
        event.preventDefault();
    }

    const types: Array<{ option: string, label: string }> = [
        {option: '0', label: 'Низкий приоритет'},
        {option: '1', label: 'Средний приоритет'},
        {option: '2', label: 'Высокий приоритет'}
    ];

    // @ts-ignore
    const handleSetValue = (value: string, name: string) => setDrag(state => ({...state, [name]: value}));

    useEffect(() => {
        if(!modal.isOpen) {
            setDrag(null);
        }
    }, [modal])

    useEffect(() => {

        //console.log(data)
        if (data) {
            setModal({id: modal.id, isOpen: true});
            setDrag(data)
        }
    }, [data])

    return (
        <>
            <Modal modal={modal} onClose={handleOnModal} title={'Карточка'}>
                {
                    drag && (
                        <>
                                <Tabs tabs={['Просмотр', 'Редактировать']}>
                                    <>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className={`${style.title} fs-4`}>{drag.title}</div>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <div
                                                    className={`${style.tag} fs-6 ${drag.priority === 0 ? style.low : drag.priority === 1 ? style.medium : style.high}`}>
                                                    {drag.priority === 0 ? "Низкий приоритет" : drag.priority === 1 ? "Средний приоритет" : "Высокий приоритет"}
                                                </div>
                                            </div>
                                            <div className="col-12 mt-4">
                                                <div className={`${style.description} fs-6`}>{drag.description}</div>
                                            </div>
                                        </div>
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
                                                            type={`button`}
                                                            className="btn btn-danger me-3">
                                                            Удалить карточку
                                                        </button>
                                                        <button
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