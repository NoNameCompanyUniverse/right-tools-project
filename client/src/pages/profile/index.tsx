import React, {ReactElement} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import ProfileContainer from '../../containers/Profile';
import {ToastContainer} from "react-toastify";

const Profile = () => {
    return (
        <>
            <ProfileContainer/>
            <ToastContainer theme={'colored'} position={'bottom-right'}/>
        </>
    );
};

Profile.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Личный кабинет'}>
            {page}
        </LayoutPanel>
    )
}

Profile.auth = true;

export default Profile;