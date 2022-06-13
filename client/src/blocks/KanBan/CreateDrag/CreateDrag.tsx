import React, {FormEvent, useEffect, useState} from 'react';
import {CollectionIcon} from "@heroicons/react/outline";
import Modal from "../../../components/Modal";
import {genId} from '../../../helpers/functions';
import {IDrag, INewDrag} from '../../../types/IDrag';
import {IModal} from "../../../types/IModal";
import FormInput from "../../../components/Form/FormInput/FormInput";


interface ICreateDrag {
    onDrag: (action: { type: "CREATE" | "EDIT" | "DELETE", payload: IDrag }) => void,
}

const CreateDrag: React.FC<ICreateDrag> = ({onDrag}) => {


    const [modal, setModal] = useState<IModal>({id: '1', isOpen: false});

    const [state, setState] = useState<INewDrag>({
        title: '',
        priority: '0',
        description: ''
    });


    const [valid, setValid] = useState<boolean>(false)

    const types: Array<{ option: string, label: string }> = [
        {option: '0', label: 'Низкий приоритет'},
        {option: '1', label: 'Средний приоритет'},
        {option: '2', label: 'Высокий приоритет'}
    ];

    const handleSetValue = (value: string, name: string) => setState(state => ({...state, [name]: value}));

    const handleOnModal = (id: string) => {
        setModal({id: id, isOpen: !modal.isOpen})
    }


    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        const newDrag: IDrag = {
            id: genId(),
            title: state.title,
            description: state.description,
            priority: +state.priority
        }
        onDrag({type: "CREATE", payload: newDrag});
        handleOnModal(modal.id);
    }


    useEffect(() => {
        if (!modal.isOpen) {
            setState({title: '', description: '', priority: '0'});
        }

    }, [modal]);
    useEffect(() => {
        let formValid: boolean = state.title !== '' && state.description !== '';
        setValid(formValid)
    }, [state])


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
                                <FormInput
                                    name={'title'}
                                    type={'text'}
                                    value={state.title}
                                    placeholder={'Введите название'}
                                    setValue={handleSetValue}
                                />
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
                                        type={`submit`}
                                        disabled={!valid}
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