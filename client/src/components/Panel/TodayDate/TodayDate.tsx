import React, {useState} from 'react';
import style from './index.module.scss';

const TodayDate = () => {

    const monthName: Array<string> = [
        'Января',
        'Февраля',
        'Марта',
        'Апреля',
        'Мая',
        'Июня',
        'Июля',
        'Августа',
        'Сентября',
        'Октября',
        'Ноября',
        'Декабря',
    ];
    const [date, setDate] = useState(new Date());

    return (
        <div className={style.date}>
            Сегодня, {date.getDate()} {monthName[date.getMonth()]} {date.getFullYear()}
        </div>
    );
};

export default TodayDate;