import '../App.css'
import { useState, useContext, useEffect } from "react";
import Card from './Card'
import FormModal from './FormModal'
import { ExpenseContext } from '../contexts/ExpenseContext';
import { FormContext } from '../contexts/FormContext';

function Sidebar(props) {
    // get cards and setCards passed from App.js
    const { cards } = useContext(ExpenseContext)
    const categories = ['Food', 'Medicine', 'Insurance', 'Mortgage', 'Bills']
    const types = ['deposit', 'withdraw', 'sendMoney', 'expense']

    // local function variables for checking values from form
    const [title, setTitle ] = useState(categories[0])
    const [amount, setAmount ] = useState(0)
    const [date, setDate ] = useState(new Date())
    const [cardNumber, setCardNumber ] = useState(cards[0].cardNumber)
    const [destinationCardNumber, setDestinationCardNumber ] = useState('')

    useEffect(() => {
        setCardNumber(cards[0].cardNumber)
    }, [cards])

    return(
        <>
            <div className="Sidebar">
                <div className='CardDiv'>
                    <button className='text-2xl text-white w-96 h-10 my-1 bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-md cursor-default uppercase font-bold'>My Card</button>
                    { cards.map( (card, index) => (
                        <Card userCard={card} key={index}/>
                    ))}
                </div>
                {/* iterate for cards */}
                <div>
                    <FormContext.Provider value={{ categories, title, amount, date, cardNumber, destinationCardNumber, setDestinationCardNumber, setTitle, setAmount, setDate, setCardNumber }}>
                        <FormModal key={types[0]} type={types[0]}/>
                        <FormModal key={types[1]} type={types[1]}/>
                        <FormModal key={types[2]} type={types[2]}/>
                    </FormContext.Provider>
                </div>
            </div>
        </>
    )
}

export default Sidebar;