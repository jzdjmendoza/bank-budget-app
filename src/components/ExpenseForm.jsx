import '../App.css'
import { useContext } from "react";
import { ExpenseContext } from '../contexts/ExpenseContext';
import { FormContext } from '../contexts/FormContext';

const ExpenseForm = (props) => {
    const { handleSubmit, setShowModal } = props
    const { cards } = useContext(ExpenseContext)
    const { title, amount, date, cardNumber, setTitle, setAmount, setDate, setCardNumber } = useContext(FormContext)
    const categories = ['Food', 'Medicine', 'Insurance', 'Mortgage', 'Bills']
    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-pink-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">Add Expense</h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                        <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                            <label className="block text-black text-sm font-bold mb-1">Choose Card:</label>
                            {/* added onChange to dropdown to change local  variable cardNumber to new value */}
                            <select className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange = {(e) => setCardNumber(e.target.value)}>
                                {/* use map to populate dropdown with values from cards array */}
                                { cards.map( (card, index) => (
                                    <option>{card.cardNumber}</option>
                                ))}
                            </select>
                            <label className="block text-black text-sm font-bold mb-1">
                            Amount:
                            </label>
                            {/* added onChange to input to change local variable amount to new value */}
                            <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange = {(e) => setAmount(e.target.value)} />
                            <label className="block text-black text-sm font-bold mb-1">
                            Category:
                            </label>
                            {/* added onChange to input to change local variable amount to new value */}
                            <select className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange = {(e) => setTitle(e.target.value)}>
                                {/* use map to populate dropdown with values from cards array */}
                                { categories.map( (category, index) => (
                                    <option>{category}</option>
                                ))}
                            </select>
                            <label className="block text-black text-sm font-bold mb-1">
                            Date:
                            </label>
                            {/* added onChange to input to change local variable amount to new value */}
                            <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" defaultValue={date} onChange = {(e) => setDate(e.target.value)} />
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
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExpenseForm;