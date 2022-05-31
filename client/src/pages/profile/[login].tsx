import React, {ReactElement, useState} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import Title from "../../components/Panel/Title";
import StatisticsCard from "../../components/Panel/StatisticsCard";
import User from "../../components/Panel/User";
import {motion} from 'framer-motion'
import {PageTransition} from "../../motion";
import ProjectCard from "../../components/Cards/ProjectCard";
import Users from "../../components/Panel/Users";

import user_data from '../../../data-profile.json';
import {IUser} from "../../types/IUser";
import ControlProfile from "../../blocks/Profile/ControlProfile";

const projects: Array<any> = [
    {
        id: 1,
        name: 'Разработка интернет-магазина',
        status: {
            id: 1,
            name: 'Администратор'
        },
        team: [
            {
                id: 1,
                avatar: '/profile/user.PNG'
            },
            {
                id: 2,
                avatar: '/test/avatar.jpg'
            },
            {
                id: 3,
                avatar: '/profile/user.PNG'
            },
            {
                id: 4,
                avatar: '/test/avatar.jpg'
            },
            {
                id: 5,
                avatar: '/profile/user.PNG'
            },

        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam at aut autem consectetur consequuntur excepturi exercitationem, illum, non quibusdam ratione sapiente similique tempora. Animi eius expedita inventore qui rerum!'
    },
    {
        id: 2,
        name: 'Разработка интернет-магазина',
        status: {
            id: 2,
            name: 'Участник'
        },
        team: [
            {
                id: 1,
                avatar: '/profile/user.PNG'
            },
            {
                id: 2,
                avatar: '/test/avatar.jpg'
            },
            {
                id: 3,
                avatar: '/profile/user.PNG'
            },

        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam at aut autem consectetur consequuntur excepturi exercitationem, illum, non quibusdam ratione sapiente similique tempora. Animi eius expedita inventore qui rerum!'
    },
    {
        id: 3,
        name: 'Разработка интернет-магазина',
        status: {
            id: 1,
            name: 'Администратор'
        },
        team: [
            {
                id: 1,
                avatar: '/profile/user.PNG'
            },
            {
                id: 2,
                avatar: '/test/avatar.jpg'
            },

        ],
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam at aut autem consectetur consequuntur excepturi exercitationem, illum, non quibusdam ratione sapiente similique tempora. Animi eius expedita inventore qui rerum!'
    },
];


const users:Array<any> = [
    {
        id: 1,
        name: 'Alice Zuberg',
        status: 'UI/UX designer',
        avatar: '/profile/user.PNG'
    },
    {
        id: 2,
        name: 'Liza Primoshina',
        status: 'Manager',
        avatar: '/test/avatar.jpg'
    },
    {
        id: 1,
        name: 'Alice Zuberg',
        status: 'UI/UX designer',
        avatar: '/profile/user.PNG'
    },
    {
        id: 2,
        name: 'Liza Primoshina',
        status: 'Manager',
        avatar: '/test/avatar.jpg'
    },

]

const Profile = () => {

    const [userData, setUserData] = useState<IUser>(user_data)


    const handleSetProfile = (data: IUser) => setUserData(data)

    return (
        <>
            <ControlProfile data={userData} onProfile={handleSetProfile}/>
            <motion.div
                variants={PageTransition}
                initial={`initial`}
                animate={'animate'}>
                <div className="row">
                    <div className="col-xl">
                        <div>
                            <Title value={'С возвращением в RightTool'}/>
                        </div>
                        <div className="row my-5 gx-3">
                            <div className="col-xl-4">
                                <StatisticsCard
                                    title={`Количество сотрудников`}
                                    count={56}
                                    description={`Количество индивидуальных людей которое задействовано во всех проектах с вашим участием`}
                                    background={'#868974'}
                                />
                            </div>
                            <div className="col-xl-4">
                                <StatisticsCard
                                    title={`Количество проектов вашим участием`}
                                    count={17}
                                    description={`Количество проектов в которых вы принимаете участие`}
                                    background={`#F0B878`}
                                />
                            </div>
                            <div className="col-xl-4">
                                <StatisticsCard
                                    title={`Количество ваших проектов`}
                                    count={25}
                                    description={`Количество ваших личных проектов`}
                                    background={`#8E9993`}
                                />
                            </div>
                        </div>
                        <div>
                            <Title value={'Ваши проекты'}/>
                        </div>
                        <div className="row my-5 gx-4">
                            {
                                projects.map((project, index: number) => (
                                    <div key={index} className="col-xxl-4 col-lg-6 mb-4">
                                        <ProjectCard props={project}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className={`mb-3`}>
                            <User
                                data={userData}
                            />
                        </div>
                        <div className={`mb-3`}>
                            <Users users={users}/>
                        </div>
                    </div>
                </div>
            </motion.div>

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

export default Profile;