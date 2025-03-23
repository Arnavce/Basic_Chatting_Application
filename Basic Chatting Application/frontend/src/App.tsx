import { useEffect, useRef, useState } from 'react';
import './App.css'


function App() {

const[messages, setMessages] = useState(["hi there"]); 
const wsRef = useRef();
  
 useEffect(() => {
  const ws = new WebSocket('ws://localhost:8080');
  ws.onmessage = (event) => {
      setMessages((m)=>[...m, event.data]); }

  wsRef.current = ws;
  ws.onopen = () => {
    ws.send(JSON.stringify({
      type:"join",
      payload:{
        roomId:"red"
      }
    }))
  
  }},[]);

  return (
     <div className='h-screen bg-black flex flex-col'>
    <div className='h-[90vh] m-4 '>
      {messages.map(message =><div className='bg-white italic text-black rounded p-2 m-4'> {message} </div>)}
    </div>
     <div>
      <input id="message" type="text " className='bg-gray-800 text-white w-[90vw] p-4' />
      <button onClick={()=>{
        const message = document.getElementById("message")?.value;
        wsRef.current.send(JSON.stringify({
          type:"chat",
          payload:{
            message:message
          }
        }));
        
      }} className='bg-green-600 text-white w-[10vw] p-4'>send Message</button>
     </div>
     
     </div>
  )
}

export default App
