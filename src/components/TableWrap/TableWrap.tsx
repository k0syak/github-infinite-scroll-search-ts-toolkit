import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useInView} from 'react-intersection-observer';
import {selectUsersInfo} from "@features/users";
import {createId} from "@src/utils/createId";
import {IUser} from "@types";
import {TableRow} from "@components";
import styles from "./Table.module.scss";

interface ITableProps {
    users: IUser[],
    fetchFunc: () => void
}

export const TableWrap = (props: ITableProps) => {
    const {users, fetchFunc} = props;
    const {nextPage, totalPages, loading, error} = useSelector(selectUsersInfo);

    const {ref: trInViewRef, inView} = useInView({
        threshold: 0.5,
    });

    useEffect(() => {
        fetchFunc();
    }, [inView]);

    return (
        <div className={styles['table-wrapper']}>
            {
                error && error.length
                    ? (<div className="no-data">{error}</div>)
                    :
                    users.length === 0
                        ? loading ? 'Loading...' : 'Sorry, user not found =('
                        :
                        <>
                            <table className={styles['table']}>
                                <tbody>
                                    <tr>
                                        <th>Avatar</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th></th>
                                    </tr>
                                    {users.map(user => <TableRow key={`${createId(user)}`} user={user}/>)}

                                    {
                                        (!loading && users.length > 15) && (nextPage <= totalPages)
                                            ? (<tr ref={trInViewRef}></tr>)
                                            : ''
                                    }
                                </tbody>
                            </table>
                        </>
            }
        </div>
    )
};
