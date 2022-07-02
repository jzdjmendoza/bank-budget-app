import '../App.css'
import { useState, useContext } from "react";
import { ExpenseContext } from '../contexts/ExpenseContext';
import { EditFormContext } from '../contexts/EditFormContext';

const EditModal = (props) => {
    const { showModal, setShowModal, id, title, setTitle, amount, setAmount, date, setDate, cardNumber, setCardNumber } = useContext(EditFormContext)
    const { cards, setCards, expenses, setExpenses } = useContext(ExpenseContext)

    const categories = ['Food', 'Medicine', 'Insurance', 'Mortgage', 'Bills']

    const handleSubmit = () => {
        const oldExpense = expenses.find(exps => exps.id === id)
        const newExpense = { id: id, title: title, cost: amount, cardNumber: cardNumber, date: date }
        const newCards = [...cards];

        // update card balance
        if(oldExpense.cardNumber != newExpense.card){
            const oldCard = newCards.find(card => card.cardNumber === oldExpense.cardNumber);
            const newCard = newCards.find(card => card.cardNumber === newExpense.cardNumber);

            newCard.balance = parseFloat(newCard.balance) - parseFloat(amount);
            oldCard.balance = parseFloat(oldCard.balance) + parseFloat(oldExpense.cost);
        } else {
            const card = newCards.find(card => card.cardNumber === oldExpense.cardNumber);
            const costDifference = parseFloat(amount) - parseFloat(oldExpense.cost);

            card.balance = parseFloat(card.balance) - costDifference;
        }

         // update cards using useState function of the cards array
        setCards(newCards)
        localStorage.setItem('cards', JSON.stringify(newCards))
        
        // update expenses
        setExpenses(existingExpenses => {
            const itemIndex = existingExpenses.findIndex(item => item.id === id)
            return [
                ...existingExpenses.slice(0, itemIndex),
                newExpense,
                ...existingExpenses.slice(itemIndex + 1),
            ]
        })
        setShowModal(false)
    }
    return (
        <>
            {showModal ?
                (<>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-pink-300 rounded-t ">
                                <h3 className="text-3xl font=semibold">Edit Expense</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">From:</label>
                                        {/* added onChange to dropdown to change local  variable cardNumber to new value */}
                                        <select className="shadow appearance-none border rounded w-full py-2 px-1 text-black" defaultValue={cardNumber} onChange = {(e) => setCardNumber(e.target.value)}>
                                            {/* use map to populate dropdown with values from cards array */}
                                            { cards.map( (card, index) => (
                                                 <option key={index} value={card.cardNumber}>{card.cardNumber}</option>
                                            ))}
                                        </select>
                                        <label className="block text-black text-sm font-bold mb-1">
                                        Amount:
                                        </label>
                                        {/* added onChange to input to change local variable amount to new value */}
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" defaultValue={amount} onChange = {(e) => setAmount(e.target.value)} />
                                        <label className="block text-black text-sm font-bold mb-1">
                                        Category:
                                        </label>
                                        {/* added onChange to input to change local variable amount to new value */}
                                        <select className="shadow appearance-none border rounded w-full py-2 px-1 text-black" defaultValue={title} onChange = {(e) => setTitle(e.target.value)}>
                                            {/* use map to populate dropdown with values from cards array */}
                                            { categories.map( (category, index) => (
                                                <option key={index} value={category}>{category}</option>
                                            ))}
                                        </select>
                                        <label className="block text-black text-sm font-bold mb-1">
                                        Date:
                                        </label>
                                        {/* added onChange to input to change local variable amount to new value */}
                                        <input type='date' className="shadow appearance-none border rounded w-full py-2 px-1 text-black" defaultValue={date} onChange = {(e) => setDate(e.target.value)} />
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
                </>)
            : null}
        </>
    )
}

export default EditModal;