import React, {ReactElement} from 'react';
import {motion} from "framer-motion";
import {PageTransition} from "../../motion";
import LayoutPanel from "../../layout/LayoutPanel";
import Title from "../../components/Panel/Title";
import UserCard from "../../components/UserCard";
import PanelInfo from "../../components/Project/PanelInfo";

const user = {
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
};

const project = {
    id: 1,
    name: 'Доработка проекта',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at dolores enim excepturi explicabo facilis fuga illum iste magnam minus mollitia nam natus, nihil nulla numquam perferendis porro praesentium qui, quidem quis quo repellat sint temporibus vitae voluptatem. At aut beatae blanditiis deleniti id magni maxime perspiciatis qui ratione unde?',
    banner: '/profile/user-banner.jpg',
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
    maps: [
        {id: 1, name: 'Board #1'},
        {id: 2, name: 'Board #2'},
        {id: 3, name: 'Board #3'},
        {id: 4, name: 'Board #4'},
        {id: 5, name: 'Board #5'}
    ],
    boards: [
        {id: 1, name: 'Board #1'},
        {id: 2, name: 'Board #2'},
        {id: 3, name: 'Board #3'},
        {id: 4, name: 'Board #4'},
        {id: 5, name: 'Board #5'}
    ],
    files: [
        {id: 1, name: 'File #1'},
        {id: 2, name: 'File #2'},
        {id: 3, name: 'File #3'},
        {id: 4, name: 'File #4'},
        {id: 5, name: 'File #5'}
    ]
}

const Project = () => {
    return (
        <>
            <motion.div
                variants={PageTransition}
                initial={`initial`}
                animate={`animate`}>
                <div className={`row`}>
                    <div className={`col-xl`}>
                        <div>
                            <Title value={`Администратор проекта`}/>
                        </div>
                        <div className="col-xl-4 mt-3 mb-5">
                            <UserCard props={user}/>
                        </div>
                        <div>
                            <Title value={`Разработчики проекта`}/>
                        </div>

                    </div>
                    <div className="col-auto">
                        <PanelInfo props={project}/>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

Project.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Текущий проект'}>
            {page}
        </LayoutPanel>
    )
}

export default Project;