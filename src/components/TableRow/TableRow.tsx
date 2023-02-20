import {IUser} from "@types";
import {useAppDispatch} from "@src/store";
import {userSlice} from "@features/users";
import styles from "./TableRow.module.scss";

interface ITableRowProps {
    user: IUser
}

export const TableRow = (props: ITableRowProps) => {
    const {addCurrentUser} = userSlice.actions;
    const dispatch = useAppDispatch();

    const {name, picture, gender} = props.user;
    const fullName = name.first + ' ' + name.last;

    return (
        <tr className={styles.tableRow}>
            <td data-label="Avatar"><img src={picture && picture.thumbnail} alt={fullName}/></td>
            <td data-label="Name"><strong>{fullName}</strong></td>
            <td data-label="Gender"><p>{gender}</p></td>
            <td>
                <button className={'button'} onClick={() => dispatch(addCurrentUser(props.user))}>read more</button>
            </td>
        </tr>
    )
};
