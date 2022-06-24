import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {
  const user = {
    firstName: 'Tommy',
    lastName: 'Shelby',
    email: 'jm@gmail.com'
  }

  const userCard = {
      cardName: 'Personal Card',
      initialAmount: '1000',
      cardNumber: '1234 5678 9012 3456',
      expDate: '06/14',
    }

  return (

    <div className="App">
      <Header user={user}/>
      <div className="Main">
        <Sidebar className="Sidebar" userCard={userCard}/>
      </div>
    </div>
  );
}

export default App;
