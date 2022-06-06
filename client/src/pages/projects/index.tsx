import React, {ReactElement, useState} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import {motion} from "framer-motion";
import {fadeUp, PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import ProjectCard from "../../components/Cards/ProjectCard";
import Search from "../../components/Search";

import projects_data from '../../../data-projects.json';
import {IProject} from "../../types/IProject";

const Projects = () => {
    const [query, setQuery] = useState("")
    const handleOnSearch = (value: string) => {
        setQuery(value)
    }

    const [projectsData, setProjectsData] = useState<Array<IProject>>(projects_data);

    const handleDeleteProject = (id: number) => {
        setProjectsData(projectsData.filter(i => i.id !== id))
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
                            projectsData.filter(project => project.name.toLowerCase().includes(query)).map((project, index) => (
                                <motion.div
                                    variants={fadeUp}
                                    initial={`initial`}
                                    animate={`animate`}
                                    custom={index}
                                    key={project.id}
                                    className="col-xxl-4 col-lg-6 mb-4">
                                    <ProjectCard
                                        data={project}
                                    />
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