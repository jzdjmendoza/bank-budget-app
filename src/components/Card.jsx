import '../App.css'
import visa from '../visa-logo.png'
import microchip from '../microchip.png'
import { useState } from "react";

function Card(props) {
    const { userCard: { cardName, balance, cardNumber, expDate } } = props
    return (
        <div className="CardWrapper">
            <div className="Card">
                <div className="CardHeader">
                    <div className="CardName">{cardName}</div>
                    <img className="Visa" src={visa} alt="" />
                </div>
                <div className="CardMid">
                    <div className="Balance">$ {balance}</div>
                    <img className="Microchip" src={microchip} alt="" />
                </div>
                <div className="CardDetails">
                    <div className="CardNumber">{cardNumber}</div>
                    <div className="ExpDate">Valid Thru {expDate}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;