import { Link } from "react-router-dom"

const Login = () => {
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
                <div className="w-[40vw] h-[55vh] border-yellow-300 border m-auto mt-12 ">
                    <div className="font-Bungee-Spice text-center text-2xl m-4"> SIGN IN  </div>
                    <form action="">
                       <div className="flex flex-col gap-6 font-Bungee-Spice" >
                            <div className="m-auto w-[70%]"><input type="text" placeholder="Enter username" className=" w-[100%] outline-yellow-300 py-2 px-4 bg-gray-900 border-yellow-300 border border-opacity-10 " /></div>
                            <div className="m-auto w-[70%]"><input type="text" placeholder="Enter Password" className=" w-[100%] outline-yellow-300 py-2 px-4 bg-gray-900 border-yellow-300 border border-opacity-10 " /></div>
                            <button className="border-yellow-300 border border-opacity-10 py-2 m-auto w-[70%]" type="submit">SIGN IN  </button>
                            <Link className=" text-center text-[10px] " to='/SignUp'><button className=" text-white underline">  Click here to Register   </button></Link>
                       </div>
                    </form>
                </div>
    </div>

  )
}

export default Login