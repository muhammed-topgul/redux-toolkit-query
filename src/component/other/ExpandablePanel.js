import React, {useState} from 'react';
import {GoChevronLeft} from "react-icons/go";
import {GoChevronDown} from "react-icons/go";

const ExpandablePanel = ({header, children}) => {
    const [expended, setExpended] = useState(false);

    return (
        <div>
            <div className="top-arrangement">
                <div>{header}</div>
                <div
                    style={{cursor: "pointer"}}
                    onClick={() => setExpended(!expended)}>
                    {expended ? (<GoChevronDown/>) : (<GoChevronLeft/>)}
                </div>
            </div>
            {expended && children}
        </div>
    );
};

export default ExpandablePanel;