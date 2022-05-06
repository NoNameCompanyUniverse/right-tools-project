import React, {ReactElement, useState} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import {motion} from "framer-motion";
import {fadeUp, PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import ProjectCard from "../../components/Cards/ProjectCard";
import Search from "../../components/Search";

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
        name: 'Доработка проекта',
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
        name: 'Добавить новый функционал',
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

const Projects = () => {

    const [query, setQuery] = useState("")

    const handleOnSearch = (value:string) => {
        setQuery(value)
    }



    return (
        <motion.div
            variants={PageTransition}
            initial={`initial`}
            animate={`animate`}>
            <div className="row">
                <div className="col">
                    <div>
                        <Title value={'Список ваши проектов'}/>
                    </div>
                    <div className={`col-xl-8 my-5`}>
                        <Search placeholder={'Поиск ...'} onSubmit={handleOnSearch}/>
                    </div>
                    <div className="row">
                        {
                            projects.filter(project => project.name.toLowerCase().includes(query)).map((project, index) => (
                                <motion.div variants={fadeUp} initial={`initial`} animate={`animate`} custom={index} key={project.id} className="col-xxl-4 col-lg-6 mb-4">
                                    <ProjectCard props={project}/>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

Projects.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Проекты'}>
            {page}
        </LayoutPanel>
    )
}

export default Projects;