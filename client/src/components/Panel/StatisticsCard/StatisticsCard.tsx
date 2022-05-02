import React from 'react';
import style from './index.module.scss';

type IStatisticsCard = {
    title: string,
    count: number,
    description: string,
    background?: string
}

const StatisticsCard:React.FC<IStatisticsCard> = ({title, count, description, background= `#8E9993FF`}) => {
    return (
        <div className={style.block} style={{'background' : background}}>
            <div className={style.title}>
                {title}
            </div>
            <div className={style.count}>
                {count}
            </div>
            <div className={style.description}>
                {description}
            </div>
        </div>
    );
};

export default StatisticsCard;