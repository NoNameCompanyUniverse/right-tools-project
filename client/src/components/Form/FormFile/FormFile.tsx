import React, {useEffect, useState} from 'react';
import style from './index.module.scss';
import {CloudUploadIcon} from "@heroicons/react/outline";

interface IFormBanner {
    value: string,
    name: string,
    onFile: (data: any, name: string) => void,
    rounded?: boolean,
}

const FormFile: React.FC<IFormBanner> = ({value, onFile, name, rounded= false}) => {

    const [state, setState] = useState({
        value: '',
        file: null
    })

    const handleOnChange = (event: any) => {
        const reader: any = new FileReader();
        const file: any = event.target.files[0];
        reader.onload = () => {
            reader.readyState
                ? setState({value: reader.result, file: file})
                : '';
            onFile({
                value: reader.result,
                file: file
            }, name);
        }
        file ? reader.readAsDataURL(file) : '';
    }

    useEffect(() => {
        value ? setState(state => ({...state, value: value})) : '';
    }, [value])

    useEffect(() => {console.log(state)}, [state])

    return (
        <div className={[style.container, rounded && style.rounded].join(" ")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {(state.value && state.value !== '') && <img src={state.value} alt=""/>}
            <div
                className={[style.body, 'd-flex', 'align-items-center', 'justify-content-center'].join(" ")}>
                <label>
                    <input type="file"
                           onChange={event => handleOnChange(event)}
                           name={name}
                           accept={"image/*"}
                           className={['d-none'].join(" ")}/>
                </label>
                <span className={[style.icon].join(" ")}>
                    <CloudUploadIcon/>
                </span>
            </div>
        </div>
    );
};

export default FormFile;