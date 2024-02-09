import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Dashboard = () => {
  return (
    <div className=' bg-gray-900 min-w-[100vw] min-h-[100vh] w-[100%] h-[100%] ' >
    <div>
      <Navbar />
    </div>
    <div className=' border l  border-yellow-300 border-opacity-30 rounded-xl  h-[80vh] m-4 ml-7 p-2 w-[95vw] overflow-y-auto font-Nabla text-white text-[28px] ' > 
    <div className='flex justify-between'>
    <div className='m-3'> Send Money To : </div>        
    <div className='m-3 flex gap-8'> <div>Balance :</div>  <div><img src="/coin.png" className='h-[25px] w-[25px] mt-2.5' alt="" /></div> </div>
    </div>
        <div className='flex  justify-between  border-b border-yellow-300 border-opacity-30 py-4' > 
          <div className='flex gap-5 ml-6' >
            {/* <div> <img src="./pfp.png" width={40} className='border border-yellow-300 rounded-[50%]' alt="User avatar" /> </div> */}
            <div className='text-md'> John Doe </div>
          </div>
          <div className='flex gap-2 justify-center border border-yellow-300 border-opacity-10 px-4 rounded-xl hover:bg-yellow-800 transition-all duration-[0.2s]  hover:cursor-pointer font-Nabla'>
                <div>
                  <Link to='/sendTokens' >
                    Send Tokens
                  </Link>
                </div>
                <div>
                <img src="/coin.png" className='h-[25px] w-[25px] mt-2.5' alt="" />  
                </div>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Dashboard