import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import URL from './utils/url'
import toast from 'react-hot-toast'
import Loader from './Loader'

interface user {
  id:string,
  username:string,
  password:string,
  role:string,
  account:{
    balance:number,
    id: string,
     userId:string
  }
}

const Dashboard = () => {
  const [Data, setData] = useState<user[]>([])
  const [User, setUser] = useState<user|null>(null)

  console.log(User) 
  const token = localStorage.getItem('authToken')

  useEffect(()=>{
      if(token !== undefined || token !== null ){ //fetchMyDetails
        axios.post(`${URL}/api/fetchMyDetails`,{} ,{headers:{Authorization:`Bearer ${token}`}} ).then((res)=>{
          return  setUser(res.data.user)
          })
        axios.post(`${URL}/api/bulk`, {filter:""},{headers:{Authorization:`Bearer ${token}`}} ).then((res)=>{
        return  setData(res.data.allusers)
        }).catch((err)=>{
        console.log(err)
        return toast.error(err.response.data.message)
       })
    }
  },[])

  return (
    <div className=' bg-gray-900 min-w-[100vw] min-h-[100vh] w-[100%] h-[100%] ' >
    <div>
      <Navbar />
    </div>
    {
      !Data || !User ? 
      <Loader/>
        :
    <div className=' border l  border-yellow-300 border-opacity-30 rounded-xl  h-[80vh]  m-auto p-2 w-[95vw] overflow-y-auto font-Nabla text-white text-[28px] ' > 
    <div className='flex justify-between'>
    <div className='m-3'> Send Money To : </div>        
    <div className='m-3 flex gap-6'> <div>Balance : {User !== null ? User.account.balance : null } </div>  <div><img src="/coin.png" className='h-[25px] w-[25px] mt-2.5' alt="" /></div> </div>
    </div>
        {
          Data && Data.map((users:user)=>(
              <div key={users.id} className='flex  justify-between  border-b border-yellow-300 border-opacity-30 py-4' > 
                <div className='flex gap-5 ml-6' >
                  {/* <div> <img src="./pfp.png" width={40} className='border border-yellow-300 rounded-[50%]' alt="User avatar" /> </div> */}
                  <div className='text-md'> {users.username} </div>
                </div>
                <div className='flex gap-2 justify-center border border-yellow-300 border-opacity-10 px-4 rounded-xl hover:bg-yellow-800 transition-all duration-[0.2s]  hover:cursor-pointer font-Nabla'>
                      <div>
                        <Link to={`/sendTokens/${users.id}`} >
                          Send Tokens
                        </Link>
                      </div>
                      <div>
                      <img src="/coin.png" className='h-[25px] w-[25px] mt-2.5' alt="" />  
                      </div>
                </div>
              </div>
              ))
              }
    </div>
    }
  </div>
  )
}

export default Dashboard