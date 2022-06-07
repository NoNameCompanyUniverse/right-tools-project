import React from 'react';
import style from './index.module.scss';

interface IFormInput {
    placeholder?: string,
    value: string,
    setValue: (value: string, name: string) => void,
    name?: string,
    type?: 'text' | 'email' | 'tel' | 'number' | 'password'
}

const FormInput:React.FC<IFormInput> = (
    {
        placeholder= '',
        setValue,
        value,
        name= '',
        type = 'text',
    }) => {

    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value, name)


    return (
        <>
            <input
                onChange={handleOnChange}
                placeholder={placeholder}
                type={type}
                name={name}
                value={value}
                className={style.control}/>
        </>
    );
};

export default React.memo(FormInput);