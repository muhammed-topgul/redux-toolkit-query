import React from 'react';
import {useFetchAlbumsQuery} from "../../data";

const AlbumList = ({name, userId}) => {
    const {data, isError, isFetching} = useFetchAlbumsQuery(userId);
    return (
        <div>
            {name} Album
            {isFetching || (
                data
            )}
        </div>
    );
};

export default AlbumList;