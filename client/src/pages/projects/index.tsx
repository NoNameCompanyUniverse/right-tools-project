import React, {ReactElement} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";

const Projects = () => {
    return (
        <div>
            progects
        </div>
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