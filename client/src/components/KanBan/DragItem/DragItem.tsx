import React from 'react';
import style from './index.module.scss';

const DragItem = () => {
    return (
        <div className={style.container}>
            <div className={style.tag}>
                Низкий приоритет
            </div>
            <div className={style.title}>
                Карточка товара
            </div>
            <div className={style.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam debitis dolorem neque numquam rem,
                ullam ut. A dolor doloremque eaque ipsam laboriosam magnam minus numquam quo sint, veritatis, voluptate
                voluptatem.
            </div>
        </div>
    );
};

export default DragItem;