import React, { useEffect, useState } from 'react'
import './post.css';
import Profileimage from '../Images/Profile.png'
import LikeIcon from '../Images/like.png'
import CommentIcon from '../Images/speech-bubble.png'
import ShareIcon from '../Images/share.png'
import MoreOption from '../Images/more.png'
import authorLikeIcon from '../Images/setLike.png'

import axios from 'axios';
import { useSelector } from 'react-redux';
export default function Post({post}) {
    const userDetails= useSelector((state)=>state.user);
    let users=userDetails?.user
    
    
    const [user,setuser]=useState([]);
    useEffect(()=>{
        const getuser=async()=>{
            try {
                const res=await axios.get(`http://localhost:5000/api/user//post/user/details/${post.user}`)
                setuser(res.data);
            } catch (error) {
                console.log("Some Error Occured")
            }
        }
        getuser();
    },[])

    const userId=users.other._id;
    const accessToken=users.accessToken;
    const [Like, setLike] = useState([post.like.includes(userId)? authorLikeIcon: LikeIcon]);
    const [count, setCount] = useState(post.like.length);
    const [Comments, setComments] = useState(post.comments);
    const [commentwriting, setCommentwritings] = useState('');
    const [show, setshow] = useState(false);
    
   console.log(post);

    const handleLike = async() => {
        if (Like == LikeIcon) {
            await fetch(`http://localhost:5000/api/post/${post._id}/like`,{method:"PUT", headers:{'Content-Type':"application/Json",token:accessToken}})
            setLike(authorLikeIcon);
            setCount(count + 1);
        } else {
             await fetch(`http://localhost:5000/api/post/${post._id}/like`,{method:"PUT", headers:{'Content-Type':"application/Json",token:accessToken}})
            setLike(LikeIcon);
            setCount(count - 1);
        }
    }
    const addComment = async() => {
        const comment = {
            'postid': `${post._id}`,
            'username': `${users.other.username}`,
            'comment': `${commentwriting}`,
            'profile':`${users.other?.profile}`

        }
        await fetch(`http://localhost:5000/api/post/comment/post`,{method:"PUT", headers:{'Content-Type':"application/Json",token:accessToken},body:JSON.stringify(comment)})
        setComments(Comments.concat(comment));
    }
    const handleComment = () => {
        addComment()
    }
    console.log(Comments);

    const handleshow=()=>{
        if (show === false){
             setshow(true)
        }else{
            setshow(false)
        }
    }
    console.log(user)
    return (
        <div className='PostContainer'>
            <div className='subPostConatiner'>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {user.profile === ""? <img src={`${Profileimage}`} className='PostImage' alt="" /> :  <img src={`${user.profile}`} className='PostImage' alt="" />}
                       
                        <div>
                            <p style={{ marginLeft: '5px', textAlign: 'start' }}>{user.username}</p>
                            <p style={{ fontSize: '10px', textAlign: 'start', marginLeft: 4, marginTop: -13, color: '#aaa' }}>Following By Sambar</p>
                        </div>
                        <img src={`${MoreOption}`} className='moreIcon' alt="" />
                    </div>
                    <p style={{ textAlign: 'start', width: '96%', marginLeft: 10, marginTop: 0 }}>{post.title}</p>
                    {post.image !== '' ? 
           <img src={`${post.image}`} className="PostImages" alt="" />: post.video !== '' ? <video className="PostImages" width="400" height="500" controls >
           <source src={`${post.video}`} type="video/mp4"/>
          </video> : ''
          }
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', marginLeft: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                            <img src={`${Like}`} className="iconsforPost" onClick={handleLike} alt="" />
                            <p style={{ marginLeft: "6px" }}>{count}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20, cursor: 'pointer' }}>
                                <img src={`${CommentIcon}`} className='iconsforPost' onClick={handleshow} alt="" />
                                <p style={{ marginLeft: '4px', fontsize: '16px' }}>{Comments.length} </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 220, cursor: 'pointer' }}>
                            <img src={`${ShareIcon}`} className='iconsforPost' alt="" />
                            <p style={{ marginLeft: '6px' }}>Share</p>
                        </div>
                    </div>
                    {show === true ?
                    <div style={{padding:'6px'}}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={`${users.other.profile}`} className='PostImage' alt="" />
                        <input type="text" className='commentinput' placeholder='write your thought' onChange={(e) => setCommentwritings(e.target.value)} />
                        <button className='addCommentbtn' onClick={handleComment}>Post</button>
                    </div>
                    {Comments.map((item) => (

                        <div style={{ alignItems: 'center' }}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <img src={`${item.profile}`} className='PostImage' alt="" />
                                <p style={{ marginLeft: '6px' ,fontSize:17,marginTop:6}}>{item.username}</p>
                            </div>
                            <p style={{ marginLeft: '57px',textAlign:'start', marginTop:-16 }}>{item.comment}</p>
                            <p style={{ marginLeft: '57px',textAlign:'start', marginTop:-10, color:'#aaa',fontSize:12 }}>Reply</p>
                        </div>
                    ))}
                </div>:''
                }
                    
                </div>
            </div>
        </div>
    )
}
