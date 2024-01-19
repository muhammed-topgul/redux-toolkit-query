import {createApi} from '@reduxjs/toolkit/query/react'
import {fetchBaseQuery} from '@reduxjs/toolkit/query'
import {faker} from "@faker-js/faker";

const pause = (duration) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

const albumApi = createApi({
    reducerPath: "albums",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000",
        fetchFn: async (...args) => {
            await pause(250);
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        fetchAlbums: builder.query({
            providesTags: (result, error, userId) => {
                const tags = [];
                result.forEach((album) => {
                    tags.push({type: "UserAlbums", id: userId});
                })
                tags.push({type: "UserAlbums", id: userId});
                return tags;
            },
            query: (userId) => {
                return {
                    url: "/albums",
                    method: "GET",
                    params: {
                        userId: userId
                    }
                }
            }
        }),
        addAlbum: builder.mutation({
            invalidatesTags: (result, error, userId) => {
                return [
                    {
                        type: "UserAlbums",
                        id: userId
                    }
                ];
            },
            query: (userId) => {
                return {
                    url: "/albums",
                    method: "POST",
                    body: {
                        userId: userId,
                        title: faker.commerce.productName()
                    }
                }
            }
        }),
        removeAlbum: builder.mutation({
            invalidatesTags: (result, error, id) => {
                return [
                    {
                        type: "Album",
                        id: id
                    }
                ];
            },
            query: (id) => {
                return {
                    url: `/albums/${id}`,
                    method: "DELETE",
                }
            }
        })
    })
});

export const {useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} = albumApi;
export {albumApi};