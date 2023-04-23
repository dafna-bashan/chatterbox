import { Route, Routes } from 'react-router-dom'
import './App.css';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { UserEdit } from './pages/UserEdit';
import { UserInfo } from './pages/UserInfo';
import './assets/styles/main.scss'

export function App() {

  return (
    <main>
      <Routes>
        <Route path='/user/edit' element={<UserEdit />} />
        <Route path='/user' element={<UserInfo />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<SignUp />} />
      </Routes>
    </main>

  )
}



