import React, {FormEvent, useEffect, useState} from 'react';
import {CollectionIcon} from "@heroicons/react/outline";
import Modal from "../../../components/Modal";
import {IDrag, INewDrag} from '../../../types/IKanBan';
import {IModal} from "../../../types/IModal";
import FormInput from "../../../components/Form/FormInput/FormInput";
import FormTextarea from "../../../components/Form/FormTextarea/FormTextarea";


interface ICreateDrag {
    onDrag: (action: { type: "CREATE" | "EDIT" | "DELETE", payload: INewDrag }) => void,
}

const CreateDrag: React.FC<ICreateDrag> = ({onDrag}) => {


    const [modal, setModal] = useState<IModal>({id: '1', isOpen: false});

    const [state, setState] = useState<INewDrag>({
        name: '',
        priority: 'L',
        description: '',
    });


    const [valid, setValid] = useState<boolean>(false)

    const types: Array<{ option: string, label: string }> = [
        {option: 'L', label: 'Низкий приоритет'},
        {option: 'A', label: 'Средний приоритет'},
        {option: 'H', label: 'Высокий приоритет'}
    ];

    const handleSetValue = (value: string, name: string) => setState(state => ({...state, [name]: value}));

    const handleOnModal = (id: string) => {
        setModal({id: id, isOpen: !modal.isOpen})
    }


    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        onDrag({type: "CREATE", payload: state});
        handleOnModal(modal.id);
    }


    useEffect(() => {
        if (!modal.isOpen) {
            setState({name: '', description: '', priority: 'L',});
        }

    }, [modal]);
    useEffect(() => {
        let formValid: boolean = state.name !== '' && state.description !== '';
        setValid(formValid)
    }, [state])


    return (
        <>

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

            <Modal modal={modal} onClose={handleOnModal} title={'Создать карточку'}>
                <>
                    <form onSubmit={event => handleOnSubmit(event)}>
                        <div className="row">
                            <div className="col-12">
                                <FormInput
                                    name={'name'}
                                    type={'text'}
                                    value={state.name}
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