import '../App.css'
import { useState, useContext } from "react";
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

    return(
        <div className="Sidebar">
            {/* iterate for cards */}
            { cards.map( (card, index) => (
                <Card userCard={card} key={index}/>
            ))}
            <FormContext.Provider value={{ categories, title, amount, date, cardNumber, setTitle, setAmount, setDate, setCardNumber }}>
                <FormModal key={types[0]} type={types[0]}/>
                <FormModal key={types[1]} type={types[1]}/>
                <FormModal key={types[2]} type={types[2]}/>
                <FormModal key={types[3]} type={types[3]}/>
            </FormContext.Provider>
        </div>
    )
}

export default Sidebar;