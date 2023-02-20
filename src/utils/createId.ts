import {IUser} from "@types";

export const createId = (user: IUser): string => {
    const newId = user.phone + user.cell;

    return newId.replace(/ /g,"_");
};