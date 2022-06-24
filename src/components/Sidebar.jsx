import '../App.css'
import Card from './Card'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import SendMoneyModal from './SendMoneyModal'

function Sidebar(props) {
    const { card, setCard } = props
    return(
        <div className="Sidebar">
            <Card userCard={card}/>
            <DepositModal userCard={card} setCard={setCard}/>
            <WithdrawModal userCard={card} setCard={setCard}/>
            <SendMoneyModal userCard={card} setCard={setCard}/>
        </div>
    )
}

export default Sidebar;