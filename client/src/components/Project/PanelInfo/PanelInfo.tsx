import React from 'react';
import style from './index.module.scss';
import {PlusSmIcon} from "@heroicons/react/outline";
import Link from 'next/link'


type IPanelInfo = {
    id: number,
    name: string,
    description: string,
    banner: string,
    team: Array<{ id: number, avatar: string }>,
    maps: Array<{ id: number, name: string }>,
    boards: Array<{ id: number, name: string }>,
    files: Array<{ id: number, name: string }>,
}

const PanelInfo: React.FC<{ props: IPanelInfo }> = ({props}) => {

    const {id, boards, name, files, maps, description, team, banner} = props;

    const Title: React.FC<{ value: string }> = ({value}) => {
        return (
            <div className={style.title}>
                {value.substring(0, value.lastIndexOf(" "))}
                <span className="text-green ms-2">
                    {value.split(' ').pop()}
                </span>
            </div>
        )
    }

    return (

        <div className={style.block}>
            <div className={`mb-4`}>
                <div className={style.title}>
                    {name}
                </div>
            </div>
            <div className={`mb-4`}>
                <div className={style.description}>
                    {description}
                </div>
            </div>
            <div className={`mb-4`}>
                <div className={style.banner}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={banner} alt=""/>
                </div>
            </div>
            <div className={`mb-4`}>
                <Title value={`Разработчики проекта`}/>
            </div>
            <div className={`mb-5`}>
                <div className={style.team}>
                    {team.length > 3 && (<div className={style.count}>
                        {`+${team.length - 3}`}
                    </div>)}
                    {team.map((item: {avatar: string, id: number}, index: number) => {
                        if (index < 3) {
                            return (
                                <>
                                    <div className={style.avatar}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.avatar} alt=""/>
                                    </div>
                                </>
                            )
                        }
                    })}
                    <div className={style.addUser}>
                        <PlusSmIcon/>
                    </div>
                </div>
            </div>
            <div className={`mb-4`}>
                <Title value={`Mind Maps проекта(${maps.length})`}/>
            </div>
            <div className={`mb-5`}>
                <div className={style.items}>
                    {
                        <div>

                        </div>
                    }
                    {
                        maps.map((item:{id: number, name: string}, index: number) => (
                            <div key={index} className={style.item}>
                                <Link href={`/`}>
                                    <a>
                                        {item.name}
                                    </a>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={`mb-4`}>
                <Title value={`KanBan boards(${boards.length})`}/>
            </div>
            <div className={`mb-5`}>
                <div className={style.items}>
                    {
                        <div>

                        </div>
                    }
                    {
                        boards.map((item:{id: number, name: string}, index: number) => (
                            <div key={index} className={style.item}>
                                <Link href={`/`}>
                                    <a>
                                        {item.name}
                                    </a>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={`mb-4`}>
                <Title value={`Вложение проекта(${files.length})`}/>
            </div>
            <div className={`mb-5`}>
                <div className={style.items}>
                    {
                        <div>

                        </div>
                    }
                    {
                        files.map((item:{id: number, name: string}, index: number) => (
                            <div key={index} className={style.item}>
                                <Link href={`/`}>
                                    <a>
                                        {item.name}
                                    </a>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>

    );
};

export default PanelInfo;