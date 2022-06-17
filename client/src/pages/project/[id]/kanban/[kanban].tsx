import React, {ReactElement, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {PageTransition} from "../../../../motion";
import LayoutPanel from "../../../../layout/LayoutPanel";


import KanBan from "../../../../containers/KanBan";
import { ToastContainer } from 'react-toastify';


const Kanban = () => {
    return (
        <>
            <motion.div
                variants={PageTransition}
                initial={`initial`}
                animate={`animate`}
                className={`d-flex flex-column flex-grow-1`}>
                <KanBan/>
            </motion.div>
            <ToastContainer theme={'colored'} position={'bottom-right'}/>
        </>
    );
};


Kanban.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Right Tools | KanBan доска'}>
            {page}
        </LayoutPanel>
    )
}

Kanban.auth = true;

export default Kanban;