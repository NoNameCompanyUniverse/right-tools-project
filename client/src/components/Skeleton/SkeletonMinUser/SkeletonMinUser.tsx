import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonMinUser = () => {
    return (
        <>
            <ContentLoader
                speed={2}
                width={370}
                height={60}
                viewBox="0 0 370 60"
                backgroundColor="#e3e3e3"
                foregroundColor="#c2c2c2">
                <rect x="270" y="260" rx="0" ry="0" width="3" height="0" />
                <circle cx="30" cy="30" r="30" />
                <rect x="76" y="7" rx="0" ry="0" width="214" height="20" />
                <rect x="76" y="35" rx="0" ry="0" width="140" height="19" />
            </ContentLoader>
        </>
    );
};

export default SkeletonMinUser;