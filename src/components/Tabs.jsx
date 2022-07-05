import '../App.css'
import { useState, useEffect } from "react";
import ExpenseList from './ExpenseList';
import TransactionList from './TransactionList';
import { ExpenseContext } from '../contexts/ExpenseContext';

const Tabs = () => {
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

    const [openTab, setOpenTab] = useState(1);
    return (
      <>
        <div className="flex flex-wrap">
            <div className="w-full ml-10" style={{height: "90vh"}}>
                <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
                >
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                        id="firstTab"
                        className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 1
                            ? "text-white bg-indigo-500 hover:bg-indigo-700"
                            : "text-indigo-500 bg-white hover:bg-slate-100")
                        }
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(1);
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                        >
                        Transactions
                        </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                        className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 2
                            ? "text-white bg-indigo-600 hover:bg-indigo-700"
                            : "text-indigo-600 bg-white hover:bg-slate-100")
                        }
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(2);
                        }}
                        data-toggle="tab"
                        href="#link2"
                        role="tablist"
                        >
                        Expenses
                        </a>
                    </li>
                </ul>
                <div className="absolute flex flex-col min-w-0 w-2/3 break-words bg-white mb-6 rounded border-t-2">
                    <div className="px-2 py-5 flex-auto">
                        <div className="tab-content tab-space">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                            <div>
                                <TransactionList className="Transactions"/>
                            </div>
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                            <div className='mb-10'>
                                <ExpenseList className="Expenses"/>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  };

export default function TabsRender() {
return (
    <>
        <Tabs color="pink" />
    </>
);
}