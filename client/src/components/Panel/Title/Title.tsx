import React from 'react';
import style from './index.module.scss';

const Title:React.FC<{value: string}> = ({value}) => {
    return (
        <div className={style.title}>
            {value.substring(0, value.lastIndexOf(" "))}
            <span className={`ms-2 text-green`}>
                {value.split(' ').pop()}
            </span>
        </div>
    );
};

export default Title;