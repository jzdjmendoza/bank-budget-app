import { useState } from "react";

function DepositButton(props) {
    const { onClick } = props
    return (
        <button className="p-5 bg-sky-500 hover:bg-sky-700 rounded-md shadow-2xl" id="open-deposit" onClick={onClick}>
            <p className="text-white">Deposit</p>
        </button>
    )
}

export default DepositButton