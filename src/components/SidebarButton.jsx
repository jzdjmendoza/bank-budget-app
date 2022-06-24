import { useState } from "react";

function SidebarButton(props) {
    const { onClick, name } = props
    return (
        <button className="w-40 h-10 my-1 bg-sky-500 hover:bg-sky-700 rounded-md shadow-2xl" id="open-deposit" onClick={onClick}>
            <p className="text-white">{name}</p>
        </button>
    )
}

export default SidebarButton