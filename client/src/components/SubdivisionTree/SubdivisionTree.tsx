import React from 'react';
import {ISubdivision} from "../../types/ISubdivision";
import style from './index.module.scss';

interface ISubdivisionTree {
    props: ISubdivision,
    isChecked: number,
    onChecked: (id: number, name: string) => void
}

const SubdivisionTree: React.FC<ISubdivisionTree> = ({props, isChecked, onChecked}) => {
    const {id, name, children, level} = props;
    const hasChildren = children && children.length > 0;

    return (
        <>
            <div className={style.checkboxGroup}>
                <label className={style.label}>
                    <input
                        onChange={() => onChecked(id, name)}
                        checked={id === isChecked}
                        type="checkbox"/>
                    <span className={style.checkbox}>
                        <span className={style.check}/>
                    </span>
                    {name}
                </label>
                <div className={'ms-3'}>
                    {hasChildren && children.map((i: ISubdivision) => (
                        <SubdivisionTree key={i.id} onChecked={onChecked} isChecked={isChecked} props={i}/>
                    ))}
                </div>


            </div>
        </>
    )

};


export default SubdivisionTree;