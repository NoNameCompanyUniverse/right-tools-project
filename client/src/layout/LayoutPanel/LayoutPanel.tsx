import React, {useState} from 'react';
import Head from 'next/head';
import style from './index.module.scss';
import TodayDate from "../../components/Panel/TodayDate";


type ILayoutPanel = {
    title: string,
}


const LayoutPanel: React.FC<ILayoutPanel> = (
    {
        children,
        title,
    }) => {


    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <div className={style.aside}>
                    <div className="d-flex flex-column" style={{'height': '100%'}}>
                        <div className="mb-4">

                        </div>
                        <div className="flex-grow-1">

                        </div>
                        <div className="mt-3">

                        </div>
                    </div>
                </div>
                <div className={style.main}>
                    <TodayDate/>
                    {
                        children
                    }
                </div>
            </div>
        </>
    );
};

export default LayoutPanel;