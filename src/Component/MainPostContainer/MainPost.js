import React, { useState } from 'react'
import './mainPost.css'
import ContentPost from '../ContentPostContainer/ContentPost'
import Post from '../PostContainer/Post'
import { useEffect } from 'react'
import  axios  from 'axios'
import { useSelector } from 'react-redux'
export default function MainPost() {
  const userDetails=useSelector((state)=>state.user);
  let user=userDetails?.user;
  let id=user?.other?._id;
  const accesstoken=user.accessToken
  const [post,setPost]=useState([]);
useEffect(()=>{
  const getPost=async()=>{
    try {
      const res= await axios.get(`http://localhost:5000/api/user/flw/${id}`,{
        headers:{
          token:accesstoken
        }
      })
      setPost(res.data)
    } catch (error) {
      
    }
  }
  getPost();
},[])
console.log(post);
  return (
    <div className='mainPostCntainer'>
      <ContentPost/>
      {post.map((item)=>(
          <Post post={item}/>
          
      ))}
     
    </div>
  )
}
