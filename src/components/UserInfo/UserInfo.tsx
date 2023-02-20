import {IUser} from "@types";
import styles from "./UserInfo.module.scss";

interface IUserInfoProps {
    user: IUser
}

export const UserInfo = (props: IUserInfoProps) => {
    const {name, picture, email, phone, nat} = props.user;
    const fullName = name.first + ' ' + name.last;

    return (
        <div className={styles['user-info']}>
            <h2>User Information</h2>
            <img src={picture && picture.large} alt={fullName}/>
            <h3>{name.title} {fullName}</h3>
            <ul>
                <li><span>National:</span> {nat}</li>
                <li><span>Phone:</span> <a href={`tel:${phone}`}>{phone}</a></li>
                <li><span>Email:</span> <a href={`mailto:${email}`}>{email}</a></li>
            </ul>
        </div>
    )
};
