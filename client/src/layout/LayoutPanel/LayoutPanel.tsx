import React, {useState} from 'react';
import Head from 'next/head';
import style from '../../components/layout/index.module.scss';
import TodayDate from "../../components/Panel/TodayDate";
import Link from 'next/link';
import {UserIcon, UserGroupIcon, CollectionIcon, LogoutIcon, MenuAlt1Icon} from "@heroicons/react/outline";
import Layout from "../../components/layout";

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
                <Layout>
                    {children}
                </Layout>
            </div>
        </>
    );
};

export default LayoutPanel;