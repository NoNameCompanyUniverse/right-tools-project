import React, {ReactNode} from 'react';
import style from './index.module.scss';
import Link from 'next/link'
import DropDown from "../../DropDown";
import {IProject} from "../../../types/IProject";


interface IProjectCard  {
    data: IProject,
    children?: ReactNode | ReactNode [],
    root: number
}

const ProjectCard: React.FC<IProjectCard> = ({data, children, root}) => {

    const {name, admin, participants, id, description} = data;



    const User: React.FC<{ id: number, photo: string }> = ({id, photo}) => {
        return (
            <>
                <div className={style.avatar}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo ? photo : '/profile/default-profile.png'} alt=""/>
                </div>
            </>
        )
    }


    return (
        <div className={style.block}>
            <div className={style.team}>
                {participants.length > 3 && (<div className={style.count}>
                    {`+${participants.length - 3}`}
                </div>)}
                {participants.map((item: { photo: string, id: number }, index: number) => {
                    if (index < 3) {
                        return (
                            <>
                                <User key={index} {...item}/>
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
            <div className={[style.status, admin === root ? style.admin : style.developer].join(" ")}>
                {admin === root ? 'Администратор' : 'Участник'}
            </div>
            <div className={style.description}>
                {description}
            </div>
        </div>
    );
};

export default React.memo(ProjectCard);