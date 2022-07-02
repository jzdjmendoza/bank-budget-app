import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { useState } from "react";
import ExpenseList from './components/ExpenseList';
import TransactionList from './components/TransactionList';
import { ExpenseContext } from './contexts/ExpenseContext';

function App() {
  // set initial user
  const user = {
    firstName: 'Tommy',
    lastName: 'Shelby',
    email: 'jm@gmail.com'
  }

  // set array of initial cards
  const initialCards = [
    {
      cardName: 'Personal Card',
      balance: 1000,
      cardNumber: '1234 5678 9012 3456',
      expDate: '06/24',
    }, 
    {
      cardName: 'Credit Card',
      balance: 1000,
      cardNumber: '5200 0000 0000 0001',
      expDate: '06/25',
    }
  ]

  // const [ user, setUser ] = useState(() => {
  //  return JSON.parse(localStorage.getItem('user')) || null
  // })

  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem('transactions')) || []
  });
  const [cards, setCards] = useState(() => {
    return JSON.parse(localStorage.getItem('cards')) || initialCards
  });
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem('expenses')) || []
  });

  return (
    <>
      { user ? 
      <div className="App">
        <Header user={user}/>
        <ExpenseContext.Provider value={{ cards, setCards, transactions, setTransactions, expenses, setExpenses}}>
          <div className="Main"> 
            <Sidebar className="Sidebar"/>
            <div className='d-flex'>
              <div className='mb-10'>
                <ExpenseList className="Expenses"/>
              </div>
              <div>
                <TransactionList className="Transactions"/>
              </div>
            </div>
          </div>
        </ExpenseContext.Provider>
      </div>
      : null } {/* change null to Login component */} 
    </>
  );
}

export default App;
