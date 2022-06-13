import React, {ReactElement, useState} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import {motion} from "framer-motion";
import {PageTransition} from "../../motion";
import ProjectsContainer from '../../containers/Projects'

const Projects = () => {
    return (

        <ProjectsContainer/>
    );
};
Projects.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Проекты'}>
            {page}
        </LayoutPanel>
    )
}

Projects.auth = true;

export default Projects;