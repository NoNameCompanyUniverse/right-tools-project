import React, {ReactElement, useState, useEffect} from 'react';
import style from './index.module.scss';
import {motion, AnimatePresence} from "framer-motion";
import {fadeScroll} from "../../motion";

type ITabs = {
    tabs: Array<string>,
    children: ReactElement,
}

const Tabs: React.FC<ITabs> = ({tabs, children}) => {

    const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);
    const [activeTab, setActiveTab] = useState<number>(0);
    // @ts-ignore
    const [state, setState] = useState<Array<any>>(React.Children.toArray(children.props.children))

    const handleOnTab = (data: string, index: number) => {
        setSelectedTab(data);
        setActiveTab(index)
    }
    useEffect(() => {
        setState(React.Children.toArray(children.props.children));
    }, [children])

    return (
        <div>
            <div>
                <ul className={style.tabs}>
                    {
                        tabs.map((tab:string, index: number) => (
                            <li
                                key={index}
                                onClick={() => handleOnTab(tab, index)}>
                                {tab}
                                {
                                    tab === selectedTab && (<motion.div className={style.underline} layoutId="underline"/>)
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={`mt-4`}>
                <AnimatePresence exitBeforeEnter>
                    <motion.div
                        key={selectedTab ? selectedTab : "empty"}
                        variants={fadeScroll}
                        animate={'animate'}
                        initial={'initial'}
                        exit={'exit'}
                        transition={{duration: 0.15}}
                    >
                        {state[activeTab]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Tabs;