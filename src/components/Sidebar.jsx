import '../App.css'
import Card from './Card'
import DepositButton from './DepositButton'
import DepositModal from './DepositModal'

function Sidebar(props) {
    const { userCard } = props
    return(
        <div className="Sidebar">
            <Card userCard={userCard}/>
            <DepositModal userCard={userCard}/>
        </div>
    )
}

export default Sidebar;