import React from 'react';
import {Handle, Position} from 'react-flow-renderer';
import {AdjustmentsIcon} from "@heroicons/react/solid";
import {motion} from "framer-motion";

import style from './index.module.scss';
import {INodeData} from "../../../types/INode";



const Node: React.FC<{ data: INodeData}> = ({data}) => {

const {name, description, type, id} = data;


    return (
        <motion.div className={[style.container, style[type]].join(" ")}>
            {
                type === 'source' ? (
                    <>
                        <Handle
                            className={style.handle}
                            type="source"
                            //onConnect={(params) => console.log('handle onConnect', params)}
                            position={Position.Right}/>
                    </>
                ) : type === 'target' ? (
                    <>
                        <Handle
                            className={style.handle}
                            type="target"
                            position={Position.Left}
                           // onConnect={(params) => console.log('handle onConnect', params)}
                        />
                    </>
                ) : (
                    <>
                        <Handle
                            className={style.handle}
                            type="source"
                            position={Position.Right}
                            //onConnect={(params) => console.log('handle onConnect', params)}
                        />
                        <Handle
                            className={style.handle}
                            type="target"
                            position={Position.Left}
                            //onConnect={(params) => console.log('handle onConnect', params)}
                        />

                    </>
                )
            }
            <h3>{name}</h3>
            {
                description && (
                    <p>{description}</p>
                )
            }
        </motion.div>
    );
};

export default Node;