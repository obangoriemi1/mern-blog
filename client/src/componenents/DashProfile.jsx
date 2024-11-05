import { Alert, Button, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { updateStart, updateSuccess, updateFailure } from '../redux/user/userSlice'



export const DashProfile = () => {
const {currentUser} = useSelector((state) => state.user)
 const [imageFile, setImageFile] = useState(null)
 const [imageUrl, setImageUrl] = useState(null)
 const [formData, setFormData] = useState({});
 const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
 const [updateUserError, setUpdateUserError] = useState(null);
 const dispatch = useDispatch()
 const filePickerRef = useRef()

 const hanldeImageChane = (e) =>{
    const file = e.target.files[0]
    if(file){
        setImageFile(file)
        setImageUrl(URL.createObjectURL(file))
        
    }
   
 }
   
   const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value})
   };
   const handleSubmit = async(e) =>{
    e.preventDefault()
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    if(Object.keys(formData).length === 0){
        setUpdateUserError("No changes made")
        return
    }
    try {
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

            },
            body:JSON.stringify(formData)
        })
        const data = await res.json();
        if(!res.ok){
            dispatch(updateFailure(data.message))
            setUpdateUserError(error.message);
            
        }
        else{
            dispatch(updateSuccess(data));
            setUpdateUserSuccess("User updated successfully");
        }
    } catch (error) {
        dispatch(updateFailure(error.message))
        setUpdateUserError(error.message);
    }
   }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center text-3xl font-semibold '>Profile</h1>
        <form  className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
            <input type="file" accept='image/*' onChange={hanldeImageChane} ref={filePickerRef} hidden/>
            <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() =>filePickerRef.current.click()} >
            <img className='rounded-full w-full border-8 border-[lightgray] object-cover ' src={imageUrl || currentUser.profilePicture} alt='user'/>
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}onChange={handleChange}/>
            <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}onChange={handleChange}/>
            <TextInput type='password' id='password' onChange={handleChange}/>
           <Button gradientDuoTone='tealToLime' outline type='submit'>Update</Button>
        </form>
        <div className='text-red-600 flex justify-between mt-5'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Log Out</span>
        </div>
        {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
        {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}


    </div>
  )
}
