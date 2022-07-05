import '../App.css'
import logo from '../thrift-logo-bw.png'
import Swal from 'sweetalert2'

const Header = (props) => {
    const { user: {fullName}, setUser} = props
    const logout = () => {
        Swal.fire({
            title: 'Are you sure you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6366F1',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Logged out!',
                '',
                'success'
                )
                setUser(null);
                localStorage.setItem('user', null)
            }
          })
    }

    return (
        <div className="Header">
            <img className="Header-logo" src={logo} alt="" />
            <div className="Header-user uppercase font-bold">Hi, {fullName}!</div>
            <button onClick={ logout } className="text-white hover:text-sky-300">Logout</button>
        </div>
    )
}

export default Header;