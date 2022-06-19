import React from 'react';
import ContentLoader from 'react-content-loader';
import style from '../index.module.scss';


const SkeletonUser = () => {
    return (
        <div className={style.container} style={{"padding" : "1rem"}}>
            <ContentLoader
                speed={2}
                width={135}
                height={150}
                viewBox="0 0 135 150"
                backgroundColor="#e3e3e3"
                foregroundColor="#c2c2c2"
            >
                <rect x="270" y="260" rx="0" ry="0" width="3" height="0" />
                <circle cx="37" cy="37" r="37" />
                <rect x="0" y="122" rx="0" ry="0" width="95" height="11" />
                <rect x="0" y="89" rx="0" ry="0" width="135" height="18" />
            </ContentLoader>
        </div>
    );
};

export default SkeletonUser;