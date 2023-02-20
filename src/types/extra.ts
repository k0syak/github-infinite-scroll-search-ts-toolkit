import {Axios} from "axios";
import * as API from "api-config";

export type IExtra = {
    client: Axios,
    api: typeof API,
}