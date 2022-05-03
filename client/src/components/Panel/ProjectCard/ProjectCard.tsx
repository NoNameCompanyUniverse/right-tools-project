import React from 'react';
import style from './index.module.scss';
import Link from 'next/link'
import DropDown from "../../DropDown";


type IProjectCard = {
    name: string,
    status: {
        id: number,
        name: string
    },
    team: Array<{id: number, avatar: string}>,
    description: string,
}

const ProjectCard: React.FC<{ props: IProjectCard }> = ({props}) => {

    const {name, status, description, team} = props;



    const User: React.FC<{id: number, avatar: string}> = ({id, avatar}) => {
        return (
            <>
                <div className={style.avatar}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatar} alt=""/>
                </div>
            </>
        )
    }


    return (
        <div className={style.block}>
            <div className={style.team}>
                {team.length > 3 && (<div className={style.count}>
                            +{team.length - 3}
                        </div>)}
                {team.map((item: {avatar: string, id: number}, index: number) => {
                        if (index < 3) {
                            return (
                                <>
                                    <User key={index} id={item.id} avatar={item.avatar}/>
                                </>
                            )
                        }
                    })}
            </div>
            <div className={style.control}>
                <DropDown>
                    <ul>
                        <li>
                            Подробнее
                        </li>
                        <li>
                            Удалить
                        </li>
                    </ul>
                </DropDown>
            </div>
            <div className={style.title}>
                <Link href={``}>
                    <a>
                        {name}
                    </a>
                </Link>
            </div>
            <div className={`${style.status} ${status.id === 1 ? style.admin : status.id === 2 ? style.developer : ''}`}>
                {status.name}
            </div>
            <div className={style.description}>
                {description}
            </div>
        </div>
    );
};

export default ProjectCard;