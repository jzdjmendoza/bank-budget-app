import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { useEffect, useState } from "react";
import Tabs from './components/Tabs';
import TransactionList from './components/TransactionList';
import { ExpenseContext } from './contexts/ExpenseContext';
import LoginRegister from './components/LoginRegister';

function App() {
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

  const [transactions, setTransactions] = useState(() => {
    return JSON.parse(localStorage.getItem('transactions')) || []
  });
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem('expenses')) || []
  });

  const [user, setUser] = useState(() =>{
    return JSON.parse(localStorage.getItem('user'));
  });

  const [cards, setCards] = useState(() => {
    const allCards = JSON.parse(localStorage.getItem('cards'))
    return allCards
  });

  useEffect(() => {
    if(user){
      const transactions = JSON.parse(localStorage.getItem('transactions')) || []
      const expenses = JSON.parse(localStorage.getItem('expenses')) || []

      setTransactions(transactions.filter(transaction => transaction.userEmail === user.email))
      setExpenses(expenses.filter(expense => expense.userEmail === user.email))
      setCards(JSON.parse(localStorage.getItem('cards')).filter(card => card.userEmail === user.email))
    }
  }, [user])

  const [users, setUsers] = useState();
  const [openTab, setOpenTab] = useState(1);
  const color = "pink";

  return (
    <> 
      <div className="App">
        {user ? (
          <>
            <Header user={user} setUser={setUser}/>
            <ExpenseContext.Provider value={{ user, setUser, cards, setCards, transactions, setTransactions, expenses, setExpenses}}>
              <div className="Main"> 
                <Sidebar className="Sidebar"/>
                <Tabs />
              </div>
            </ExpenseContext.Provider>
          </>
        ) : 
          <LoginRegister setUser = {setUser}/>
        }
      </div>
    </>
  );
}

export default App;
