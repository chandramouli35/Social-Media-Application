import React from 'react'
import './home.css'
import Navbar from '../../Component/Navbar/Navbar'
import Leftbar from '../../Component/Leftsidecontainer/Leftbar'
import MainPost from '../../Component/MainPostContainer/MainPost'
import Rightbar from '../../Component/RightsideContainer/Rightbar'
import { useSelector } from 'react-redux'
export default function Home() {
  const userDetails= useSelector((state)=>state.user);
  let user=userDetails.user
  console.log(user)
  return (
    <div className='home'>
      <Navbar/>
      <div className='ComponentContainer'>
        <Leftbar/>
        <MainPost/>
        <Rightbar/>
      </div>
    </div>
  )
}
