import React from 'react';
import style from './index.module.scss';

interface IFormInput {
    placeholder?: string,
    value: string,
    setValue: (value: string, name: string) => void,
    name?: string,
    type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'date',
    required?: boolean,
    readonly?: boolean
}

const FormInput:React.FC<IFormInput> = (
    {
        placeholder= '',
        setValue,
        value,
        name= '',
        type = 'text',
        required = true,
        readonly = false
    }) => {

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value, name);


    return (
        <div className={style.container}>
            <input
                readOnly={readonly}
                onChange={handleOnChange}
                type={type}
                name={name}
                value={value}
                className={[style.control, value && value.length > 0 ? style.focus : ''].join(" ")}
                required={required}/>
            <span className={style.label}>{placeholder}</span>
        </div>
    );
};

export default React.memo(FormInput);