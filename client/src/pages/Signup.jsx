import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../componenents/OAuth'

const Signup = () => {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleChange = (e) =>{
       
        setFormData({...formData, [e.target.id]: e.target.value.trim() })
    };
    const handleSubmit = async(e) =>{
       e.preventDefault()
       if(!formData.username || !formData.email || !formData.password){
        return setErrorMessage("please fill out all fields")
       }
       try {
        setLoading(true)
        setErrorMessage(null)
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if(data.success === false){
            return setErrorMessage(data.message);
        }
        setLoading(false)
       if(res.ok){
        navigate("/sign-in")
       }
       } catch (error) {
           setErrorMessage(error.message)
           setLoading(false)
       }
    }
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
                <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                    <div>
                        <Label value='Your user Name' ></Label>
                        <TextInput type='text' placeholder='username' id='username' onChange={handleChange}/>
                    </div>
                    <div>
                        <Label value='Your email' ></Label>
                        <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>
                    </div>
                    <div>
                        <Label value='Your password' ></Label>
                        <TextInput type='password' placeholder='*****' id='password' onChange={handleChange}/>
                    </div>
                    <Button type='submit' gradientDuoTone='tealToLime' disabled={loading}>
                       {
                        loading ? (
                            <>
                            <Spinner size='sm'/>
                            <span className='pl-3'>Loading....</span>
                            </>
                        ) : "Sign Up"
                       }
                    </Button>
                    <OAuth/>
                </form>
                <div className="flex gap-3 text-sm mt-5">
                    <span>Have an account?</span>
                    <Link to={"/sign-in"} className='text-teal-500 font-bold'>Sign in</Link>
                </div>
                {
                    errorMessage&& (
                        <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
                    )
                }
            </div>
         </div>
    </div>
  )
}

export default Signup