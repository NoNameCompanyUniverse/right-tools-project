import React, {ReactElement, useState} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import ProjectsContainer from '../../containers/Projects'
import {ToastContainer} from "react-toastify";

const Projects = () => {
    return (
        <>
            <ProjectsContainer/>
            <ToastContainer theme={'colored'} position={'bottom-right'}/>
        </>

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