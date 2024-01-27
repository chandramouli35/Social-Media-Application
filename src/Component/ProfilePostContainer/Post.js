import React, { useEffect, useState } from 'react'
import './post.css';
import Profileimage from '../Images/Profile.png'
//import LikeIcon from '../Images/like.png'
import CommentIcon from '../Images/speech-bubble.png'
import ShareIcon from '../Images/share.png'
import MoreOption from '../Images/more.png'

import axios from 'axios';
//import authorLikeIcon from '../Images/setLike.png'

//import axios from 'axios';
export default function Post({detail}) {
    console.log(detail)
    //const [count, setCount] = useState(0);
    const [Comments, setComments] = useState([]);
    const [commentwriting, setCommentwritings] = useState('');
    const [show, setshow] = useState(false);

    const [user,setuser]=useState([]);
    useEffect(()=>{
        const getuser=async()=>{
            try {
                const res=await axios.get(`http://localhost:5000/api/user//post/user/details/${detail.user}`)
                setuser(res.data);
            } catch (error) {
                console.log("Some Error Occured")
            }
        }
        getuser();
    },[])
   console.log(user)

   // const handleLike = async () => {
        //if (Like == LikeIcon) {
            // await fetch(`http://localhost:5000/api/post/${post._id}/like`,{method:"PUT", headers:{'Content-Type':"application/Json",token:accessToken}})
            //setLike(authorLikeIcon);
            //setCount(count + 1);
        //} else {
         // await fetch(`http://localhost:5000/api/post/${post._id}/like`,{method:"PUT", headers:{'Content-Type':"application/Json",token:accessToken}})
            //setLike(LikeIcon);
            //setCount(count - 1);
       // }
    //}
    const addComment = () => {
        const comment = {
            'id': '64f5d8c33a78033700573222',
            'username': 'hanuman',
            'title': `${commentwriting}`
        }
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
   // console.log(user)
    return (
        <div className='PostContainer'>
            <div className='subPostConatiner'>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                       <img src={`${user.profile}`} className='PostImage' alt="" /> 
                       
                        <div>
                            <p style={{ marginLeft: '5px', textAlign: 'start' }}>{user.username}</p>
                            <p style={{ fontSize: '10px', textAlign: 'start', marginLeft: 4, marginTop: -13, color: '#aaa' }}>Following By Sambar</p>
                        </div>
                        <img src={`${MoreOption}`} className='moreIcon' alt="" />
                    </div>
                    <p style={{ textAlign: 'start', width: '96%', marginLeft: 10, marginTop: 0 }}>{detail.title}</p>
                    <img src={`${detail.image}`} className='PostImages' alt="" />
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'flex', marginLeft: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                {/*<img src={`${Like}`} className='iconsforPost' onClick={handleLike} alt="" />*/}
                                {/*<p style={{ marginLeft: '4px', fontsize: '16px' }}>{detail.like.length} </p>*/}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 20, cursor: 'pointer' }}>
                               {/* <img src={`${CommentIcon}`} className='iconsforPost' onClick={handleshow} alt="" />
                                <p style={{ marginLeft: '4px', fontsize: '16px' }}>{detail.comments.length} </p>*/}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 220, cursor: 'pointer' }}>
                            {/*<img src={`${ShareIcon}`} className='iconsforPost' alt="" />
                            <p style={{ marginLeft: '6px' }}>Share</p>*/}
                        </div>
                    </div>
                    {show === true ?
                    <div style={{padding:'6px'}}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={`${Profileimage}`} className='PostImage' alt="" />
                        <input type="text" className='commentinput' placeholder='write your thought' onChange={(e) => setCommentwritings(e.target.value)} />
                        <button className='addCommentbtn' onClick={handleComment}>Post</button>
                    </div>
                    {Comments.map((item) => (

                        <div style={{ alignItems: 'center' }}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <img src={`${Profileimage}`} className='PostImage' alt="" />
                                <p style={{ marginLeft: '6px' ,fontSize:17,marginTop:6}}>{item.username}</p>
                            </div>
                            <p style={{ marginLeft: '57px',textAlign:'start', marginTop:-16 }}>{item.title}</p>
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
