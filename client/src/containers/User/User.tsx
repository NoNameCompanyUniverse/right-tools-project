import React from 'react';
import {useSession} from "next-auth/react";
import {useAppDispatch} from "../../redux/hooks";

const User = () => {

    const {data: session} = useSession()
    const dispatch = useAppDispatch();


    return (
        <div>
            121
        </div>
    );
};

export default User;