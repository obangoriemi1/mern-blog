import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../componenents/OAuth'

const Signin = () => {
    const [formData, setFormData] = useState({})
   
    const {loading, error: errorMessage} = useSelector(state => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleChange = (e) =>{
       
        setFormData({...formData, [e.target.id]: e.target.value.trim() })
    };
    const handleSubmit = async(e) =>{
       e.preventDefault()
       if(!formData.email || !formData.password){
        return dispatch(signFailure("please fill out all fields"));
       }
       try {
       dispatch(signInStart())
        const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        if(data.success === false){
           dispatch(signFailure(data.message))
        }
       
       if(res.ok){
        dispatch(signInSuccess(data))
        navigate("/")
       }
       } catch (error) {
         dispatch(signFailure(error.message))
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
          <p className='text-sm mt-5'>This is a Demo project. you cna sign in with your email and password or Google</p>
            </div>
            {/* right side */}
            <div className="flex-1">
                <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
                
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
                        ) : "Sign in"
                       }
                    </Button>
                    <OAuth/>
                </form>
                <div className="flex gap-3 text-sm mt-5">
                    <span>Dont have an account?</span>
                    <Link to={"/sign-up"} className='text-teal-950'>Sign up</Link>
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

export default Signin
