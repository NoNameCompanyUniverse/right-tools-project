import React, {FormEvent, useEffect, useState} from 'react';
import Modal from "../../../components/Modal";
import {IModal} from "../../../types/IModal";
import {IUser} from "../../../types/IUser";
import FormFile from "../../../components/Form/FormFile";

interface IControlProfile {
    data: IUser | null,
    onProfile: (data: IUser) => void,
}

const ControlProfile:React.FC<IControlProfile> = ({data, onProfile}) => {

    const [modal, setModal] = useState<IModal>({id: '#controlUser', isOpen: true});
    const [state, setState] = useState<IUser | null>(null);


    const handleOnModal = (id: string) => setModal({id: id, isOpen: !modal.isOpen});

    const handleOnSubmit = (event:FormEvent) => {
        event.preventDefault();

    }

    const handleOnFile = (data:any, name: string) => {

    }

    const handleSetValue = () => {

    }

    useEffect(() => {
        if (data) {
            setModal({id: modal.id, isOpen: true});
            setState(data)
        }
    }, [data])

    return (
        <Modal modal={modal} onClose={handleOnModal} title={"Изменить"}>
            {
                state && (
                    <form onSubmit={event => handleOnSubmit(event)}>
                        <div className="row">
                            <div className="col-12">
                                <FormFile
                                    onFile={handleOnFile}
                                    value={state.banner}
                                    name={'BANNER'}/>
                            </div>
                            <div className={['col-12', 'mx-4'].join(" ")} style={{"marginTop": "-3rem"}}>
                                <FormFile
                                    rounded={true}
                                    value={state.avatar}
                                    name={'AVATAR'}
                                    onFile={handleOnFile}/>
                            </div>
                            <div className="col-6">
                                <div className="f-7 mb-2 fw-bold">Фамилия</div>
                                <input type="text"/>
                            </div>
                        </div>
                    </form>
                )
            }
        </Modal>
    );
};

export default ControlProfile;