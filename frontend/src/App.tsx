import { Fragment } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard'
import SendTokens from './SendTokens'
import SignUp from './SignUp'
import Login from './Login'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <Fragment>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Dashboard />}> </Route>
              <Route path='/sendTokens/:token' element={<SendTokens />}> </Route>
              <Route path='/SignUp' element={<SignUp />}> </Route>
              <Route path='/Login' element={<Login />}> </Route>
          </Routes>
          <Toaster/>
        </BrowserRouter>
    </Fragment>
  )
}

export default App
