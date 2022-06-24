import React from 'react';
import {ISubdivision} from "../../types/ISubdivision";
import style from './index.module.scss';

interface ISubdivisionTree {
    props: ISubdivision,
    isChecked: number,
    onChecked: (id:number, name: string) => void
}

const SubdivisionTree: React.FC<ISubdivisionTree> = ({props, isChecked, onChecked}) => {
    const {id, name, children, level} = props;
    const hasChildren = children && children.length > 0;

    return (
        <>
            <div className={'ms-3'}>


                    <label>
                        <input onChange={() => onChecked(id, name)} checked={id === isChecked} type="checkbox"/>
                    </label>
                    {name}
                    {hasChildren && children.map((i:ISubdivision) => (
                        <SubdivisionTree key={i.id} onChecked={onChecked} isChecked={isChecked} props={i}/>
                    ))}

            </div>
        </>
    )

};


export default SubdivisionTree;