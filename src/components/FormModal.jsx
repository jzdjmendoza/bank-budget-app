import { useState, useContext } from "react";
import SidebarButton from "./SidebarButton";
import ExpenseForm from "./ExpenseForm";
import { ExpenseContext } from '../contexts/ExpenseContext';
import { FormContext } from '../contexts/FormContext';

function FormModal(props) {
    // original cards and setCards variables/functions
    const { type } = props
    const { cards, setCards, expenses, transactions, setExpenses, setTransactions  } = useContext(ExpenseContext)
    const { categories, amount, cardNumber, title, date, setCardNumber, setAmount, setTitle, setDate } = useContext(FormContext)
    const [ showModal, setShowModal ] = useState(false)

    // toggling modal
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const addExpense = () => {
        const newExpenses = [...expenses]
        const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1
        newExpenses.push({ id: id, title: title, cost: amount, date: date, cardNumber: cardNumber });
        setExpenses(newExpenses);
        localStorage.setItem('expenses', JSON.stringify(newExpenses))
    }

    const addTransaction = (balance) => {
        const newTransactions = [...transactions]
        newTransactions.push({ type: type.split(/(?=[A-Z])/).join(' '), amount: amount, date: new Date().toLocaleDateString('en-CA'), account: cardNumber, runningBalance: balance });
        setTransactions(newTransactions);
        localStorage.setItem('transactions', JSON.stringify(newTransactions))
    }

    const handleSubmit = () => {
        // first, get a copy of current state of cards array
        const newCards = [...cards];

        // find the card selected in the dropdown from the cards array
        const card = newCards.find(card => card.cardNumber === cardNumber)

        // compute for the new balance
        // used parseFloat to parse input to make sure decimal is included
        switch(type) {
            case 'deposit':
                card.balance = parseFloat(card.balance) + parseFloat(amount)
                break;
            case 'withdraw':
                card.balance = parseFloat(card.balance) - parseFloat(amount)
                break;
            case 'sendMoney':
                card.balance = parseFloat(card.balance) - parseFloat(amount)
                break;
            case 'expense':
                card.balance = parseFloat(card.balance) - parseFloat(amount)
                addExpense();
                break;
        }

        if(type != 'expense') addTransaction(card.balance);
        // update cards using useState function of the cards array
        setCards(newCards)
        localStorage.setItem('cards', JSON.stringify(newCards))

        // reset default values for the function/page
        setShowModal(false)
        setCardNumber(cards[0].cardNumber)
        setAmount(0)
    }

    const transactionType = {
        'deposit': 'Deposit Money Into Your Account',
        'withdraw': 'Withdraw Money From Your Account',
        'sendMoney': 'Send Money to Another Account',
        'expense': 'Add expense'
    }

    const names = {
        'deposit': 'Deposit',
        'withdraw': 'Withdraw',
        'sendMoney': 'Send Money',
        'expense': 'Add Expense',
    }

    return (
        <>
            <SidebarButton onClick = {toggleModal} showModal = {showModal} name={names[type]} />

            {showModal ?
                (<>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-pink-300 rounded-t ">
                                <h3 className="text-3xl font=semibold">{transactionType[type]}</h3>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                        <label className="block text-black text-sm font-bold mb-1">Choose Account:</label>
                                        {/* added onChange to dropdown to change local  variable cardNumber to new value */}
                                        <select className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange = {(e) => setCardNumber(e.target.value)}>
                                            {/* use map to populate dropdown with values from cards array */}
                                            { cards.map( (card, index) => (
                                                <option key={index}>{card.cardNumber}</option>
                                            ))}
                                        </select>
                                        { type === 'sendMoney' ?
                                            (<>
                                                <label className="block text-black text-sm font-bold mb-1">
                                                Choose Destination:
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" placeholder="XXXX-XXXX-XXXX"/>
                                            </>)
                                        : null}
                                        <label className="block text-black text-sm font-bold mb-1">
                                        Amount:
                                        </label>
                                        {/* added onChange to input to change local variable amount to new value */}
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange = {(e) => setAmount(e.target.value)} />
                                        { type === 'expense' ?
                                            (<>
                                                <label className="block text-black text-sm font-bold mb-1">
                                                Category:
                                                </label>
                                                {/* added onChange to input to change local variable amount to new value */}
                                                <select className="shadow appearance-none border rounded w-full py-2 px-1 text-black" onChange = {(e) => setTitle(e.target.value)}>
                                                    {/* use map to populate dropdown with values from cards array */}
                                                    { categories.map( (category, index) => (
                                                        <option key={index}>{category}</option>
                                                    ))}
                                                </select>
                                                <label className="block text-black text-sm font-bold mb-1">
                                                Date:
                                                </label>
                                                {/* added onChange to input to change local variable amount to new value */}
                                                <input type='date' className="shadow appearance-none border rounded w-full py-2 px-1 text-black" defaultValue={date} onChange = {(e) => setDate(e.target.value)} />
                                            </>)
                                        : null}
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

export default FormModal