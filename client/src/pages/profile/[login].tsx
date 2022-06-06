import React, {ReactElement, useEffect, useState} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import Title from "../../components/Panel/Title";
import StatisticsCard from "../../components/Panel/StatisticsCard";
import User from "../../components/Panel/User";
import {motion} from 'framer-motion'
import {PageTransition} from "../../motion";
import ProjectCard from "../../components/Cards/ProjectCard";
import Users from "../../components/Panel/Users";

import user_data from '../../../data-profile.json';
import users_data from '../../../data-users.json';
import projects_data from '../../../data-projects.json';
import {IUser} from "../../types/IUser";
import ControlProfile from "../../blocks/Profile/ControlProfile";
import {IModal} from "../../types/IModal";
import {IProject} from "../../types/IProject";
import Link from "next/link";
import {toast} from "react-toastify";


const Profile = () => {

    const [userData, setUserData] = useState<IUser>(user_data);

    const [projectsData, setProjectsData] = useState<Array<IProject>>(projects_data);

    const [modal, setModal] = useState<IModal []>([
        {id: '#controlUser', isOpen: false},
        {id: '#popup', isOpen: false}
    ]);


    const handleSetProfile = (data: IUser) => {
        setUserData(data)
        toast.success('Профиль изменен')
    };

    const handleDeleteProject = (id: number) => {
        setProjectsData(projectsData.filter(i => i.id !== id));
        toast.error('Проект удален')
    }


    const handleOnModal = (id: string) => {
        let clone = modal.concat();
        clone = clone.map((e:IModal) => (
            e.id === id ? {id: e.id, isOpen: !e.isOpen} : e
        ))
        setModal(clone)
    }


    return (
        <>
            <ControlProfile modal={modal[0]} setModal={handleOnModal} data={userData} onProfile={handleSetProfile}/>
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
                                projectsData.map((project, index: number) => (
                                    <div key={index} className="col-xxl-4 col-lg-6 mb-4">
                                        <ProjectCard
                                            data={project}>
                                            <ul>
                                                <li>
                                                    <Link href={`/project/${project.id}`}>
                                                        <a>
                                                            Подробнее
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li onClick={() => handleDeleteProject(project.id)}>
                                                    Удалить
                                                </li>
                                            </ul>
                                        </ProjectCard>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className={`mb-3`}>
                            <User
                                data={userData}
                            >
                                <button
                                    type={`button`}
                                    onClick={() => handleOnModal(modal[0].id)}
                                    className={`btn btn-sm btn-green ms-2 rounded-pill`}>
                                    Изменить
                                </button>
                            </User>
                        </div>
                        <div className={`mb-3`}>
                            <Users users={users_data}/>
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