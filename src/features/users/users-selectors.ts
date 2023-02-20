import {RootState} from "store";

export const selectUsersInfo = (state: RootState) => ({
    status: state.users.status,
    loading: state.users.loading,
    error: state.users.error,
    limit: state.users.limit,
    totalCount: state.users.totalCount,
    totalPages: state.users.totalPages,
    nextPage: state.users.nextPage,
    list: state.users.list,
    currentUser: state.users.currentUser,
});
