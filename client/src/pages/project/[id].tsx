import React, {ReactElement} from 'react';
import {motion} from "framer-motion";
import {PageTransition} from "../../motion";
import LayoutPanel from "../../layout/LayoutPanel";
import Title from "../../components/Panel/Title";
import UserCard from "../../components/UserCard";

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