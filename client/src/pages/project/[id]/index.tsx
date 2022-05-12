import React, {ReactElement} from 'react';
import {motion} from "framer-motion";
import {PageTransition} from "../../../motion";
import LayoutPanel from "../../../layout/LayoutPanel";
import Title from "../../../components/Panel/Title";
import UserCard from "../../../components/Cards/UserCard";
import PanelInfo from "../../../components/Project/PanelInfo";
import Tabs from "../../../components/Tabs";
import Card from '../../../components/Project/Card';
import FileCard from "../../../components/Cards/FileCard";

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
        {id: 1, name: 'Board #1', path: '/kanban/'},
        {id: 2, name: 'Board #2', path: '/kanban/'},
        {id: 3, name: 'Board #3', path: '/kanban/'},
        {id: 4, name: 'Board #4', path: '/kanban/'},
        {id: 5, name: 'Board #5', path: '/kanban/'}
    ],
    boards: [
        {id: 1, name: 'Board #1', path: '/mindmap/'},
        {id: 2, name: 'Board #2', path: '/mindmap/'},
        {id: 3, name: 'Board #3', path: '/mindmap/'},
        {id: 4, name: 'Board #4', path: '/mindmap/'},
        {id: 5, name: 'Board #5', path: '/mindmap/'}
    ],
    files: [
        {id: 1, name: 'File #1'},
        {id: 2, name: 'File #2'},
        {id: 3, name: 'File #3'},
        {id: 4, name: 'File #4'},
        {id: 5, name: 'File #5'}
    ]
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
];


const maps = [
    {
        id: 1,
        banner: '/profile/user-banner.jpg',
        name: 'Board #1',
        path: 'mindmap'
    },
    {
        id: 2,
        banner: '/profile/user-banner.jpg',
        name: 'Board #2',
        path: 'mindmap'
    },
    {
        id: 3,
        banner: '/profile/user-banner.jpg',
        name: 'Board #3',
        path: 'mindmap'
    },
    {
        id: 4,
        banner: '/profile/user-banner.jpg',
        name: 'Board #4',
        path: 'mindmap'
    },
    {
        id: 5,
        banner: '/profile/user-banner.jpg',
        name: 'Board #5',
        path: 'mindmap'
    },

];

const kambans = [
    {
        id: 1,
        banner: '/profile/user-banner.jpg',
        name: 'Board #1',
        path: 'kanban'
    },
    {
        id: 2,
        banner: '/profile/user-banner.jpg',
        name: 'Board #2',
        path: 'kanban'
    },
    {
        id: 3,
        banner: '/profile/user-banner.jpg',
        name: 'Board #3',
        path: 'kanban'
    },
    {
        id: 4,
        banner: '/profile/user-banner.jpg',
        name: 'Board #4',
        path: 'kanban'
    },
    {
        id: 5,
        banner: '/profile/user-banner.jpg',
        name: 'Board #5',
        path: 'kanban'
    },

];

const files = [
    {
        id: 1,
        date: 'Jan 30 / 2020',
        name: 'ID Photo',
        size: '537Kb',
        type: 'PNG',
    },
    {
        id: 2,
        date: 'Jan 30 / 2020',
        name: 'Design',
        size: '537Kb',
        type: 'JPG',
    },
    {
        id: 3,
        date: 'Jan 30 / 2020',
        name: 'Table Plan',
        size: '537Kb',
        type: 'xls',
    },
    {
        id: 4,
        date: 'Jan 30 / 2020',
        name: 'ТЗ',
        size: '537Kb',
        type: 'doc',
    },
    {
        id: 1,
        date: 'Jan 30 / 2020',
        name: 'ID Photo',
        size: '537Kb',
        type: 'PNG',
    },
    {
        id: 2,
        date: 'Jan 30 / 2020',
        name: 'Design',
        size: '537Kb',
        type: 'JPG',
    },
    {
        id: 3,
        date: 'Jan 30 / 2020',
        name: 'Table Plan',
        size: '537Kb',
        type: 'xls',
    },
    {
        id: 4,
        date: 'Jan 30 / 2020',
        name: 'ТЗ',
        size: '537Kb',
        type: 'doc',
    },


]

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
                            <Tabs tabs={[
                                'Разработчики проекта',
                                'Mind Maps проекта',
                                'KanBan boards',
                                'Вложения'
                            ]}>
                                <>
                                    <div>
                                        <Title value={`Разработчики проекта`}/>
                                        <div className={`mt-4`}>
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
                                    </div>
                                    <div>
                                        <Title value={`Mind Maps проекта`}/>
                                        <div className={`mt-4`}>
                                            <div className={`row`}>
                                                {
                                                    maps.map((map, index) => (
                                                        <div key={index} className={`col-xxl-3 col-xl-4 col-lg-6 mb-3`}>
                                                            <Card props={map}/>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Title value={`KanBan boards`}/>
                                        <div className={`mt-4`}>
                                            <div className={`row`}>
                                                {
                                                    kambans.map((map, index) => (
                                                        <div key={index} className={`col-xxl-3 col-xl-4 col-lg-6 mb-3`}>
                                                            <Card props={map}/>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Title value={`Вложения проекта`}/>
                                        <div className={`mt-4`}>
                                            <div className="row gx-3">
                                                {
                                                    files.map((file, index) => (
                                                        <div key={index} className={`col-xxl-4 col-xl-6 col-lg-12 mb-3`}>
                                                            <FileCard props={file}/>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            </Tabs>
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