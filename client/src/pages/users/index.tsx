import React, {ReactElement, useEffect} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import UsersContainer from '../../containers/Users'
import {ToastContainer} from "react-toastify";


const Users = () => {
    useEffect(() => {
        console.log('render')
    }, [])
    return (
        <>
            <UsersContainer/>
            <ToastContainer theme={'colored'} position={'bottom-right'}/>
        </>
    );
};

Users.auth = true;

Users.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Поиск сотрудников'}>
            {page}
        </LayoutPanel>
    )
}

export default Users;