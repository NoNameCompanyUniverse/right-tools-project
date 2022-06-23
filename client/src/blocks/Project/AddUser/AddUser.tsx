import React, {FormEvent, useEffect, useState} from 'react';
import {IUserMin} from "../../../types/IUser";
import {IModal} from "../../../types/IModal";
import Modal from '../../../components/Modal';
import style from "../../../styles/project/index.module.scss";
import {genId} from "../../../helpers/functions";
import {useSession} from "next-auth/react";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {deleteProjectParticipant} from "../../../redux/actions/ProjectsAction";
import {useRouter} from "next/router";

interface IAddUser {
    modal: IModal,
    onModal: (id: string) => void,
    participant: Array<number>,
    onUsers: (data: Array<number>) => void,
    isDelete?: boolean

}

const AddUser: React.FC<IAddUser> = ({modal, onModal, participant, onUsers, isDelete= false}) => {

    //const [state, setState] = useState<IUser[]>(users_data);

    const {id, isOpen} = modal

    const router = useRouter();
    const {data: session} = useSession()
    const {users, isFetching} = useAppSelector(state => state.usersSlice);
    const dispatch = useAppDispatch();
    const {auth} = useAppSelector(state => state.profileSlice);


    const [participantData, setParticipantData] = useState<Array<number>>(participant)

    const handleOnModal = (id: string) => onModal(id);

    const handleOnUser = (id: number, type: 'ADD' | 'DELETE') => {
        //@ts-ignore
        const token: string = session?.accessToken;
        switch (type) {
            case "ADD": {
                setParticipantData(state => [...state, id])
                break;
            }
            case "DELETE": {
                const newArr:Array<number> = participantData.filter(u => u !== id)
                // @ts-ignore
                isDelete ? dispatch(deleteProjectParticipant({token, id: router.query.id, data: {participants: [id]}})) : '';
                setParticipantData(newArr);
                break;
            }
            default : {
                break;
            }
        }
    }

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        onUsers(participantData);
        onModal(id);
    }

    useEffect(() => {
        setParticipantData(participant)
    }, []);

    useEffect(() => {
        !isOpen ? setParticipantData([]) : setParticipantData(participant);
    }, [isOpen])


    const User: React.FC<{ props: IUserMin }> = ({props}) => {

        const {id, subdivision, full_name, photo} = props;


        const isActive = participantData.includes(id);

        return (
            <>
                <div className={`d-flex align-items-center mb-3`}>
                    <div className={style.avatar}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photo ? photo : '/profile/default-profile.png'} alt=""/>
                    </div>
                    <div className={`ms-3`}>
                        <div className={style.name}>
                            <span className={`text-black`}>
                                {full_name}
                            </span>
                        </div>
                        {
                            subdivision && (
                                <div className={style.status}>
                                    <span className="text-gray">
                                        {subdivision.name}
                                    </span>
                                </div>
                            )
                        }
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
                <div style={{"maxHeight": "550px", "overflow": "auto"}} className={'px-1'}>
                    {
                        users.map((user: IUserMin, index) => (
                            <React.Fragment key={index}>
                                {
                                    auth ? user.id !== auth.id
                                            ? <User props={user}/>
                                            : ''
                                        : <User props={user}/>
                                }
                            </React.Fragment>
                        ))
                    }
                </div>
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