import React, {ReactElement} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import ProfileContainer from '../../containers/Profile';

const Profile = () => {
    return (
        <ProfileContainer/>
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