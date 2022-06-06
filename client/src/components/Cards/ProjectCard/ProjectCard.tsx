import React, {ReactNode} from 'react';
import style from './index.module.scss';
import Link from 'next/link'
import DropDown from "../../DropDown";
import {IUser} from "../../../types/IUser";
import {IProject} from "../../../types/IProject";


interface IProjectCard  {
    data: IProject,
    children?: ReactNode | ReactNode []
}

const ProjectCard: React.FC<IProjectCard> = ({data, children}) => {

    const {name, status, description, team, id} = data;



    const User: React.FC<{ id: number, avatar: string }> = ({id, avatar}) => {
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
                    {`+${team.length - 3}`}
                </div>)}
                {team.map((item: { avatar: string, id: number }, index: number) => {
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
                {
                    children && (
                        <DropDown>
                            {
                                children
                            }
                        </DropDown>
                    )
                }
            </div>
            <div className={style.title}>
                <Link href={`/project/${id}`}>
                    <a>
                        {name}
                    </a>
                </Link>
            </div>
            <div
                className={`${style.status} ${status.id === 1 ? style.admin : status.id === 2 ? style.developer : ''}`}>
                {status.value}
            </div>
            <div className={style.description}>
                {description}
            </div>
        </div>
    );
};

export default React.memo(ProjectCard);