import React from 'react';
import ContentLoader from "react-content-loader"
import style from './index.module.scss';

const SkeletonProfile = () => {
    return (
        <div className={style.container}>
            <ContentLoader
                speed={2}
                width={370}
                height={540}
                viewBox="0 0 370 540"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="30" rx="0" ry="0" width="370" height="160" />
                <circle cx="75" cy="192" r="52" />
                <rect x="24" y="271" rx="0" ry="0" width="226" height="27" />
                <rect x="270" y="260" rx="0" ry="0" width="3" height="0" />
                <rect x="24" y="309" rx="0" ry="0" width="161" height="20" />
                <rect x="24" y="362" rx="0" ry="0" width="271" height="20" />
                <rect x="24" y="420" rx="0" ry="0" width="125" height="20" />
                <rect x="24" y="448" rx="0" ry="0" width="210" height="20" />
                <rect x="24" y="485" rx="0" ry="0" width="125" height="20" />
                <rect x="24" y="513" rx="0" ry="0" width="210" height="21" />
            </ContentLoader>
        </div>
    );
};

export default SkeletonProfile;