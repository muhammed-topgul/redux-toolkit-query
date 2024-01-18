import {configureStore} from "@reduxjs/toolkit";
import {userApi} from "./api/UserApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const  store = configureStore({
   reducer: {
       [userApi.reducerPath]: userApi.reducer
   },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware().concat(userApi.middleware);
    }
});

setupListeners(store.dispatch);

export {useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation} from "./api/UserApi";