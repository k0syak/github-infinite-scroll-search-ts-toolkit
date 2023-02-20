import {IPages} from "@types";

const BASE_URL = 'https://randomuser.me/api';

// https://randomuser.me/api/?page=1&results=20
export const getUserPerPage = ({ limit = 10, page = 1}: IPages) => `${BASE_URL}/?page=${page}&results=${limit}`;

