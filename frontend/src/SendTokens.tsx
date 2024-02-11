import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import axios from "axios"
import URL from "./utils/url"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const SendTokens = () => {
  const navigate = useNavigate()
  const authToken =  localStorage.getItem('authToken')
  if(!authToken){
    toast.dismiss('Please Log In')
    navigate('/Login')
  }
  const [Amount, setAmount] = useState<number>()
  const [ToAccount, setToAccount] = useState<string>()
  const sendTokenHandler = async()=>{
    const authToken = localStorage.getItem('authToken')
    if(authToken !== undefined || authToken !== null){
      const { data } = await axios.post(`${URL}/api/transferFunds/${window.location.pathname.split('/')[2]}`,
      { amount:Amount } ,
      { headers:{Authorization:`Bearer ${authToken}`}})
      if(data){
        toast.success(data.message)
        navigate('/')
      } 
    }
  }

  useEffect(()=>{
    const authToken = localStorage.getItem('authToken')
    console.log()
    if(authToken !== undefined || authToken !== null){
      axios.get(`${URL}/api/getAccountDetails?token=`,{headers:{Authorization:`Bearer ${authToken}`}}).then((res)=>{
        return setToAccount(res.data.accountBalance.user.username)
      })
    }
  },[])

  return (
    <div className=' bg-gray-900 min-w-[100vw] min-h-[100vh] w-[100%] h-[100%] ' >
        <div>
        <Navbar />
        </div>
        <div>
         <div className=' border l  border-yellow-300 border-opacity-30 rounded-xl  h-[80vh] justify-center  p-2 w-[50vw] m-auto overflow-y-auto font-Nabla text-white text-[28px] ' >
            <div className='text-md font-Nabla text-center'> Transferring Tokens to : {ToAccount} </div>
            <div className="w-[50%] m-auto flex flex-col gap-8 my-5" >
                <div className="text-md " >
                    <input type="number" value={Amount} onChange={(e)=>setAmount(parseInt(e.target.value))} placeholder="Enter Amount" className="px-2 py-2 bg-gray-900 overflow-hidden scroll-y-0 border border-yellow-300 border-opacity-10 outline-yellow-300 outline-1 " />
                </div>
                {/* send token button */}
                 <div>
                        <div className='flex py-3 gap-2 justify-center border border-yellow-300 border-opacity-10 px-4 rounded-xl hover:bg-yellow-800 hover:border-opacity-40 transition-all duration-[0.2s]  hover:cursor-pointer font-Nabla'>
                        <div onClick={sendTokenHandler} >
                            Send Tokens
                        </div>
                        <div>
                        <img src="/coin.png" className='h-[25px] w-[25px] mt-2.5' alt="" />  
                        </div>
                        </div>
                  </div>
             </div>
        </div>
      </div>
    </div>
  )
}

export default SendTokens