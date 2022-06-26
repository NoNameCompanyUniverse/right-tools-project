import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {PageTransition} from "../../motion";
import Title from "../../components/Panel/Title";
import StatisticsCard from "../../components/Panel/StatisticsCard";
import SkeletonProject from "../../components/Skeleton/SkeletonProject";
import {IProject} from "../../types/IProject";
import ProjectCard from "../../components/Cards/ProjectCard/ProjectCard";
import Link from "next/link";
import SkeletonProfile from "../../components/Skeleton/SkeletonProfile";
import {motion} from "framer-motion";
import {getUser, getUserInfo, getUserProjects} from "../../redux/actions/UserAction";
import User from '../../components/Panel/User';
import {useRouter} from "next/router";

const UserPage = () => {

    const {data: session} = useSession()
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {profile, info, projects, loading} = useAppSelector(state => state.userSlice)


    useEffect(() => {
        if (!router.isReady) return;
        //@ts-ignore
        const token: string = session?.accessToken;
        // @ts-ignore
        const id: number = router.query.user;
        dispatch(getUser({token, id}));
        dispatch(getUserInfo({token, id}));
        dispatch(getUserProjects({token, id}))
    }, [dispatch])

    return (
        <>
            <motion.div
                variants={PageTransition}
                initial={`initial`}
                animate={'animate'}>
                <div className="row">
                    <div className="col-xl">
                        <div className="row mb-3 gx-3">
                            <div className="col-sm-4">
                                <StatisticsCard
                                    title={`Количество сотрудников`}
                                    count={info.users}
                                    description={`Количество сотрудников в вашей корпоративной среде`}
                                    background={'#868974'}
                                />
                            </div>
                            <div className="col-sm-4">
                                <StatisticsCard
                                    title={`Количество проектов вашим участием`}
                                    count={info.projects_with_me}
                                    description={`Количество проектов в которых вы принимаете участие`}
                                    background={`#F0B878`}
                                />
                            </div>
                            <div className="col-sm-4">
                                <StatisticsCard
                                    title={`Количество ваших проектов`}
                                    count={info.projects_admin}
                                    description={`Количество ваших личных проектов`}
                                    background={`#8E9993`}
                                />
                            </div>
                        </div>
                        <div>
                            <Title value={'Проекты пользователя'}/>
                        </div>
                        <div className="row my-5 gx-4">
                            {
                                loading === 'PENDING' ? [...new Array(3)].map((_, index) => (
                                    <div key={index} className="col-xxl-4 col-lg-6 mb-4">
                                        <SkeletonProject/>
                                    </div>
                                )) : loading === 'FULFILLED' ? Array.isArray(projects) && projects.length > 0 ? projects
                                        .map((i: IProject, index) => (
                                            <div key={index} className="col-xxl-4 col-lg-6 mb-4">
                                                <ProjectCard data={i} root={profile ? profile.id : 0}>
                                                    <ul>
                                                        <li>
                                                            <Link href={`/project/${i.id}`}>
                                                                <a>
                                                                    Подробнее
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </ProjectCard>
                                            </div>
                                        )) : <>Нет проектов</>
                                    : <>Ошибка загрузки</>
                            }
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className={`mb-3`}>
                            {
                                profile ? (
                                    <User data={profile}/>
                                ) : <SkeletonProfile/>
                            }
                        </div>

                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default UserPage;