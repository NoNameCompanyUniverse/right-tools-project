import React from 'react';
import style from './index.module.scss';


interface IFormTextarea {
    placeholder?: string,
    value: string,
    setValue: (value: string, name: string) => void,
    name?: string,
    maxLength?: number,
    rows?: number
}

const FormTextarea:React.FC<IFormTextarea> = (
    {
        placeholder= '',
        maxLength,
        value,
        name = '',
        setValue,
        rows = 5
    }) => {

    const handleOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        const value: string = e.currentTarget.value;
        maxLength ? setValue(value.slice(0, maxLength), name) : setValue(value, name);
    }

    return (
        <>
           <div className={style.container}>
                <textarea
                    className={style.control}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleOnChange}
                    name={name}
                    rows={rows}
                />
               {
                   value && maxLength && (
                       <span className={style.count}>
                           {value.length}/{maxLength}
                       </span>
                   )
               }
           </div>
        </>
    );
};

export default React.memo(FormTextarea);