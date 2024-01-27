import React, { useEffect ,useState} from 'react'
import './rightbar.css'
import ads from '../Images/ads.jpg'
import Follow from './Follow'
import image1 from '../Images/image1.jpg'
import image2 from '../Images/image2.jpg'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function Rightbar() {
  const userDetails= useSelector((state)=>state.user);
  let user=userDetails?.user
  const id = user?.other?._id
  const [users,setusers]=useState([]);
  useEffect(() => {
    const getuser = async()=>{
      try {
        const res  = await axios.get(`http://localhost:5000/api/user/all/user/${id}`)
        setusers(res.data);
      } catch (error) {
        console.log("Some error occured")
      }
    }
    getuser();
  }, [])
  console.log(users)
  return (
    <div className='rightbar'>
      <div className='rightcontainer'>
        <div className='adsContainer'>
            <img src={`${ads}`}  className='adsimg' alt=""/>
            <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>CodeDemy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy codedemy course</p>
          </div>
        </div>
        <div className='adsContainer'>
            <img src={`${image1}`}  className='adsimg' alt=""/>
            <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>CodeDemy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy codedemy course</p>
          </div>
        </div>
        <div className='adsContainer'>
            <img src={`${image2}`}  className='adsimg' alt=""/>
            <div>
            <p style={{ textAlign: 'start', marginLeft: '10px', marginTop: -20 }}>CodeDemy</p>
            <p style={{ textAlign: 'start', marginLeft: '10px', fontSize: "12px", marginTop: "-16px" }}>Buy codedemy course</p>
          </div>
        </div>
      </div>
      <div className='rightcontainer2'>
        <h3 style={{textAlign:'start',marginLeft:'10px'}}>Suggested for you</h3>
        {users.map((item)=>(
          <Follow  userdetails={item}/>
            
     ))}
    
           
    </div>
    </div>
      
  )
}
