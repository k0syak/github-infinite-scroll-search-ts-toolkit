import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, IExtra, IStatus, StatusEnum} from "types";

interface IUsersThunkPayload {
    page: number;
    limit: number;
}

interface IPostsThunkResponse {
    data: { results: IUser[] };
}

interface IPostsThunkApiOptions {
    state: { users: IUsersSlice };
    extra: IExtra;
    rejectValue: string;
}

export const loadUsers = createAsyncThunk<IPostsThunkResponse, IUsersThunkPayload, IPostsThunkApiOptions>(
    '@@users/load-users',
    async (settings, {extra: {client, api}, rejectWithValue,}) => {
        try {
            return await client.get(api.getUserPerPage(settings));
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message)
            }
            return rejectWithValue('Unknown error <@@countries/load-countries>')
        }
    },
    {
        condition: (_, {getState}) => {
            const {users: {status}} = getState();

            if (status === StatusEnum.PENDING) {
                return false;
            }
        }
    }
);

type IUsersSlice = {
    status: IStatus,
    loading: boolean,
    error: string | null,
    totalCount: number,
    totalPages: number,
    nextPage: number,
    limit: number,
    list: IUser[],
    currentUser: IUser | null,
}

const initialState: IUsersSlice = {
    status: 'idle',
    loading: false,
    error: null,
    totalCount: 100,
    totalPages: 0,
    nextPage: 1,
    limit: 20,
    list: [],
    currentUser: null,
}

export const userSlice = createSlice({
    name: '@@users',
    initialState,
    reducers: {
        searchUserByName(state, action: PayloadAction<string>) {
            const query = action.payload.toLowerCase();
            state.nextPage = 1;

            state.list = state.list.filter(user =>
                user.name.first.toLowerCase().includes(query)
                || user.name.last.toLowerCase().includes(query)
            );
        },
        clearUserList(state) {
            state.list = []
        },
        addCurrentUser(state, action: PayloadAction<IUser>) {
            state.currentUser = action.payload;
        },
        removeCurrentUser(state) {
            state.currentUser = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadUsers.pending, (state) => {
                state.status = StatusEnum.PENDING;
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUsers.rejected, (state, action) => {
                state.status = StatusEnum.REJECTED;
                state.loading = false;
                state.error = action.payload || 'Cannot load data';
            })
            .addCase(loadUsers.fulfilled, (state, action) => {
                state.status = StatusEnum.FULFILLED;
                state.totalPages = state.totalCount / state.limit;
                state.nextPage += 1;
                state.list.push(...action.payload.data.results);
                state.loading = false;
            })
    },
});

export const {searchUserByName, clearUserList, addCurrentUser, removeCurrentUser} = userSlice.actions;
export const usersReducer = userSlice.reducer;
