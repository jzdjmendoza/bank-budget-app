import '../App.css';
import { useState } from 'react';
import Swal from 'sweetalert2'

const LoginRegister = (props) => {
    const [isLogin, setIsLogin] = useState(true)
    const [loginEmail, setLoginEmail] = useState('')
	const [loginPassword, setLoginPassword] = useState('')
	const [registerEmail, setRegisterEmail] = useState('')
	const [registerPassword, setRegisterPassword] = useState('')
	const [registerFullName, setRegisterFullName] = useState('')
	const [registerCardNumber, setRegisterCardNumber] = useState('')
	const [registerExpDate, setRegisterExpDate] = useState('')
	const [isDisabled, setIsDisabled] = useState(false)

    const { setUser } = props;

    const submitRegister = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const cards = JSON.parse(localStorage.getItem('cards')) || [];
        if (users.find(user => user.email === registerEmail)) {
            Swal.fire('Email already taken.','Please use another email or log in instead.', 'error');
        } else if(users.find(user => user.cardNumber === registerCardNumber)){
            Swal.fire('Card Number already registered.','Please register another card or log in instead.', 'error');
        } else {
            users.push({
                fullName: registerFullName,
                email: registerEmail,
                password: registerPassword,
                cardNumber: registerCardNumber,
                expDate: registerExpDate
            })
            cards.push({
                cardName: 'Personal Card',
                balance: 0,
                cardNumber: registerCardNumber,
                expDate: registerExpDate,
                userEmail: registerEmail
            })
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('cards', JSON.stringify(cards));
            Swal.fire('Registration Successful!', `Please log in with your account details`, 'success');
            setRegisterFullName('');
            setRegisterEmail('');
            setRegisterPassword('');
            setRegisterCardNumber('');
            setRegisterExpDate('');
            toggleForm();
        }
    };
    const submitLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users'));
        const userLogin = users.find(user => user.email === loginEmail && user.password === loginPassword);
        setUser(userLogin);
        localStorage.setItem('user', JSON.stringify(userLogin));
        if (userLogin !== undefined) {
            Swal.fire('Log In Successful!','', 'success');
        } else {
            Swal.fire('Invalid email or password','Please try again.', 'error');
        }
    };

    const toggleForm = () => {
        setIsDisabled(!isDisabled)
        setIsLogin(!isLogin)
    }

    return (
        <>
            <div className="bigDiv">
                <div className={"container" + (isLogin ? '' : " rightPanelActive")}>
                    <div className="formContainer registerContainer">
                        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" action="#" onSubmit={e => {submitRegister(e)}}>
                            <h1 className="loginH1 text-3xl">Join Us!</h1>
                            <span className="loginSpan">Use your email for registration</span>
                            <input
                                className="logInRegisterInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Full Name"
                                onChange = {e => setRegisterFullName(e.target.value)}
                                value = {registerFullName}
                                required
                            />
                            <input
                                className="logInRegisterInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                placeholder="Email"
                                onChange = {e => setRegisterEmail(e.target.value)}
                                value = {registerEmail}
                                required
                            />
                            <input
                                className="logInRegisterInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Password"
                                onChange = {e => setRegisterPassword(e.target.value)}
                                value = {registerPassword}
                                required
                            />
                            <input
                                className="logInRegisterInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                placeholder="Card Number"
                                onChange = {e => setRegisterCardNumber(e.target.value)}
                                value = {registerCardNumber}
                                required
                            />
                            <input
                                className="logInRegisterInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Card Expiration Date"
                                onChange = {e => setRegisterExpDate(e.target.value)}
                                value = {registerExpDate}
                                required
                            />
                            <button type="submit" className="loginRegisterButton" disabled={!isDisabled}>Sign Up</button>
                        </form>
                    </div>
                    <div className="formContainer loginContainer">
                        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" action="#" onSubmit={e => {submitLogin(e)}}>
                            <h1 className="loginH1">Log in</h1>
                            <input
                                className="logInRegisterInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                placeholder="Email"
                                onChange = {e => setLoginEmail(e.target.value)}
                                value = {loginEmail}
                            />
                            <input
                                className="logInRegisterInput shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                placeholder="Password"
                                onChange = {e => setLoginPassword(e.target.value)}
                                value = {loginPassword}
                            />
                            <button className="loginRegisterButton" type="submit" disabled={isDisabled}>Log In</button>
                        </form>
                    </div>
                    <div className="overlayContainer">
                        <div className="overlay">
                            <div className="overlayPanel overlayLeft">
                                <p className="loginH1 text-5xl">Hello, Thrifter!</p>
                                <p className="registerP">Enter your details and start being thrifty with us.</p>
                                <p className="loginP">Already have an account?</p>
                                <button onClick={e => toggleForm()} className="ghost loginRegisterButton">Log In Here!</button>
                            </div>
                            <div className="overlayPanel overlayRight">
                                <p className="loginH1 text-4xl">Welcome Back, Thrifter!</p>
                                <p className="registerP">Continue being in control of your finances!</p>
                                <p className="loginP">No account yet?</p>
                                <button onClick={e =>  toggleForm()} className="ghost loginRegisterButton">Sign Up Here!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
	)
}

export default LoginRegister