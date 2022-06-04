import React, {FormEvent, useEffect, useState} from 'react';
import {IModal} from "../../../types/IModal";
import Modal from "../../../components/Modal";
import {Node} from "react-flow-renderer";
import {motion} from "framer-motion";
import {fadeScroll} from "../../../motion";

interface IControlNode {
    data: Node | null,
    onNode: (action: { type: "EDIT" | "DELETE", payload: Node }) => void
}


const ControlNode: React.FC<IControlNode> = ({data, onNode}) => {

    const [state, setState] = useState<Node | null>(null);
    const [modal, setModal] = useState<IModal>({id: '#controlNode', isOpen: false});
    const [valid, setValid] = useState(false);

    const [status, setStatus] = useState<boolean>(false)

    const handleOnModal = (id: string) => {
        setModal({id: id, isOpen: !modal.isOpen})
    }

    // @ts-ignore
    const handleSetValue = (value: string, name: string) => {
        setState((state: any) => ({
            ...state,
            data: {
                ...state.data,
                [name]: value
            }
        }))
    };

    const handleOnDelete = () => {
        state ? onNode({type: "DELETE", payload: state}) : '';
        handleOnModal(modal.id);
    }

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        state ? onNode({type: "EDIT", payload: state}) : '';
        handleOnModal(modal.id);
    }

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
        let formValid: boolean = state !== null ? state.data.label !== '' : false;
        setValid(formValid)
    }, [state])

    const types: Array<{ option: string, label: string }> = [
        {option: 'source', label: 'Начало'},
        {option: 'default', label: 'Промежуток'},
        {option: 'target', label: 'Конец'}
    ];

    return (
        <Modal modal={modal} onClose={handleOnModal} title={status ? "Изменить" : "Описание"}>
            {
                (state && data) && (
                    <>
                        <form onSubmit={event => handleOnSubmit(event)}>
                            <motion.div className="row">
                                <div className={['col-12', 'mb-4'].join(" ")}>
                                    <button type={'button'} onClick={() => setStatus(!status)}
                                            className={['btn', 'btn-info', 'btn-sm'].join(" ")}>
                                        {status ? "Просмотр" : "Изменить"}
                                    </button>
                                </div>
                                <div className={['col-12'].join(" ")}>
                                    <span className={['d-block', 'fs-6', 'mb-2', 'fw-bold'].join(" ")}>
                                        Название
                                    </span>
                                    {
                                        !status ? (
                                            <motion.div
                                                variants={fadeScroll}
                                                animate={'animate'}
                                                initial={'initial'}
                                                exit={'exit'}
                                                transition={{duration: 0.15}}
                                                className={['fs-4'].join("")}>
                                                {data.data.label}
                                            </motion.div>
                                        ) : (
                                            <motion.input
                                                variants={fadeScroll}
                                                animate={'animate'}
                                                initial={'initial'}
                                                exit={'exit'}
                                                transition={{duration: 0.15}}
                                                type="text"
                                                onChange={event => handleSetValue(event.target.value, event.target.name)}
                                                value={state.data.label}
                                                name={'label'}
                                                placeholder={`Введите название`}
                                                className={['form-control'].join("")}/>
                                        )
                                    }
                                </div>
                                <div className={['col-12', 'mt-4'].join(" ")}>
                                    <span className={['d-block', 'fs-6', 'mb-2', 'fw-bold'].join(" ")}>
                                        Тип карточки
                                    </span>
                                    {
                                        !status ? (
                                            <motion.div
                                                variants={fadeScroll}
                                                animate={'animate'}
                                                initial={'initial'}
                                                exit={'exit'}
                                                transition={{duration: 0.15}}
                                                className={['badge', 'md', `${
                                                    data.data.type === "target"
                                                        ? "green"
                                                        : data.data.type === "source"
                                                            ? "wood"
                                                            : "dark"}`].join(" ")}>
                                                {
                                                    data.data.type === "target"
                                                        ? "Финал"
                                                        : data.data.type === "source"
                                                            ? "Источник"
                                                            : "Промежуточный"
                                                }
                                            </motion.div>
                                        ) : (
                                            <motion.select
                                                variants={fadeScroll}
                                                animate={'animate'}
                                                initial={'initial'}
                                                exit={'exit'}
                                                transition={{duration: 0.15}}
                                                className={'form-select'}
                                                onChange={event => handleSetValue(event.target.value, event.target.name)}
                                                name="type"
                                                value={state.data.type}
                                            >
                                                {types.map((item: { option: string, label: string }, index: number) => (
                                                    <option key={index} value={item.option}>{item.label}</option>
                                                ))}
                                            </motion.select>
                                        )
                                    }
                                </div>
                                <div className={['col-12', 'mt-4'].join(" ")}>
                                     <span className={['d-block', 'fs-6', 'mb-2', 'fw-bold'].join(" ")}>
                                        Описание карточки
                                    </span>
                                    {
                                        !status ? (
                                            <motion.div
                                                variants={fadeScroll}
                                                animate={'animate'}
                                                initial={'initial'}
                                                exit={'exit'}
                                                transition={{duration: 0.15}}
                                                className={['fs-6'].join(" ")}>
                                                {
                                                    (data.data.description.length) <= 0
                                                        ? "Описание отсутствует"
                                                        : data.data.description
                                                }
                                            </motion.div>
                                        ) : (
                                            <motion.textarea
                                                variants={fadeScroll}
                                                animate={'animate'}
                                                initial={'initial'}
                                                exit={'exit'}
                                                transition={{duration: 0.15}}
                                                rows={5}
                                                placeholder={`Введите описание`}
                                                className="form-control"
                                                onChange={event => handleSetValue(event.target.value, event.target.name)}
                                                name="description"
                                                value={state.data.description}
                                            />
                                        )
                                    }
                                </div>
                                {
                                    status && (
                                        <motion.div
                                            variants={fadeScroll}
                                            animate={'animate'}
                                            initial={'initial'}
                                            exit={'exit'}
                                            transition={{duration: 0.15}} className={['col-12', 'mt-5'].join(" ")}>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    onClick={() => handleOnDelete()}
                                                    type={'button'}
                                                    className={["btn-danger", "btn", "me-2"].join(" ")}>
                                                    Удалить
                                                </button>
                                                <button disabled={!valid} type={'submit'} className={["btn-green", "btn"].join(" ")}>
                                                    Отправить
                                                </button>
                                            </div>
                                        </motion.div>
                                    )
                                }
                            </motion.div>
                        </form>
                    </>
                )
            }
        </Modal>
    );
};

export default ControlNode;