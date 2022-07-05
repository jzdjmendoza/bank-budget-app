import { useState } from "react";

function SidebarButton(props) {
    const { onClick, name } = props
    return (
        <button className="w-96 h-10 mb-3 uppercase font-bold bg-indigo-500 hover:bg-indigo-700 shadow-lg shadow-indigo-500/50 rounded-md" id="open-deposit" onClick={onClick}>
            <p className="text-white">{name}</p>
        </button>
    )
}

export default SidebarButton