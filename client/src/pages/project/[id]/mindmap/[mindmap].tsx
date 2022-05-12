import React, {ReactElement, useCallback, useState} from 'react';
import MindMapBoard  from '../../../../blocks/MindMap';
import LayoutPanel from "../../../../layout/LayoutPanel";


const MindMap = () => {

    return (
        <div className={`flex-grow-1 d-flex flex-column`}>
            <MindMapBoard/>
        </div>
    );
};

MindMap.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Right Tools | Mind Map'}>
            {page}
        </LayoutPanel>
    )
}

export default MindMap;