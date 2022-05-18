import React, {FormEvent, useEffect, useState} from 'react';
import {SearchIcon} from "@heroicons/react/solid";
import style from './index.module.scss';

type ISearch = {
    placeholder: string,
    value?: string,
    onSubmit: (data: string) => void,
}
const Search:React.FC<ISearch> = ({placeholder, value= '', onSubmit}) => {
    const [word, setWord] = useState('');
    const [isDisabled, setIsDisabled] = useState(false)
    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit(word.toLowerCase())
    }
    const handleOnSearch = (event: FormEvent<HTMLInputElement>) => {
        let currencyWord: string = event.currentTarget.value;
        setWord(currencyWord);
    }
    useEffect(() => {
        setWord(value)
    }, [value])
    return (
        <form
            className={style.form}
            onSubmit={event => handleOnSubmit(event)}>
            <button
                disabled={isDisabled}
                type={`submit`}
                className={style.button}>
                <SearchIcon/>
            </button>
            <input
                onChange={event => handleOnSearch(event)}
                className={style.input}
                value={word}
                type="text"
                placeholder={placeholder}/>
        </form>
    );
};

export default React.memo(Search);