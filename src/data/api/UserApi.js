import {createApi} from '@reduxjs/toolkit/query/react'
import {fetchBaseQuery} from '@reduxjs/toolkit/query'
import {faker} from "@faker-js/faker";

const pause = (duration) => {
    return new Promise(resolve => {
       setTimeout(resolve, duration);
    });
}

const userApi = createApi({
    reducerPath: "users",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async(...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            providesTags: ['User'],
            query: () => {
                return {
                    url: "/users",
                    method: "GET"
                }
            }
        }),
        addUser: builder.mutation({
            invalidatesTags: () => {
               return [{type: "User"}];
            },
            query: () => {
                return {
                    url: "/users",
                    method: "POST",
                    body: {
                        name: faker.person.fullName()
                    }
                }
            }
        }),
        removeUser: builder.mutation({
            invalidatesTags: () => {
                return [{type: "User"}];
            },
            query: (user) => {
                return {
                    url: `/users/${user.id}`,
                    method: "DELETE",
                }
            }
        })
    })
});

export const {useFetchUsersQuery, useAddUserMutation, useRemoveUserMutation} = userApi;
export {userApi};