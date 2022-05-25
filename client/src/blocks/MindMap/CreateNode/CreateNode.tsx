import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {Node} from "react-flow-renderer";




type INode = { label: string, description: string, type: 'source' | 'target' | 'default' }
const getNodeId = () => `randomnode_${+new Date()}`;


const CreateNode:React.FC<{onAddNode: (data:Node) => void}> = ({onAddNode}) => {

    const [modal, setModal] = useState<{ id: string, isOpen: boolean }>({id: '1', isOpen: false});

    const [node, setNode] = useState<INode>({
        label: '',
        description: '',
        type: 'default'
    })

    const types: Array<{ option: string, label: string }> = [
        {option: 'source', label: 'Начало'},
        {option: 'default', label: 'Промежуточный'},
        {option: 'target', label: 'Финал'}
    ];

    const handleOnModal = (id: string) => {
        setModal({id: id, isOpen: !modal.isOpen})
    }

    const handleSetValue = (value: string, name: string) => setNode(state => ({...state, [name]: value}));

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        const newNode:Node = {
            id: getNodeId(),
            type: 'nodeCard',
            data: {
                label: node.label,
                description: node.description,
                type: node.type
            },
            position: {
                x: Math.random() * window.innerWidth - 100,
                y: Math.random() * window.innerHeight,
            }
        }
        onAddNode(newNode);
        handleOnModal(modal.id);
    }


    useEffect(() => {
        modal.isOpen ? setNode({label: '', description: '', type: 'default'}) : '';
    }, [modal])

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
                                    value={node.label}
                                    name={`label`}
                                    type="text"
                                    placeholder={`Введите название`}
                                    className="form-control"/>
                            </div>
                            <div className="col-12 mt-3">
                                <select
                                    className={'form-select'}
                                    onChange={event => handleSetValue(event.target.value, event.target.name)}
                                    name="type"
                                    value={node.type}
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
                                    value={node.description}
                                />
                            </div>
                            <div className="col-12 mt-4">
                                <div className="d-flex justify-content-end">
                                    <button type={'submit'} className={'btn btn-green'}>
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