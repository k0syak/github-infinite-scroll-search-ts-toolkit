import axios from 'axios';
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";

import * as api from 'api-config';
import {usersReducer} from 'features/users/users-slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware => getDefaultMiddleware ({
    thunk: {
      extraArgument: {
        client: axios,
        api,
      },
    },
    serializableCheck: false
  }))
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
