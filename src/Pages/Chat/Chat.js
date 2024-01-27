import React from 'react'
import Navbar from '../../Component/Navbar/Navbar'
import Contact from '../../Component/Contact/Contact'
//import ChatContainer from '../../Component/ChatContainer/ChatContainer'


export default function Chat() {
  return (
    <div>
        <Navbar/>
        <div style={{display:'flex'}}>
           <Contact/>
           
      </div>
    </div>
  )
}
