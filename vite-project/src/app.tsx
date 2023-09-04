
import './app.css'
import RegistrationPage from './registration'
import Login from './Login'
import Notfound from './notfound'
import Chat from './chat'
import Mainpage  from './mainpage'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
export function App() {

  return (
        <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Mainpage/>} />
      <Route path = '/feed' element = {<Chat/>}/>
      <Route path="/sign-in" element={<Login/>} />
      <Route path="/sign-up" element={<RegistrationPage/>} />
      <Route path="*" element={<Notfound/>} /> 
    </Routes>
  </BrowserRouter>
    </>
  )
}
