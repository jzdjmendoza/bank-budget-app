import '../App.css'
import Card from './Card'

function Sidebar(props) {
    const { userCard } = props
    return(
        <div className="Sidebar">
            <Card userCard={userCard}/>
        </div>
    )
}

export default Sidebar;