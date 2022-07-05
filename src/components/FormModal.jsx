import { useState, useContext, useEffect } from "react";
import SidebarButton from "./SidebarButton";
import ExpenseForm from "./ExpenseForm";
import { ExpenseContext } from '../contexts/ExpenseContext';
import { FormContext } from '../contexts/FormContext';
import Swal from 'sweetalert2';

function FormModal(props) {
    // original cards and setCards variables/functions
    const { type } = props;
    const { cards, setCards, expenses, transactions, setExpenses, setTransactions, user } = useContext(ExpenseContext);
    const { categories, amount, cardNumber, title, date, destinationCardNumber, setDestinationCardNumber, setCardNumber, setAmount, setTitle, setDate } = useContext(FormContext);
    const [ showModal, setShowModal ] = useState(false);
    const [errors, setErrors] = useState({
        amount:'' ,
        destinationCardNumber: '',
        title: '',
        date: '',
        cardNumber: ''
    });
        
    useEffect(() => {
        setCardNumber(cards[0].cardNumber)
    }, [cards])

    // toggling modal
    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const resetError = () => {
        setErrors({
            amount:'' ,
            destinationCardNumber: '',
            title: '',
            date: '',
            cardNumber: ''
        })
    }

    const addExpense = () => {
        const newExpenses = [...expenses]
        const id = expenses.length ? expenses[expenses.length - 1].id + 1 : 1
        const newExpense = { id: id, title: title, cost: amount, date: date, cardNumber: cardNumber, userEmail: user.email}
        newExpenses.push(newExpense);
        setExpenses(newExpenses);

        const lsExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
        lsExpenses.push(newExpense)
        localStorage.setItem('expenses', JSON.stringify(lsExpenses))
    }

    const addTransaction = (balance) => {
        const newTransactions = [...transactions]
        const newTransaction = { type: type.split(/(?=[A-Z])/).join(' '), amount: amount, date: new Date().toLocaleDateString('en-CA'), account: cardNumber, runningBalance: balance, userEmail: user.email }
        newTransactions.push(newTransaction);
        setTransactions(newTransactions);

        const lsTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        lsTransactions.push(newTransaction)
        localStorage.setItem('transactions', JSON.stringify(lsTransactions))
    }

    const validateForm = () => {
        // const newError =
        let noError = true
        switch(type){
            case 'sendMoney':
                if(amount === 0 || amount === '') {
                    setErrors(prevError => ({...prevError, amount: 'Amount is required!'}))
                    noError = false
                } else {
                    setErrors(prevError => ({...prevError, amount: ''}))
                }
                if(destinationCardNumber === '') {
                    setErrors(prevError => ({...prevError, destinationCardNumber: 'Destination card number is required!'}))
                    noError = false
                } else {
                    const allCards = JSON.parse(localStorage.getItem('cards'))
                    if(allCards.find(card => card.cardNumber === destinationCardNumber)){
                        setErrors(prevError => ({...prevError, destinationCardNumber: ''}))
                    } else {
                        setErrors(prevError => ({...prevError, destinationCardNumber: 'Destination account not found.'}))
                        noError = false
                    }
                }
                break;
            case 'deposit':
            case 'withdraw':
                if(amount === 0 || amount === '') {
                    setErrors(prevError => ({...prevError, amount: 'Amount is required!'}))
                    noError = false
                } else {
                    setErrors(prevError => ({...prevError, amount: ''}))
                }
            break;
            case 'expense':
                if(amount === 0 || amount === '') {
                    setErrors(prevError => ({...prevError, amount: 'Amount is required!'}))
                    noError = false
                } else {
                    setErrors(prevError => ({...prevError, amount: ''}))
                }
                if(title === '') {
                    setErrors(prevError => ({...prevError, title: 'Category is required!'}))
                    noError = false
                } else {
                    setErrors(prevError => ({...prevError, category: ''}))
                }
                if(date === '') {
                    setErrors(prevError => ({...prevError, date: 'Date is required!'}))
                    noError = false
                } else {
                    setErrors(prevError => ({...prevError, date: ''}))
                }
            break;
        }
        
        return noError;
    }

    const handleSubmit = () => {
    
        if(validateForm()){
            // get a copy of current state of cards array
            const newCards = [...cards];
            // find the card selected in the dropdown from the cards array
            const card = newCards.find(card => card.cardNumber === cardNumber)
            // console.log(cardNumber)
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
                    const allCards = JSON.parse(localStorage.getItem('cards')) || []
                    const dest = allCards.find(card => card.cardNumber === destinationCardNumber)

                    card.balance = parseFloat(card.balance) - parseFloat(amount)
                    dest.balance = parseFloat(dest.balance) + parseFloat(amount)

                    localStorage.setItem('cards', JSON.stringify(allCards))
                    break;
                case 'expense':
                    card.balance = parseFloat(card.balance) - parseFloat(amount)
                    addExpense();
                    break;
            }

            if(type != 'expense') addTransaction(card.balance);
            // update cards using useState function of the cards array
            setCards(newCards)

            const lsCards = JSON.parse(localStorage.getItem('cards'))
            lsCards.find(card => card.cardNumber === cardNumber).balance = card.balance
            localStorage.setItem('cards', JSON.stringify(lsCards))

            Swal.fire('Successful!', '', 'success');

            // reset default values for the function/page
            setShowModal(false)
            setCardNumber(cards[0].cardNumber)
            setAmount(0)
            type != 'expense' && setDestinationCardNumber('')
        }
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
                                        <span style={{ color: "red" }}>{errors["cardNumber"]}</span>
                                        { type === 'sendMoney' ?
                                            (<>
                                                <label className="block text-black text-sm font-bold mb-1">
                                                Choose Destination:
                                                </label>
                                                <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" placeholder="XXXX-XXXX-XXXX" onChange = {(e) => setDestinationCardNumber(e.target.value)}/>
                                                <span style={{ color: "red" }}>{errors["destinationCardNumber"]}</span>
                                            </>)
                                        : null}
                                        <label className="block text-black text-sm font-bold mb-1">
                                        Amount:
                                        </label>
                                        {/* added onChange to input to change local variable amount to new value */}
                                        <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" type="number" onChange = {(e) => setAmount(e.target.value)} />
                                        <span style={{ color: "red" }}>{errors["amount"]}</span>
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
                                        onClick={() => {
                                            resetError();
                                            setShowModal(false)
                                        }}>
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