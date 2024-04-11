import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Components/Header';
import Detail from './Page/Detail';
import { AppProvider } from './Context/AppContext';
import SignInOrJoinUs from './Page/SignInOrJoinUs';
import JoinUs from './Page/JoinUs';
import SignIn from './Page/SignIn';
import Home from './Page/Home';
import Profile from './Page/Profile';
import Favourite from './Page/Favourite';
import Cart from './Page/Cart';
import Footer from './Components/Footer';


function App() {


  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path='/' element={<><Home /></>} />
          <Route path='/Detail' element={<><Header /><Detail /><Footer /></>} />
          <Route path='/SignInOrJoinUs' element={<SignInOrJoinUs />} />
          <Route path='/JoinUs' element={<JoinUs />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/Profile' element={<><Header /><Profile /><Footer /></>} />
          <Route path='/Favourite' element={<><Header /><Favourite /><Footer /></>} />
          <Route path='/Cart' element={<><Header /><Cart /><Footer /></>} />
        </Routes>
      </AppProvider>
    </Router >
  );
}

export default App;
