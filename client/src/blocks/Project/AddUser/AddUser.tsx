import React, {FormEvent, useEffect, useState} from 'react';
import users_data from '../../../../data-users.json'
import {IUser} from "../../../types/IUser";
import {IModal} from "../../../types/IModal";
import Modal from '../../../components/Modal';
import style from "../../../styles/project/index.module.scss";
import {genId} from "../../../helpers/functions";

interface IAddUser {
    modal: IModal,
    onModal: (id: string) => void,
    participant: Array<number>,
    onUsers: (data: Array<number>) => void
}

const AddUser: React.FC<IAddUser> = ({modal, onModal, participant, onUsers}) => {

    const [state, setState] = useState<IUser[]>(users_data);

    const {id, isOpen} = modal

    const [users, setUsers] = useState<Array<number>>(participant);

    const handleOnModal = (id: string) => onModal(id);

    const handleOnUser = (id: number, type: 'ADD' | 'DELETE') => {
        switch (type) {
            case "ADD": {
                setUsers(state => [...state, id])
                break;
            }
            case "DELETE": {
                setUsers(users.filter(u => u !== id));
                break;
            }
            default : {
                break;
            }
        }
    }

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        onUsers(users);
        onModal(id);
    }

    useEffect(() => {
        //setUsers(participant)
    }, []);

    useEffect(() => {
        !isOpen ? setUsers([]) : setUsers(participant);
    }, [isOpen])


    const User: React.FC<{ props: IUser }> = ({props}) => {

        const {id, status, firstname, lastname, avatar} = props;


        const isActive = users.includes(id);

        return (
            <>
                <div className={`d-flex align-items-center mb-3`}>
                    <div className={style.avatar}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={avatar} alt=""/>
                    </div>
                    <div className={`ms-3`}>
                        <div className={style.name}>
                            <span className={`text-black`}>
                                {[lastname, firstname].join(" ")}
                            </span>
                        </div>
                        <div className={style.status}>
                            <span className="text-gray">
                                {status}
                            </span>
                        </div>
                    </div>
                    <div className={'ms-auto'}>
                        <button
                            onClick={() => handleOnUser(id, isActive ? 'DELETE' : 'ADD')}
                            type={'button'}
                            className={['btn', 'btn-sm', isActive ? 'btn-danger' : 'btn-green'].join(" ")}>
                            {
                                isActive ? 'Удалить' : 'Добавить'
                            }
                        </button>
                    </div>
                </div>
            </>
        )
    }


    return (
        <Modal modal={modal} onClose={handleOnModal} title={'Пользователи'}>
            <form onSubmit={handleOnSubmit}>
                {
                    users_data.map((user: IUser) => (
                        <React.Fragment key={genId()}>
                            <User props={user}/>
                        </React.Fragment>
                    ))
                }
                <div className="mt-4">
                    <div className="d-flex justify-content-end">
                        <button type={'submit'} className="btn btn-green">Отправить</button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default AddUser;