import { Alert, Button, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';


export const CreatePost = () => {
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
   

    console.log(formData)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
          const res = await fetch('/api/post/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (!res.ok) {
            setPublishError(data.message || "some thing is not right");
            return;
          }
    
    
          if (res.ok) {
            setPublishError(null);
            navigate(`/post/${data.slug}`);
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>

            </div>
         
         <textarea  placeholder='Write something here'   onChange={(e) => {
            setFormData({ ...formData,  content: e.target.value });
          }}/>
         <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
        
      </form>
    </div>
  )
}
