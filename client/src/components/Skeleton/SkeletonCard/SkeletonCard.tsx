import React from 'react';
import ContentLoader from 'react-content-loader';
import style from './../index.module.scss';


const SkeletonCard = () => {
    return (
        <div className={style.container}>
            <ContentLoader
                speed={2}
                width={135}
                height={100}
                viewBox="0 0 135 100"
                backgroundColor="#e3e3e3"
                foregroundColor="#c2c2c2"
            >
                <rect x="270" y="260" rx="0" ry="0" width="3" height="0" />
                <rect x="0" y="122" rx="0" ry="0" width="95" height="11" />
                <rect x="0" y="79" rx="0" ry="0" width="93" height="18" />
                <rect x="0" y="0" rx="11" ry="11" width="127" height="60" />
            </ContentLoader>
        </div>
    );
};

export default SkeletonCard;