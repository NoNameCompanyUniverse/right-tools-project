import React, {ReactElement, useState} from 'react';
import {motion} from 'framer-motion'
import {PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import LayoutPanel from "../../layout/LayoutPanel";
import Search from "../../components/Search";
import User from "../../components/Panel/User";
import UserCard from "../../components/Cards/UserCard";

import users_data from '../../../data-users.json';



const Users = () => {

    const handleOnSearch = (value:string) => {

    }

    return (
        <>
            <motion.div
                variants={PageTransition}
                initial={'initial'}
                animate={'animate'}>
                <div className="row">
                    <div className="col-xl">
                        <div>
                            <Title value={'Поиск новых сотрудников'}/>
                        </div>
                        <div className={`col-xl-8 my-5`}>
                            <Search placeholder={'Поиск ...'} onSubmit={handleOnSearch}/>
                        </div>
                        <div className={`row`}>
                            {
                                users_data.map((user, index) => (
                                    <div key={index} className={`col-xl-4 mb-3`}>
                                        <UserCard data={user}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className={`mb-3`}>
                            <User
                                data={users_data[0]}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

Users.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Поиск сотрудников'}>
            {page}
        </LayoutPanel>
    )
}

export default Users;