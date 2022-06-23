import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {Node} from "react-flow-renderer";
import {genId} from "../../../helpers/functions";
import {INodeData} from "../../../types/INode";



interface ICreateNode {
    onNode: (action: {type: "CREATE" | "EDIT" | "DELETE", payload: Node}) => void
}



const CreateNode:React.FC<ICreateNode> = ({onNode}) => {

    const [modal, setModal] = useState<{ id: string, isOpen: boolean }>({id: '1', isOpen: false});

    const [state, setState] = useState<INodeData>({
        id: '',
        name: '',
        description: '',
        type: 'default'
    })

    const [valid, setValid] = useState<boolean>(false)

    const types: Array<{ option: string, label: string }> = [
        {option: 'source', label: 'Начало'},
        {option: 'default', label: 'Промежуточный'},
        {option: 'target', label: 'Финал'}
    ];

    const handleOnModal = (id: string) => {
        setModal({id: id, isOpen: !modal.isOpen})
    }

    const handleSetValue = (value: string, name: string) => setState(state => ({...state, [name]: value}));

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        const id: string = genId().toString();
        const newNode:Node = {
            id,
            type: 'nodeCard',
            data: {
                id,
                name: state.name,
                description: state.description,
                type: state.type
            },
            position: {
                x: Math.random() * window.innerWidth - 100,
                y: Math.random() * window.innerHeight,
            }
        }
        onNode({type: "CREATE", payload: newNode});
        handleOnModal(modal.id);
    }


    useEffect(() => {
        modal.isOpen ? setState({name: '', description: '', type: 'default', id: ''}) : '';
    }, [modal])


    useEffect(() => {
        let formValid: boolean = state.name !== '' && state.description !== '';
        setValid(formValid)
    }, [state])

    return (
        <>
            <div style={{
                'position': 'absolute',
                'top': '10px',
                'zIndex': '5',
                'right': '10px'
            }}>
                <button className={`btn btn-green`} style={{'whiteSpace': 'nowrap'}}
                        onClick={() => handleOnModal(modal.id)}>
                    Создать карточку
                </button>
            </div>
            <Modal modal={modal} title={'Создать карточку'} onClose={handleOnModal}>
                <>
                    <form onSubmit={event => handleOnSubmit(event)}>
                        <div className="row">
                            <div className="col-12">
                                <input
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    value={state.name}
                                    name={`name`}
                                    type="text"
                                    placeholder={`Введите название`}
                                    className="form-control"/>
                            </div>
                            <div className="col-12 mt-3">
                                <select
                                    className={'form-select'}
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    name="type"
                                    value={state.type}
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
                                    value={state.description as string}
                                />
                            </div>
                            <div className="col-12 mt-4">
                                <div className="d-flex justify-content-end">
                                    <button disabled={!valid} type={'submit'} className={'btn btn-green'}>
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

export default CreateNode;