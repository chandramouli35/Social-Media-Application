import React, { useEffect, useRef, useState } from 'react'
import './chatcontainer.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
export default function ChatContainer({currentChatUser}) {

  console.log(currentChatUser);
    const userDetails= useSelector((state)=>state.user);
    let user=userDetails.user;
    let id=user.other._id;
    const scrollRef=useRef();
    const socket=useRef();
    const accesstoken=user.accessToken;
    const [message,setMessage]=useState();
    const [inputmessage,setinputmessage]=useState('');
    const [arrivalMessage,setarrivalMessage]=useState(null);
    useEffect(()=>{
        const getmessage=async()=>{
          try {
            const res= await axios.get(`http://localhost:5000/api/post/get/chat/msg/${id}/${currentChatUser._id}`,{
              headers:{
                token:accesstoken
              }
            })
            setMessage(res.data)
          } catch (error) {
            
          }
        }
        getmessage();
      },[currentChatUser._id])

     useEffect(()=>{
      if (currentChatUser !==''){
            socket.current=io("http://localhost:5000");
            socket.current.emit("addUser", id);
      }
     },[id]);

      useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour:"smooth"})
      },[message])

      const sendmsg=()=>{
        const messages={
            myself:true,
            message:inputmessage
        };
        socket.current.emit("send-msg",{
            to:currentChatUser._id,
            from:id,
            message:inputmessage
        })
  
        fetch(`http://localhost:5000/api/post/msg`, {method:"POST", headers:{'Content-Type':'application/JSON',token:accesstoken}, body:JSON.stringify({
            from:id,
            to:currentChatUser._id,
            message:inputmessage
        })});
        setMessage(message.concat(messages))
      }


      useEffect(()=>{
        if(socket.current){
          socket.current.on("msg-receive",(msg)=>{
            console.log(msg);
            setarrivalMessage({myself:false, message:msg})
          })
        }
      },[arrivalMessage]);

      useEffect(()=>{
        arrivalMessage && setMessage((pre)=>[...pre,arrivalMessage])
      },[arrivalMessage]);

  return (
    <div className='MainChatContainer'>
        <div>
            
            <div style={{display:"flex", alignItems:"center", marginLeft:"30px" , backgroundColor:"rgb(241 243 241)", marginTop:"10px",padding:"3px",borderRadius:"10px", width:"35%"}}>
                <img src={`${currentChatUser?.profile}`}className='userProfile' alt='' />
                <p style={{textAlign:"start" , marginLeft:"3px"}}>{currentChatUser?.username}</p>
            </div>
            <div className='msgContainer'>
                {message?.map((item)=>(
                    <div ref={scrollRef}>
                        {item?.myself=== false ? 
                        <div  className="msg">
                        <img src={`${currentChatUser?.profile}`}className='chatuserProfile' alt='' />
                        <p className="msgtext" >{item?.message}</p>
                        </div>:
                        
                <div style={{display:"flex", alignItems:"center", backgroundColor:"rgb(241 243 241)", marginTop:"10px",padding:"3px",borderRadius:"10px", width:"35%", marginLeft:"550px"}}>
                <p style={{textAlign:"start" , marginLeft:"3px"}}>{item?.message}</p>
                </div>
                    }
                        </div>
                ))} 
            </div>
            <div className='msgSenderContainer'>
                <input type="text" placeholder='Write Your Message To Your Friend' onChange={(e)=>setinputmessage(e.target.value)} name="" id="" className='msgInput'/>
                <button className='msgBtn' onClick={sendmsg}>Send</button>
            </div>
        </div>
    </div>
  )
}
