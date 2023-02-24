import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch} from "@src/store";
import {searchUserByName, clearUserList} from "@features/users";
import {debounce} from "@src/utils";
import styles from "./Search.module.scss";

interface ISearchProps {
    fetchFunc: () => void
}

export const Search = ({fetchFunc}: ISearchProps) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setValue(value);
        updateSearchValue(value);
    }, []);

    const updateSearchValue = useCallback(debounce((str: string) => {
        setSearchQuery(str);
    }), [])

    useEffect(() => {
        if (searchQuery.length >= 3) {
            dispatch(searchUserByName(searchQuery))
        } else if (searchQuery.length === 0) {
            dispatch(clearUserList())
            fetchFunc();
        }
    }, [searchQuery]);

    return <input
        className={styles.search}
        name="search"
        type="search"
        placeholder="Search by name..."
        value={value}
        onChange={handleChange}
    />
};
