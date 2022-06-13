import React, {ReactElement} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import UsersContainer from '../../containers/Users'


const Users = () => {
    return (
        <>
            <UsersContainer/>
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