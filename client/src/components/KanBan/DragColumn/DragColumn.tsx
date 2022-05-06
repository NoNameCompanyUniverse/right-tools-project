import React from 'react';
import style from './index.module.scss';



const DragColumn:React.FC = ({children}) => {
    return (
        <div className={style.container}>
            <div className={style.title}>
                Backlog
            </div>
            <div className={style.content}>
                {
                    children
                }
            </div>
        </div>
    );
};

export default DragColumn;