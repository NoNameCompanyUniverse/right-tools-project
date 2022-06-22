import React from 'react';
import ContentLoader from 'react-content-loader';
import style from './../index.module.scss';

const SkeletonFile = () => {
    return (
        <div className={style.container}>
            <ContentLoader
                speed={2}
                width={180}
                height={50}
                viewBox="0 0 180 50"
                backgroundColor="#e3e3e3"
                foregroundColor="#c2c2c2"
            >
                <rect x="270" y="260" rx="0" ry="0" width="3" height="0" />
                <rect x="0" y="122" rx="0" ry="0" width="95" height="11" />
                <rect x="0" y="89" rx="0" ry="0" width="135" height="18" />
                <rect x="0" y="0" rx="11" ry="11" width="50" height="50" />
                <rect x="70" y="6" rx="0" ry="0" width="120" height="14" />
                <rect x="70" y="30" rx="0" ry="0" width="65" height="14" />
            </ContentLoader>
        </div>
    );
};

export default SkeletonFile;