import { useState } from "react";
import SidebarButton from "./SidebarButton";

function WithdrawModal(props) {
    const [showModal, setShowModal] = useState(false)
    const [amount, setAmount ] = useState(0)
    const { userCard: { cardNumber, balance }, setCard } = props
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const withdrawMoney = () => {
        let updatedValue = {}
        updatedValue = { balance: parseFloat(balance) - parseFloat(amount) }
        setCard( card => ({
            ...card,
            ...updatedValue,
        }));
        setShowModal(false)
    }
    return (
        <>
            <SidebarButton onClick = {toggleModal} showModal = {showModal} name='Withdraw' />

            {showModal ?
                (<>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                <h3 className="text-3xl font=semibold">How much would you like to withdraw?</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">
                                        To:
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" placeholder={cardNumber}/>
                                        <label className="block text-black text-sm font-bold mb-1">
                                        From:
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                        <label className="block text-black text-sm font-bold mb-1">
                                        Amount:
                                        </label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange = {(e) => setAmount(e.target.value)} />
                                    </form>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="text-white bg-pink-700 active:bg-violet-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={withdrawMoney}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
            : null}
        </>
    )
}

export default WithdrawModal