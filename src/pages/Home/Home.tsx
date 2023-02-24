import React, {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@src/store";
import {selectUsersInfo, useUsers, removeCurrentUser} from "@features/users";
import {Modal, Search, TableWrap, UserInfo} from "@components";
import styles from "./Home.module.scss";

export const Home = () => {
    const dispatch = useAppDispatch();
    const [fetchItems] = useUsers();
    const {list, nextPage, totalPages, limit, currentUser} = useSelector(selectUsersInfo);
    const [open, setOpen] = useState(false);

    const fetchData = useCallback(() => {
        const shouldBeRestricted = totalPages === 0 ? true : nextPage <= totalPages;

        if (shouldBeRestricted) {
            fetchItems(limit, nextPage);
        }
    }, [nextPage]);

    useEffect(() => {
        if (currentUser !== null) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [currentUser])

    return (
        <div className={styles.home}>
            <div className={styles['home__container']}>
                <div className={styles.navbar}>
                    <strong className={styles.logo}>Project Logo</strong>
                    <Search fetchFunc={fetchData}/>
                </div>
                <TableWrap users={list} fetchFunc={fetchData}/>
            </div>
            <Modal isOpen={open} onClose={() => dispatch(removeCurrentUser())}>
                {currentUser
                    ? <UserInfo user={currentUser}/>
                    : ''
                }
            </Modal>
        </div>
    )
};
