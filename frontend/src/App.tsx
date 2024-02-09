import { Fragment } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard'
import SendTokens from './SendTokens'
import SignUp from './SignUp'
import Login from './Login'

function App() {
  return (
    <Fragment>
        <BrowserRouter>
          <Routes>
              <Route path='/' element={<Dashboard />}> </Route>
              <Route path='/sendTokens' element={<SendTokens />}> </Route>
              <Route path='/SignUp' element={<SignUp />}> </Route>
              <Route path='/Login' element={<Login />}> </Route>
          </Routes>
        </BrowserRouter>
    </Fragment>
  )
}

export default App
