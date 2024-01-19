import React from 'react';
import ExpandablePanel from "../other/ExpandablePanel";
import AlbumList from "../album/AlbumList";
import {GoTrash} from "react-icons/go";
import {useRemoveUserMutation} from "../../data";
import {CircularProgress} from "@mui/material";

const UserItem = ({name, id}) => {
    const [removeUser, results] = useRemoveUserMutation();

    const onRemoveClick = () => {
        removeUser(id);
    }

    const header = (name) => (
        <>
            <button
                style={{
                    marginRight: "30px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer"
                }}
                onClick={onRemoveClick}>
                {results.isLoading ? (<CircularProgress/>) : (<GoTrash/>)}
            </button>
            {name}
        </>
    )

    return (
        <div className="panel-div">
            <ExpandablePanel header={header(name)}>
                <AlbumList name={name} userId={id}/>
            </ExpandablePanel>
        </div>
    );
};

export default UserItem;