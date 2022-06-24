import '../App.css'
import visa from '../visa-logo.png'
import microchip from '../microchip.png'

function Card(props) {
    const { cardName, initialAmount, cardNumber, expDate } = props.userCard
    return (
        <div className="CardWrapper">
            <div className="Card">
                <div className="CardHeader">
                    <div className="CardName">{cardName}</div>
                    <img className="Visa" src={visa} alt="" />
                </div>
                <div className="CardMid">
                    <div className="Balance">$ {initialAmount}</div>
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