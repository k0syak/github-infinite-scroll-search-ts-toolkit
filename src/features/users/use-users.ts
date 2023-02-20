import {useCallback} from 'react';
import {useAppDispatch} from "store";
import {loadUsers} from './';

type IFetchItems = (nextLimit: number, nextPage: number) => void;
type IUsePosts = [IFetchItems];

export const useUsers = (): IUsePosts => {
    const dispatch = useAppDispatch();

    const fetchItems = useCallback((nextLimit: number, nextPage: number) => {
            dispatch(loadUsers({limit: nextLimit, page: nextPage}));
        }, [dispatch]
    );

    return [fetchItems]
};