import React from 'react';
import ContentLoader from 'react-content-loader';
import style from './../index.module.scss';

const SkeletonProject = () => {
    return (
        <div className={style.container}>
            <ContentLoader
                speed={2}
                width={185}
                height={250}
                viewBox="0 0 185 250"
                backgroundColor="#e3e3e3"
                foregroundColor="#c2c2c2">
                <rect x="270" y="260" rx="0" ry="0" width="3" height="0" />
                <circle cx="30" cy="30" r="30" />
                <rect x="0" y="76" rx="0" ry="0" width="214" height="20" />
                <rect x="1" y="112" rx="16" ry="16" width="140" height="35" />
                <rect x="0" y="189" rx="0" ry="0" width="182" height="10" />
                <rect x="0" y="209" rx="0" ry="0" width="130" height="10" />
                <rect x="0" y="232" rx="0" ry="0" width="154" height="10" />
            </ContentLoader>
        </div>
    );
};

export default SkeletonProject;