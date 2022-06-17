import React, {useState} from 'react';
import style from './index.module.scss';


interface ICheckBoxTree {
    props: {
        id: number,
        children: any[],
        name: string,
        level: number
    },
    onChecked: (id: number) => void
}

const CheckBoxTree:React.FC<ICheckBoxTree> = ({props, onChecked}) => {

    const hasChildren = props.children && props.children.length;
    const [check, setCheck] = useState(false);


    return (
        <div>

        </div>
    );
};

export default CheckBoxTree;