import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='min-h-screen mt-20'>
         <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
            {/* letft side */}
            <div className="flex-1">
            <Link to={"/"} className=' text-4xl font-semibold dark:text-white'>
            <span className='px-2 py-2 bg-gradient-to-r from-teal-500 font-bold  to-lime-500 rounded-lg text-blue-950'>SmartBrains</span>
            Blog
         </Link>
          <p className='text-sm mt-5'>This is a Demo project. you cna sign up with your email and password or Google</p>
            </div>
            {/* right side */}
            <div className="flex-1">
                <form className='flex flex-col gap-4 '>
                    <div>
                        <Label value='Your user Name' ></Label>
                        <TextInput type='text' placeholder='username' id='username'/>
                    </div>
                    <div>
                        <Label value='Your email' ></Label>
                        <TextInput type='email' placeholder='name@company.com' id='email'/>
                    </div>
                    <div>
                        <Label value='Your password' ></Label>
                        <TextInput type='text' placeholder='*****' id='password'/>
                    </div>
                    <Button type='submit' gradientDuoTone='tealToLime'>Sign Up</Button>
                </form>
                <div className="flex gap-3 text-sm mt-5">
                    <span>Have an account?</span>
                    <Link to={"/sign-in"} className='text-teal-950'>Sign in</Link>
                </div>
            </div>
         </div>
    </div>
  )
}

export default Signup