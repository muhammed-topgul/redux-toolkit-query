import React from 'react';
import {useAddUserMutation, useFetchUsersQuery} from "../../data";
import {Button, CircularProgress, Skeleton} from "@mui/material";
import UserItem from "./UserItem";

const UserList = () => {
    const {data, isError, isFetching} = useFetchUsersQuery();
    const [addUser, results] = useAddUserMutation();

    let content;
    if (isFetching) {
        content = <Skeleton variant="rectangular" sx={{width: "100%", height: "600px"}}/>
    } else if (isError) {
        content = <div>Error</div>
    } else {
        content = data.map(user => {
            return <UserItem key={user.id} {...user}/>
        });
    }

    const onAddUser = () => {
        addUser();
    }

    return (
        <div>
            <div className="top-bar">
                <h3>Users</h3>
                <Button
                    variant="outlined"
                    onClick={onAddUser}>
                    {results.isLoading ? (
                        <CircularProgress/>
                    ) : <span>Add User+</span>}
                </Button>
            </div>
            {content}
        </div>
    );
};

export default UserList;