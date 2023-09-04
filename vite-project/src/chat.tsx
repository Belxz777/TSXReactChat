import axios from 'axios'
import { render } from 'preact';
import { useEffect,useState } from 'preact/hooks';
import io from 'socket.io-client'
const socket  = io("http://localhost:4000/")
export default function Chat ():any{
  function getCookie(name:string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  }
    useEffect(() => {
      const token = getCookie('token')
    console.log(token)
  axios.get(`http://localhost:4000/users/profile/${token}`)
  .then((response) =>{ setid(response.data.id)
    setname(response.data.name)
    console.log(response.data)
  }
  )
  .catch(error => console.error(error));
    }, []);
    const [messages, setMessages] = useState<string[]>([]);
const [input,setInput] = useState('')
const [name, setname] = useState('')
const [id, setid] = useState(0)
const [socketid,setSocketid] = useState('')
const [receiver_id,setReceiver_id] = useState('')
const messagesArr: any[]  = []


useEffect(() => {
  // Обработчик для получения сообщений от сервера
  socket.on('message', (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  });

  // Очистка обработчика при размонтировании компонента
  return () => {
    socket.off('message');
  };
}, []);


const [room,setRoom] = useState('')
const [created,setCreated] = useState(false)
const [message,setMessage]  = useState('')
const [vRoom,setvRoom] = useState('')
const [users,setUsers] = useState<any[]>([])
const createRoom =() =>{
socket.emit('room_name',room)
setCreated(!created)
}
const sendMessage = () =>{
  const data = {
    message:message,
    to:room || vRoom
  }
  socket.emit('message',data)
}
const joinRoom = () =>{
socket.emit('join_room',vRoom)
setCreated(!created)

}


useEffect(() => {
  

  return () => {
    socket.off('newUser');
  };
}, [socket, users]);

return (

    <div>
     <h1 class='name-person'>{name}</h1>
     <input  value={room} onChange={(event:Event ) => {setRoom((event.target as HTMLInputElement).value) } }></input>
   <button onClick={createRoom}>Создать комнату</button>
   <input value={vRoom} onChange={(event:Event ) => {setvRoom((event.target as HTMLInputElement).value) } }></input>
   <button onClick={joinRoom}>Вступить  комнату</button>
   {
  created
    ?
    <div>
    <input  value={message} onChange={(event:Event ) => {setMessage((event.target as HTMLInputElement).value) } }>
    </input>
    <button onClick={sendMessage}>Отправить сообщение</button>
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
    </div>
    :
    <h1>Вы еще нет создали не один чат и не присоеденились не в один чат</h1>
   }
    </div>
)

}