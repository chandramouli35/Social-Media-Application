import React, { useEffect, useState } from 'react'
import './profilemainPost.css'
import coverImage from '../Images/Profile.png'
import ContentPost from '../ContentPostContainer/ContentPost'
import Post from '../ProfilePostContainer/Post'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
export default function ProfileMainPost() {
  const [post, setPost]=useState([]);
  let location = useLocation();
  let id=location.pathname.split("/")[2];
  //const accesstoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjVjNWYzNWJjNjUzM2NjMDNhNzM1NiIsInVzZXJuYW1lIjoiSmFpIFNyZWUgUmFtIiwiaWF0IjoxNjkzODI5MDk5fQ.LCS-asPiWoISsXeI2nYn2WfWoF-h-cEoF9IhnyipSps"
  useEffect(()=>{
    const getPost=async()=>{
      try {
        const res=await axios.get(`http://localhost:5000/api/post/get/post/${id}`)
        setPost(res.data);
      } catch (error) {
        console.log("Error Occured")
      }
     
    }
    getPost();
  },[])
  return (
    <div className='ProfilemainPostContainer'>
      <div>
        <img src={`${coverImage}`} className='profileCoverimage' alt=""/>
        <h2 style={{marginTop:-43, color:'white', textAlign:'start',marginLeft:'34px'}}>Your Profile</h2>
      </div>
      <ContentPost/>
      {post.map((item)=>(
        <Post detail={item}/>
      ))}
      
    </div>
  )
}
