import { Button, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'


export const DashProfile = () => {
const {currentUser} = useSelector((state) => state.user)
 const [imageFile, setImageFile] = useState(null)
 const [imageUrl, setImageUrl] = useState(null)
 const filePickerRef = useRef()

 const hanldeImageChane = (e) =>{
    const file = e.target.files[0]
    if(file){
        setImageFile(file)
        setImageUrl(URL.createObjectURL(file))
    }
   
 }
   
   
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center text-3xl font-semibold '>Profile</h1>
        <form  className='flex flex-col gap-4 '>
            <input type="file" accept='image/*' onChange={hanldeImageChane} ref={filePickerRef} hidden/>
            <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() =>filePickerRef.current.click()} >
            <img className='rounded-full w-full border-8 border-[lightgray] object-cover ' src={imageUrl || currentUser.profilePicture} alt='user'/>
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
            <TextInput type='password' id='password' />
           <Button gradientDuoTone='tealToLime' outline type='submit'>Update</Button>
        </form>
        <div className='text-red-600 flex justify-between mt-5'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Log Out</span>
        </div>
    </div>
  )
}
