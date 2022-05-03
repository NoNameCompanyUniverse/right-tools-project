import React from 'react';
import style from './index.module.scss';
import DropDown from "../DropDown";

type IUserCard = {
    id: number,
    avatar: string,
    name: string,
    status: string,
    tags: Array<{ id: number, name: string }>
}

const UserCard: React.FC<{ props: IUserCard }> = ({props}) => {

    const {id, status, name, avatar, tags} = props;

    return (
        <div className={style.block}>
            <div className={style.avatar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={avatar} alt=""/>
            </div>
            <div className={style.control}>
                <DropDown>
                    <ul>
                        <li>Подробнее</li>
                        <li>Добавить</li>
                    </ul>
                </DropDown>
            </div>
            <div className={style.name}>
                <span className="text-black">
                    {name}
                </span>
            </div>
            <div className={style.status}>
                <span className={`text-gray`}>
                    {status}
                </span>
            </div>
            <div className={`d-flex align-items-center flex-wrap`}>
                {
                    tags.map((tag: { id: number, name: string }, index: number) => (
                        <div key={index} className={style.tag}>
                            {tag.name}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default UserCard;