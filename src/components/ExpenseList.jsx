import { useState, useContext, useEffect } from "react";
import '../App.css'
import { ExpenseContext } from '../contexts/ExpenseContext';
import { EditFormContext } from '../contexts/EditFormContext';
import EditModal from './EditModal'
import FormModal from './FormModal'
import { FormContext } from '../contexts/FormContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import groupBy from '../helpers/groupBy'

function ExpenseList (){
    ChartJS.register(ArcElement, Tooltip, Legend);

    const { user, expenses, setExpenses, cards, setCards } = useContext(ExpenseContext)
    const [ showModal, setShowModal ] = useState(false)
    const categories = ['Food', 'Medicine', 'Insurance', 'Mortgage', 'Bills']

    const [id, setId ] = useState('')
    const [title, setTitle ] = useState(categories[0])
    const [amount, setAmount ] = useState(0)
    const [date, setDate ] = useState(new Date())
    const [cardNumber, setCardNumber ] = useState(cards[0].cardNumber)

    const refundCard = (cardNumber, cost) => {
        const newCards = [...cards];
        // find the card selected in the dropdown from the cards array
        const card = newCards.find(card => card.cardNumber === cardNumber)
        card.balance = parseFloat(card.balance) + parseFloat(cost)
        setCards(newCards)

        const lsCards = JSON.parse(localStorage.getItem('cards'))
        lsCards.find(lsCard => lsCard.cardNumber === card.cardNumber).balance = card.balance
        localStorage.setItem('cards', JSON.stringify(lsCards))
    }

    const dynamicColors = (list) => {
        const colors = []
        for(let i=0;i<list.size;i++) {
          console.log(i)
          const color = '#'+Math.floor(Math.random()*16777215).toString(16)
          colors.push(color)
        }
        return colors
    }

    const data = {
        labels: categories,
        datasets: [
          {
            label: 'Expenses',
            data: groupBy(expenses, expense => expense.title),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

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

    console.log(groupBy(expenses, expense => expense.title).values())
    return (
        <>
            <FormContext.Provider value={{ categories, title, amount, date, cardNumber, setTitle, setAmount, setDate, setCardNumber }}>
                <FormModal key='expense' type='expense'/>
            </FormContext.Provider>
            <div className="flex flex-wrap w-full">
                <table className="shadow-lg bg-white">
                    <thead>
                    <tr>
                        <th className="bg-pink-300 border text-center px-8 py-2">Expenses</th>
                        <th className="bg-pink-300 border text-center px-8 py-2">Cost</th>
                        <th className="bg-pink-300 border text-center px-8 py-2">Date</th>
                        {/* <th className="bg-pink-300 border text-center px-8 py-2">Account</th> */}
                        <th className="bg-pink-300 border text-center px-8 py-2">Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                        {expenses.map(expense => (
                            <tr className="odd:bg-white even:bg-slate-50" key={expense.id}>
                                <td className="border px-8 py-2">{expense.title}</td>
                                <td className="border px-8 py-2">{expense.cost}</td>
                                <td className="border px-8 py-2">{expense.date}</td>
                                {/* <td className="border px-8 py-2">{expense.cardNumber}</td> */}
                                <td className="border px-8 py-2">
                                    <button type='button' className="w-10 h-10 mx-1 bg-indigo-500 hover:bg-indigo-700 shadow-lg shadow-indigo-500/50 rounded-md text-white" onClick={() => handleEditExpense(expense)}>Edit</button>
                                    <button type='button' className="w-20 h-10 mx-1 bg-indigo-500 hover:bg-indigo-700 shadow-lg shadow-indigo-500/50 rounded-md text-white" onClick={() => handleDeleteExpense(expense)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {(expenses && !expenses.length) && <tr className="border px-8 py-4 text-center">No expenses to show!</tr>}
                    </tbody>
                </table>
                <div style={{width: '35%', height: '35%'}} className="mx-20">
                    <Doughnut
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                        }}
                        />
                </div>
            </div>
            <EditFormContext.Provider value={{ showModal, setShowModal, id, setId, title, setTitle, amount, setAmount, date, setDate, cardNumber, setCardNumber}}>
                <EditModal/>
            </EditFormContext.Provider>
        </>
    )
} 

export default ExpenseList;