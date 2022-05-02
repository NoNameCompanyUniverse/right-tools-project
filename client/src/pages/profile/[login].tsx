import React, {ReactElement} from 'react';
import LayoutPanel from "../../layout/LayoutPanel";
import Title from "../../components/Panel/Title";
import StatisticsCard from "../../components/Panel/StatisticsCard";
import User from "../../components/Panel/User";


const user = {
    firstname: 'Sergey',
    lastname: 'Maksimov',
    login: '_l0stvayne_',
    email: 'sergey.maksimov2000@gmail.com',
    tel: '+7 (903) 869-48-67',
    status: 'Front-end developer',
    avatar: '/profile/user.PNG',
    banner: '/profile/user-banner.jpg'
}

const Profile = () => {
    return (
        <>
            <div className="row">
                <div className="col-xl">
                    <Title value={'С возвращением в RightTool'}/>
                    <div className="row my-5 gx-3">
                        <div className="col-xl-4">
                            <StatisticsCard
                                title={`Количество сотрудников`}
                                count={56}
                                description={`Количество индивидуальных людей которое задействовано во всех проектах с вашим участием`}
                                background={'#868974'}
                            />
                        </div>
                        <div className="col-xl-4">
                            <StatisticsCard
                                title={`Количество проектов вашим участием`}
                                count={17}
                                description={`Количество проектов в которых вы принимаете участие`}
                                background={`#F0B878`}
                            />
                        </div>
                        <div className="col-xl-4">
                            <StatisticsCard
                                title={`Количество ваших проектов`}
                                count={25}
                                description={`Количество ваших личных проектов`}
                                background={`#8E9993`}
                            />
                        </div>
                    </div>
                </div>
                <User
                    firstname={user.firstname}
                    status={user.status}
                    login={user.login}
                    avatar={user.avatar}
                    banner={user.banner}
                    email={user.email}
                    lastname={user.lastname}
                    tel={user.tel}
                />
            </div>
        </>
    );
};

Profile.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutPanel title={'Личный кабинет'}>
            {page}
        </LayoutPanel>
    )
}

export default Profile;