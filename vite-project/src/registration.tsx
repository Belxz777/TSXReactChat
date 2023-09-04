import { useState } from 'preact/hooks';
//import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FaUser,  FaLock,FaFingerprint, FaPhone } from 'react-icons/fa';
import { Link,useNavigate} from 'react-router-dom';

import './reg.css'
export default function RegistrationPage(){
    const navigate = useNavigate();

  const [black, setblack] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [id, setid] = useState('')
  const [image,setImage] = useState<File[]>()
//сам запрос создание пользователя
const changetheme = () =>{
  setblack(!black)
}
const handesubmit = async () =>{
  if(id.length>0 && username.length>0 && password.length>0){
const response  = await fetch('http://localhost:4000/users/', {
  method:"POST",
  //это кц как важно ставить  эти два параметра , иначе кука не создастся в барузере
  credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(
      { 
        id: id,
        name: username,
       password: password,
       photo:'https://dsad.com/wp-content/uploads/2017/05/Image-1-9.jpg'

    }) 
   }) 
   if (response.status === 201) {
        navigate("/feed");
        console.log('Successfull registration')
      }
      else{
        console.error("Error while registartion")
      }
    }
  }
  return (
<div>
      {black ?
      <>
    <header>
       <h2 className='logo'>
          Bell-X Messanger
        </h2>
        <label className="checkbox-ios">
            <input type="checkbox" className="theme-swicher" onChange={changetheme} />
            <span className="checkbox-ios-switch"></span>
          </label>
          </header>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4 }}
      className='maindiv'
    >
      <form className='reg'>
      <h1>Регистрация</h1>
      <label>
       <FaUser />
       <input type="text" name="name" placeholder="Имя" value={username} onChange={(event:Event ) => {setUsername((event.target as HTMLInputElement).value) } }/>
     </label>
     <label>
     <FaFingerprint />
          <input type="id" name="email"  placeholder="Айди" value={id} onChange={(event:Event ) => {setid((event.target as HTMLInputElement).value ) } }/>
     </label>
     <label>
       <FaLock />
       <input type="password" name="password"  placeholder="Пароль" value={password} onChange={(event:Event ) => {setPassword((event.target as HTMLInputElement).value) } } />
     </label>
     <label>
     </label>
        <Link to='/sign-in' className='checkreg'>Уже зарегестрированны?</Link>
        <button type='button' className='subbtn' onClick={handesubmit}>Зарегистрироваться</button>
      </form>
    </motion.div>

    </>
    :
    <>
    <header style={{background:"#202020"}}>
    <h2 className='logo'>
       Bell-X Messanger
     </h2>
     <label className="checkbox-ios">
         <input type="checkbox" className="theme-swicher" onChange={changetheme} />
         <span className="checkbox-ios-switch"></span>
       </label>
       </header>
 <motion.div
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   transition={{ duration: 4 }}
   className='maindiv'
   style={{background:"#202020"}}
 >
   <form  className='reg'>
   <h1 className='blackh'>Регистрация</h1>
     <label>
       <FaUser />
       <input type="text" name="name" placeholder="Имя" />
     </label>
     <label>
     <FaFingerprint />
          <input type="id" name="email"  placeholder="Айди" />
     </label>
     <label>
       <FaLock />
       <input type="password" name="password"  placeholder="Пароль" />
     </label>
     <Link to='/sign-in' className='checkreg'>Уже зарегистрированны?</Link>
     <button type="submit" className='subbtn'>Зарегистрироваться</button>
   </form>
   </motion.div>
 </>
}
 </div>
  )
     }