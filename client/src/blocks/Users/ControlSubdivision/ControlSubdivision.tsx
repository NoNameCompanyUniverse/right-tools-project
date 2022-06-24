import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";
import SubdivisionTree from "../../../components/SubdivisionTree";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {useSession} from "next-auth/react";
import {getSubdivision} from "../../../redux/actions/SubdivisionAction";
import {ISubdivision} from "../../../types/ISubdivision";

interface IControlSubdivision {
    modal: IModal,
    onModal: (id: string) => void,
    subdivisions: ISubdivision[] | null,
    subdivision: number,
    onSubdivision: (id: number, name: string) => void
}

const ControlSubdivision: React.FC<IControlSubdivision> = (
    {modal, onModal, subdivisions, subdivision, onSubdivision}) => {


    const handleOnModal = (id: string) => onModal(id);

    const [state, setState] = useState<number | null>();
    const [name, setName] = useState('')

    useEffect(() => {
        if (modal.isOpen) {
            setState(subdivision);
        }
    }, [modal])

    const handleOnChecked = (value: number, name: string) => {
        setState(value)
        setName(name)
    }

    const handleOnSubmit = (e: FormEvent) => {
        e.preventDefault()
        state ? onSubdivision(state, name) : ''
        onModal(modal.id)
    }

    return (
        <Modal modal={modal} onClose={handleOnModal} title={'Подразделение'}>
            <form onSubmit={handleOnSubmit}>
                <div className="row">
                    <div className="col-12">
                        {
                            (subdivisions && state) && subdivisions.map((i: ISubdivision) => <SubdivisionTree
                                isChecked={state} onChecked={handleOnChecked} key={i.id} props={i}/>)
                        }
                    </div>
                    <div className="col-12 mt-4">
                        <div className="d-flex justify-content-end">
                            <button type={'submit'} className="btn btn-green">
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default ControlSubdivision;