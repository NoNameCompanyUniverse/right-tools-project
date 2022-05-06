import React from 'react';
import style from './index.module.scss';

const Preloader = () => {
    return (
        <div className={style.container}>
            <div className={style.preloader}/>
        </div>
    );
};

export default Preloader;