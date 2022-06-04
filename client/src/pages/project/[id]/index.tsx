import React, {ReactElement, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {PageTransition} from "../../../motion";
import LayoutPanel from "../../../layout/LayoutPanel";
import Title from "../../../components/Panel/Title";
import UserCard from "../../../components/Cards/UserCard";
import PanelInfo from "../../../components/Project/PanelInfo";
import Tabs from "../../../components/Tabs";
import Card from '../../../components/Project/Card';
import FileCard from "../../../components/Cards/FileCard";
import project_data from '../../../../data-project.json';
import {IProjectFull} from "../../../types/IProject";
import {useRouter} from "next/router";



const Project = () => {

    const router = useRouter();




    const [projectData, setProjectData] = useState<IProjectFull>(project_data)

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
                            <UserCard data={projectData.team[0]}/>
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
                                                    projectData.team.map((user, index) => (
                                                        <div key={index} className={`col-xl-4 mb-3`}>
                                                            <UserCard data={user}/>
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
                                                    projectData.mindmap.map((map, index) => (
                                                        <div key={index} className={`col-xxl-3 col-xl-4 col-lg-6 mb-3`}>
                                                            <Card path={router.asPath} data={map} type={'MINDMAP'}/>
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
                                                    projectData.kanban.map((map, index) => (
                                                        <div key={index} className={`col-xxl-3 col-xl-4 col-lg-6 mb-3`}>
                                                            <Card path={router.asPath} data={map} type={'KANBAN'}/>
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
                                                    projectData.file.map((file, index) => (
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
                        <PanelInfo props={projectData}/>
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