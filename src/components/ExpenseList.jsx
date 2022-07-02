import { useState, useContext } from "react";
import '../App.css'
import { ExpenseContext } from '../contexts/ExpenseContext';
import { EditFormContext } from '../contexts/EditFormContext';
import EditModal from './EditModal'

function ExpenseList (props){
    const { expenses, setExpenses, cards, setCards } = useContext(ExpenseContext)
    const [ showModal, setShowModal ] = useState(false)

    const [id, setId ] = useState('')
    const [title, setTitle ] = useState('')
    const [amount, setAmount ] = useState(0)
    const [date, setDate ] = useState(new Date())
    const [cardNumber, setCardNumber ] = useState('')
    
    const refundCard = (cardNumber, cost) => {
        const newCards = [...cards];
        // find the card selected in the dropdown from the cards array
        const card = newCards.find(card => card.cardNumber === cardNumber)
        card.balance = parseFloat(card.balance) + parseFloat(cost)
        setCards(newCards)
        localStorage.setItem('cards', JSON.stringify(newCards))
    }

    const handleEditExpense = (expense) => {
        // refundCard(cardNumber, cost)
        setId(expense.id);
        setTitle(expense.title);
        setAmount(expense.cost);
        setDate(expense.date);
        setCardNumber(expense.cardNumber);
        setShowModal(true)
        // newExpenses.splice(index, 1)
        // setExpenses(newExpenses)
        // localStorage.setItem('expenses', JSON.stringify(newExpenses))
    }

    const handleDeleteExpense = ({id, cardNumber, cost}) => {
        refundCard(cardNumber, cost)
        const newExpenses = [...expenses]
        const index = expenses.findIndex(expense => expense.id === id)
        newExpenses.splice(index, 1)
        setExpenses(newExpenses)
        localStorage.setItem('expenses', JSON.stringify(newExpenses))
    }

    return (
        <>
            <table className="shadow-lg bg-white">
                <thead>
                <tr>
                    <th className="bg-pink-300 border text-center px-8 py-4">Expenses</th>
                    <th className="bg-pink-300 border text-center px-8 py-4">Cost</th>
                    <th className="bg-pink-300 border text-center px-8 py-4">Date</th>
                    <th className="bg-pink-300 border text-center px-8 py-4">Account</th>
                    <th className="bg-pink-300 border text-center px-8 py-4">Edit</th>
                    <th className="bg-pink-300 border text-center px-8 py-4">Delete</th>
                </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.id}>
                            <td className="border px-8 py-4">{expense.title}</td>
                            <td className="border px-8 py-4">{expense.cost}</td>
                            <td className="border px-8 py-4">{expense.date}</td>
                            <td className="border px-8 py-4">{expense.cardNumber}</td>
                            <td className="border px-8 py-4">
                                <button type='button' onClick={() => handleEditExpense(expense)}>edit</button>
                            </td>
                            <td className="border px-8 py-4">
                                <button type='button' onClick={() => handleDeleteExpense(expense)}>delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditFormContext.Provider value={{ showModal, setShowModal, id, setId, title, setTitle, amount, setAmount, date, setDate, cardNumber, setCardNumber}}>
                <EditModal/>
            </EditFormContext.Provider>
        </>
    )
} 

export default ExpenseList;