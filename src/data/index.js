import {configureStore} from "@reduxjs/toolkit";
import {userApi} from "./api/UserApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {albumApi} from "./api/AlbumApi";

export const  store = configureStore({
   reducer: {
       [userApi.reducerPath]: userApi.reducer,
       [albumApi.reducerPath]: albumApi.reducer
   },
    middleware: (getDefaultMiddleware) => {
       return getDefaultMiddleware()
           .concat(userApi.middleware)
           .concat(albumApi.middleware);
    }
});

setupListeners(store.dispatch);

export {useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation} from "./api/UserApi";
export {useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} from "./api/AlbumApi";