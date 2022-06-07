import React, {ReactElement, useEffect, useState} from 'react';
import ProjectContainer from '../../../containers/Project';
import LayoutPanel from "../../../layout/LayoutPanel";


const Project = () => {
    return (
        <ProjectContainer/>
    );
};

Project.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Текущий проект'}>
            {page}
        </LayoutPanel>
    )
}

Project.auth = true;

export default Project;