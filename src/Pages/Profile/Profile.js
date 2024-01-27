import React from 'react'
import './profile.css'
import Navbar from '../../Component/Navbar/Navbar'
import ProfileLeftbar from '../../Component/ProfileLeftsidecontainer/ProfileLeftbar'
import ProfileRightbar from '../../Component/ProfileRightsideContainer/ProfileRightbar'
import ProfileMainPost from '../../Component/ProfileMainPostContainer/ProfileMainPost'
import { useSelector } from 'react-redux'
export default function Profile() {
  const userDetails= useSelector((state)=>state.user);
  let user=userDetails.user
  console.log(user)
  return (
    <div className='ProfileContainer'>
      <Navbar/>
      <div className='subProfileContainer'>
        <ProfileLeftbar/>
        <ProfileMainPost/>
        <ProfileRightbar/>
      </div>
    </div>
  )
}
