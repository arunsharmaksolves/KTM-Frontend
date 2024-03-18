import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import PrivateRoutes from './components/PrivateRoutes';
import Home from './pages/Home';
function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/home" exact />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
