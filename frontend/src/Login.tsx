import axios from "axios"
import { SyntheticEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import URL from "./utils/url"
import toast from "react-hot-toast"


const Login = () => {

  const authToken = localStorage.getItem('authToken')
  if(authToken){
   window.location.href = '/'
  } 

  const [Username, setUsername] = useState('')
  const [password, setpassword] = useState('')
  const [disable, setdisable] = useState(false)
  const navigate = useNavigate()

  const LoginHandler = async(e:SyntheticEvent)=>{
    e.preventDefault()
    setdisable(true)
  try {
    const { data } = await axios.post(`${URL}/api/signin`,{
      username:Username,
      password:password
    })
    if(data.success===true){
      navigate('/')
      toast.success(data.message)
      localStorage.setItem('authToken',data.token)
    }
    setdisable(false)
  } catch (error:any) {
    setdisable(false)
    toast.error(error.response.data.message)
  }
  }

  useEffect(()=>{

  },[])
  return (

    <div className=' bg-gray-900 min-w-[100vw] min-h-[100vh]  w-[100%] h-[100%] ' >
        <div className="border-b border-yellow-300 ">
            <div className='flex' >
                <div className='font-Nabla text-[36px] m-3 ml-8' >
                MyFunds
                </div>
            </div>
        </div>
        {/* Form starts from here */}
                <div className="w-[40vw] h-[55vh] text-white border-yellow-300 border m-auto mt-12 ">
                    <div className=" text-center text-2xl m-4"> SIGN IN  </div>
                    <form >
                       <div className="flex flex-col gap-6 " >
                            <div className="m-auto w-[70%]"><input value={Username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter username" className=" w-[100%] outline-yellow-300 py-2 px-4 bg-gray-900 border-yellow-300 border border-opacity-10 " /></div>
                            <div className="m-auto w-[70%]"><input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" placeholder="Enter Password" className=" w-[100%] outline-yellow-300 py-2 px-4 bg-gray-900 border-yellow-300 border border-opacity-10 " /></div>
                            <button disabled={disable} onClick={LoginHandler} className="border-yellow-300 border border-opacity-10 py-2 m-auto w-[70%] hover:bg-yellow-300 hover:border-gray-900 hover:text-gray-900 hover:border transition-all duration-300 " type="submit">SIGN IN  </button>
                            <Link className=" text-center text-[14px] " to='/SignUp'><button className=" text-white underline">  Click here to Register   </button></Link>
                       </div>
                    </form>
                </div>
    </div>

  )
}

export default Login