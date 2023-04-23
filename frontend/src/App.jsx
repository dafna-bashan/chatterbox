import { Route, Routes } from 'react-router-dom'
import './App.css';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { UserEdit } from './pages/UserEdit';
import { UserInfo } from './pages/UserInfo';
import { ChatApp } from './pages/ChatApp'
import './assets/styles/main.scss'
import { NavBar } from './cmps/NavBar';

export function App() {

  return (
    <main>
      <NavBar/>
      <Routes>
        <Route path='/user/edit' element={<UserEdit />} />
        <Route path='/user' element={<UserInfo />} />
        <Route path='/login' element={<Login />} />
        <Route path='/chat' element={<ChatApp />} />
        <Route path='/' element={<SignUp />} />
      </Routes>
    </main>

  )
}



