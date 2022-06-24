import '../App.css'
import logo from '../thrift-logo-bw.png'
const Header = (props) => {
    const { firstName, lastName } = props.user

    return (
        <div className="Header">
            <img className="Header-logo" src={logo} alt="" />
            <div className="Header-user">Hi, {firstName} {lastName}!</div>
        </div>
    )
}

export default Header;