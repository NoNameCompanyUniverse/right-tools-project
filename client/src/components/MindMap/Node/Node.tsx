import React from 'react';
import {Handle, Position} from 'react-flow-renderer';
import {XIcon} from "@heroicons/react/outline";

import style from './index.module.scss';


type INode = {
    label: string,
    description?: string,
    type: 'source' | 'target' | 'default'
}

const Node: React.FC<{ data: INode }> = ({data}) => {

    const {label, description, type} = data;


    return (
        <div className={`${style.container} ${style[type]}`} >
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
            <button type={"button"} className={style.close}>
                <XIcon/>
            </button>
            <h3>{label}</h3>
            {
                description && (
                    <p>{description}</p>
                )
            }
        </div>
    );
};

export default Node;