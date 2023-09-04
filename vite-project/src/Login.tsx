import { useState } from 'preact/hooks';
import { motion } from 'framer-motion';
import {  FaLock, FaFingerprint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
 export default function loginPage()  {
  const navigate = useNavigate();
  const [black, setblack] = useState(true);
const [err,setErr] = useState(false)
  const changetheme = () =>{
    setblack(!black)
    if (black){
      
    }
  }
  const [id,setId ] = useState('')
  const [password,setPassword] = useState('')
const handlesubmit = async (e:any) =>{
  e.preventDefault();
  if(id.length>0 && password.length>0){
const response  = await fetch('http://localhost:4000/users/login', {
  method:"POST",
 credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(
      { 
      id: id,
       password: password
    }) 
   }) 
   console.log(id)
   console.log(password)
   if (response.ok) {
        navigate("/feed");
        console.log('Successfull login')
        setErr(false)
      }
      else{
        console.error("Error while login")
setErr(true)
      }
    }
}
  return (
    <><div >
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
      <h1>Вход</h1>
        <label>
          <FaFingerprint/>
          <input  value={id} onChange={(event:Event ) => {setId((event.target as HTMLInputElement).value) } } type="id" name="email"  placeholder="Айди" />
        </label>
        <label>
          <FaLock />
          <input  value={password}onChange={(event:Event ) => {setPassword((event.target as HTMLInputElement).value) } } type="password" name="password"  placeholder="Пароль"  />
        </label>
        <Link  className='checkreg' to='/sign-up'>Ещё не зарегестрированны?</Link>
        <button type="submit" className='subbtn' onClick={handlesubmit}>Войти</button>
      <div>{err
      ?
      <a>Ошибка</a>
      :
<a></a>
      }</div>
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
   <h1 style={{color:"202020"}} className='blackh'>Вход</h1>
     <label>
     <FaFingerprint/>
          <input   value={id} onChange={(event:Event ) => {setId((event.target as HTMLInputElement).value) } } type="id" name="email"  placeholder="Айди" />
     </label>
     <label>
       <FaLock />
       <input  value={password} onChange={(event:Event ) => {setPassword((event.target as HTMLInputElement).value) } }  type="password" name="password"  placeholder="Пароль" />
     </label>
     <Link to='/sign-in' className='checkreg'>Ещё не зарегестрированны?</Link>
     <button type="submit" className='subbtn' onClick={handlesubmit}>Войти</button>
   </form>
 </motion.div></>
    }
    </div>
    </>
  );
};