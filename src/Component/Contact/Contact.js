import React, { useEffect, useState } from 'react'
import './contact.css'
import ChatContainer from '../ChatContainer/ChatContainer'
import axios from 'axios'
import { useSelector } from 'react-redux'
export default function Contact() {
  const userDetails= useSelector((state)=>state.user);
  let user=userDetails.user
  let id=user.other._id;
  const accesstoken=user.accessToken;
  const [users, setUsers]=useState();
  console.log(id);
  console.log(accesstoken);
  const [currentChatUser,setcurrentChatUser]=useState('');
  
    useEffect(()=>{
        const getuser=async()=>{
          try {
            const res= await axios.get(`http://localhost:5000/api/post/following/${id}`,{
              headers:{
                token:accesstoken
              }
            })
            setUsers(res.data)
          } catch (error) {
            
          }
        }
        getuser();
      },[]);
      
      const handleUser =(e)=>{
        setcurrentChatUser(e);
      }
    
  return (
    <div className='mainContactContainer'>
        <div>
            <div style={{width:'20pc' , padding:"10px"}}>
                <input type="search" placeholder='Search Your Friends' className='searchbarforcontact'/>
            </div>
            <div className='usersDetailContainer'>
                {users?.map((item)=>(
                    <div>
                        {item?._id !== id ? 
                        <div className='userContainer' onClick={(e)=>handleUser(item)}>
                        <img src={`${item?.profile}`} className="Chatuserimage" alt="" />
                        <div style={{marginLeft:"10px"}}>
                           <p style={{color:"black", textAlign:"start", marginTop:"5px", fontSize:"15px"}}>{item?.username}</p>
                            <p style={{color:"black", textAlign:"start", marginTop:"-13px",fontSize:"14px"}}>Open Your Message</p>
                        </div>
                    </div> : ""
                    }
                    
                    </div>
                ))}   
            </div>
        </div>
        {currentChatUser !=='' ? 
        <ChatContainer currentChatUser={currentChatUser}/>:
        <div style={{marginLeft:"40px",marginTop:"10px"}}>
          <p style={{fontSize:"20px", color:"blue",fontFamily:"italic"}}>Open Your Message Tab To Chat With Friend</p>
          
           </div>
      }
        
    </div>
  )
}
