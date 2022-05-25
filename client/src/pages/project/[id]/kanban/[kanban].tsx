import React, {ReactElement, useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {PageTransition} from "../../../../motion";
import LayoutPanel from "../../../../layout/LayoutPanel";
import DragColumn from "../../../../components/KanBan/DragColumn";
import DragItem from "../../../../components/KanBan/DragItem";

import KanBan from "../../../../containers/KanBan";


const Kanban = () => {


    return (
        <motion.div
            variants={PageTransition}
            initial={`initial`}
            animate={`animate`}
            className={`d-flex flex-column flex-grow-1`}>
            <KanBan/>
        </motion.div>
    );
};


Kanban.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Right Tools | KanBan доска'}>
            {page}
        </LayoutPanel>
    )
}


export default Kanban;