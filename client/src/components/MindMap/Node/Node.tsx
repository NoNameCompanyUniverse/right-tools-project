import React from 'react';
import {Handle, Position} from 'react-flow-renderer';
import {AdjustmentsIcon} from "@heroicons/react/solid";
import {motion} from "framer-motion";

import style from './index.module.scss';
import {INode} from "../../../types/INode";


const Node: React.FC<{ data: INode}> = ({data}) => {

const {label, description, type, id} = data;


    return (
        <motion.div className={[style.container, style[type]].join(" ")} whileHover={{scale: 1.03}}>
            {
                type === 'source' ? (
                    <>
                        <Handle
                            type="source"
                            onConnect={(params) => console.log('handle onConnect', params)}
                            position={Position.Right}/>
                    </>
                ) : type === 'target' ? (
                    <>
                        <Handle
                            type="target"
                            position={Position.Left}
                            onConnect={(params) => console.log('handle onConnect', params)}
                        />
                    </>
                ) : (
                    <>
                        <Handle
                            type="source"
                            position={Position.Right}
                            onConnect={(params) => console.log('handle onConnect', params)}
                        />
                        <Handle
                            type="target"
                            position={Position.Left}
                            onConnect={(params) => console.log('handle onConnect', params)}
                        />

                    </>
                )
            }
            <h3>{label}</h3>
            {
                description.length > 0 && (
                    <p>{description}</p>
                )
            }
        </motion.div>
    );
};

export default Node;