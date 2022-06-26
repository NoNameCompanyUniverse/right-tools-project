import React, {ReactElement} from 'react';
import UserContainer from '../../containers/User'
import {ToastContainer} from "react-toastify";
import LayoutPanel from "../../layout/LayoutPanel";

const User = () => {
    return (
        <>
           <UserContainer/>
            <ToastContainer theme={'colored'} position={'bottom-right'}/>
        </>
    );
};

User.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Страница пользователя'}>
            {page}
        </LayoutPanel>
    )
}

User.auth = true;


export default User;