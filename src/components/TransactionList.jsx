import { useContext } from "react";
import '../App.css'
import { ExpenseContext } from '../contexts/ExpenseContext';

function TransactionList (props){
    const { transactions } = useContext(ExpenseContext)
    return (
        <>
            <table className="shadow-lg bg-white mx-20">
                <thead>
                <tr>
                    <th className="bg-pink-300 border text-center px-8 py-4">Type</th>
                    <th className="bg-pink-300 border text-center px-8 py-4">Amount</th>
                    <th className="bg-pink-300 border text-center px-8 py-4">Date</th>
                    <th className="bg-pink-300 border text-center px-8 py-4">Running Balance</th>
                    <th className="bg-pink-300 border text-center px-8 py-4">Account</th>
                </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td className="border px-8 py-4">{transaction.type}</td>
                            <td className="border px-8 py-4">{transaction.amount}</td>
                            <td className="border px-8 py-4">{transaction.date}</td>
                            <td className="border px-8 py-4">{transaction.runningBalance}</td>
                            <td className="border px-8 py-4">{transaction.account}</td>
                        </tr>
                    ))}
                    {(transactions && !transactions.length) && <tr className="border px-8 py-4 text-center break-normal">No transactions to show!</tr>}
                </tbody>
            </table>
        </>
    )
} 

export default TransactionList;