import React, {ReactElement, useState} from 'react';
import {motion} from 'framer-motion'
import {PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import LayoutPanel from "../../layout/LayoutPanel";
import Search from "../../components/Search";
import UserInfo from "../../components/Panel/User";
import User from "../../components/Panel/User";
import UserCard from "../../components/UserCard";

const user = {
    firstname: 'Sergey',
    lastname: 'Maksimov',
    login: '_l0stvayne_',
    email: 'sergey.maksimov2000@gmail.com',
    tel: '+7 (903) 869-48-67',
    status: 'Front-end developer',
    avatar: '/profile/user.PNG',
    banner: '/profile/user-banner.jpg'
}

const users:Array<any> = [
    {
        id: 1,
        avatar: '/profile/user.PNG',
        name: 'Alice Zuberg',
        status: 'UI/UX Designer',
        tags: [
            {
                id: 1,
                name: 'Дизайнер'
            },
            {
                id: 2,
                name: 'Figma'
            },
            {
                id: 3,
                name: 'PhotoShop'
            }
        ]
    },
    {
        id: 2,
        avatar: '/test/avatar.jpg',
        name: 'Liza Primoshina',
        status: 'Manager',
        tags: [
            {
                id: 1,
                name: 'Менеджер'
            },
            {
                id: 2,
                name: 'Яндекс Метрика'
            },
        ]
    },
    {
        id: 3,
        avatar: '/profile/user.PNG',
        name: 'Sergey Maksimov',
        status: 'Front-end developer',
        tags: [
            {
                id: 1,
                name: 'JavaScript'
            },
            {
                id: 2,
                name: 'React'
            },
            {
                id: 3,
                name: 'Next.js'
            },
            {
                id: 4,
                name: 'Redux'
            },
            {
                id: 5,
                name: 'Redux-toolkit'
            },
        ]
    },
    {
        id: 4,
        avatar: '/profile/user.PNG',
        name: 'Roman Sotnikov',
        status: 'Back-end developer',
        tags: [
            {
                id: 1,
                name: 'Python'
            },
            {
                id: 2,
                name: 'PHP'
            },
        ]
    },
]

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
                                users.map((user, index) => (
                                    <div key={index} className={`col-xl-4 mb-3`}>
                                        <UserCard props={user}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className={`mb-3`}>
                            <User
                                firstname={user.firstname}
                                status={user.status}
                                login={user.login}
                                avatar={user.avatar}
                                banner={user.banner}
                                email={user.email}
                                lastname={user.lastname}
                                tel={user.tel}
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