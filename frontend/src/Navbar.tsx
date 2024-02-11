import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
  const authToken =  localStorage.getItem('authToken')
  const navigate = useNavigate()
  const signoutHandler = ()=>{
    localStorage.removeItem('authToken')
    toast.success('Logged Out successfully')
    navigate('/Login')

  }
  if(!authToken){
    toast.dismiss('Please Log In')
    navigate('/Login')
  }
  return (
    <div className='flex justify-between' >
             <div className='font-Nabla text-[36px] m-3 ml-8' >
              <Link to='/' > MyFunds</Link>
            </div>
            <div>
           {
            !authToken ? 
            null
            :
            <div className='font-Nabla text-[24px] p-4  mr-8 cursor-pointer hover:border-b-[1px] hover:border-yellow-300 duration-300 rounded-2xl ' onClick={signoutHandler} >
             Sign out
            </div>
           }
            </div>
    </div>
  )
}

export default Navbar