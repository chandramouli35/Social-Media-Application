import React, { useEffect, useState } from 'react'
import './profileleftbar.css'
import image from '../Images/Profile.png'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
export default function ProfileLeftbar() {
  let location = useLocation();
  let id=location.pathname.split("/")[2];
  console.log(id)
  const userDetails= useSelector((state)=>state.user);
  let user=userDetails?.user
  const [Follow , setUnFollow] = useState([user.other.Following.includes(id) ? "Unfollow" : "Follow"]);
  const accessToken=user.accessToken
  console.log(accessToken)
  //const id=user?.other?._id
  let username=user?.other?.username
  
  const [users,setusers]=useState([]);
  useEffect(()=>{
    const getuser=async()=>{
        try {
            const res=await axios.get(`http://localhost:5000/api/user//post/user/details/${id}`)
            setusers(res.data);
        } catch (error) {
            console.log("Some Error Occured")
        }
    }
    getuser();
},[])
let followersCounter=users?.Followers?.length;
let followingCounter=users?.Following?.length;
console.log(users);
  const [Followinguser, setFollowinguser]=useState([]);
  useEffect(() => {
          const getFollowing=async()=>{
          try {
                const res= await axios.get(`http://localhost:5000/api/post/following/${id}`);
                setFollowinguser(res.data);
              } catch (error) {
                    console.log("Error Occured") 
               }
          }
          getFollowing();
        }, [])
        
        const handleFollow = async()=>{
          if(Follow === "Follow"){
            await fetch(`http://localhost:5000/api/user/following/${id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , token:accessToken} , body:JSON.stringify({user:`${user.other._id}`})})
            setUnFollow("UnFollow")
          }else{
            await fetch(`http://localhost:5000/api/user/following/${id}` , {method:'PUT', headers:{'Content-Type':"application/JSON" , token:accessToken} , body:JSON.stringify({user:`${user.other._id}`})})
            setUnFollow("Follow")
          }
        }
        console.log(Followinguser);
    return (
        <div className='ProfileLeftbar'>
            <div className='NotificationsContainer'>
                     <img src={`${image}`} className='ProfilepageCover' alt=""/>
                     <div style={{display:'flex', alignItems:'center', marginTop:-30}}>
                          <img src={`${users.profile}`} className='Profilepageimage' alt=""/>
                          <div>
                               <p style={{marginLeft:6,marginTop:22, color:'black',textAlign:'start'}}>{users.username}</p>
                               <p style={{marginLeft:6, color:'black',textAlign:'start',marginTop:-16,fontSize:12}}>Software Developer</p>  
                          </div>    
                    </div>   
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                      <p style={{color:'black', marginLeft:20, fontSize:'14px'}}>Followings</p>  
                      <p style={{color:'black', marginRight:20, fontSize:'12px', marginTop:17}}>{followingCounter}</p>
                    </div> 
                    
                    <div style={{display:'flex', justifyContent:'space-between', marginTop:-20}}>
                      <p style={{color:'black', marginLeft:20, fontSize:'14px'}}>Followers</p>  
                      <p style={{color:'black', marginRight:20, fontSize:'12px', marginTop:17}}>{followersCounter}</p>
                    </div> 
                   
                    <div style={{marginTop:-20}}>
                      <h5 style={{color:'black', marginLeft:10, fontSize:'14px', marginRightt:30,marginTop:30,textAlign:'start'}}>Userbio</h5>  
                      <p style={{color:'black', fontSize:'12px', marginTop:-20, textAlign:'start', marginLeft:"10px"}}>I am Very Passionate about MY job. I waork in my dream compant</p>
                    </div> 
                    {user.other._id !== id ? <div onClick={handleFollow}> <button style={{width:'100%',paddingTop:7, paddingBottom:7, border:'none',backgroundColor:'blue',color:'white'}}>{Follow}</button></div>:<div> <button style={{width:'100%',paddingTop:7, paddingBottom:7, border:'none',backgroundColor:'blue',color:'white'}}>Edit Bio</button></div>}
                    
            </div>
            <div className='NotificationsContainer'>
                    <h3>Following</h3>
                    <div style={{display:'flex', justifyContent:"space-between"}}>
                        <p style={{marginLeft:10}}>Friends</p>
                        <p  style={{marginRight:10, color:'#aaa'}}>See All</p>
                    </div>
                    <div style={{display:'flex', flexWrap:'wrap', marginLeft:5}}>
                        {Followinguser.map((item)=>(
                          <Link to={`/profile/${item._id}`}>
                                 <div style={{marginLeft:4,  cursor:'pointer'}} key={item._id}>
                                 <img src={`${item.profile}`}  className="friendimage" alt=""/>
                                 <p style={{marginTop:-3}}>{item.username}</p>
                         </div>
                         </Link>
                        ))}
                       
                       
                    </div>
            </div>

        </div>
      
    )
}
