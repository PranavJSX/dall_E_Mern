import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormField } from '../Components/FormField';
import { Loader } from '../Components/Loader';
import { getRandomPrompt } from '../Utils/indes.js';

export const CreatePost = () => {

  const preview = 'https://leonardo-cdn.b-cdn.net/wp-content/uploads/2024/10/leoHomeUpdated-oct2024-1920x1453.jpg'

  const navigate = useNavigate();
  const [form,setForm] = useState({
    name:'',
    prompt:'',
    photo:''
  })
  const [generatingImg,setgeneratingImg]= useState(false);
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (event) =>{
    event.preventDefault();
    // console.log(form);
    if(form.prompt && form.photo){
      setLoading(true);
      try{
        console.log(form);
        const response = await fetch(`https://edsign-image-gen.onrender.com/api/v1/post`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(form), 
        })
        await response.json();
        console.log('Response: ',response)
        navigate('/')
      }catch(error){
        alert(error)
      }
      finally{
        setLoading(false);
      }
    }
    else{
      alert('Please enter a prompt and generate an image first');
    }
  }

  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handSupriseMe = () =>{
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form,prompt:randomPrompt});
  }
  const generateImage = async() =>{
    // form.prompt = 'A plush toy robot sitting on a chair staring at a yellow wall'
    if(form.prompt){
      try {
        setgeneratingImg(true);
        const respone = await fetch(`https://edsign-image-gen.onrender.com/api/v1/dalle`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body : JSON.stringify({prompt:form.prompt}),
        })
        const data = await  respone.json();
        data ? setForm({...form,photo:`${data.url}`}):'';
        // if(data ? setForm({...form,photo:`${data}`}))
        // console.log(form);
      } catch (error) {
        alert(error);
      }
      finally{
        setgeneratingImg(false);
      }
    }
    else{
      alert('Please enter a prompt');
    }
  }

  return (
    <section className='max-w-71 mx-auto'>
      <div>

      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w[500px]'>
          Create imaginative and visually stunning images generated through DALL-E AI.
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
          label = "Your name"
          type = "text"
          name = "name"
          placeholder = "John Doe"
          value = {form.name}
          handleChange = {handleChange}
          />
          <FormField
          label = "Prompt"
          type = "text"
          name = "prompt"
          placeholder = "A plush toy robot sitting on a chair staring at a yellow wall"
          value = {form.prompt}
          handleChange = {handleChange}
          isSurpriseMe
          handSupriseMe={handSupriseMe}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm 
          rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (<img src={form.photo} alt={form.prompt} className='w-full h-full object-contain'/>) :(
              <img src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40'/>
            ) }

            {generatingImg && (
              <div className='absolute insert-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader/>
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
           type='button' onClick={generateImage}>{generatingImg ? 'Generating ...' : 'Generate'}
          </button>
        </div>

        <div className='mt-10'><p className='mt-2 text-[#666e75] text-[14px]'
        >Once you have created the image you want , you can also share with the community</p>
        <button type='submit' className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto
        px-5 py-2.5 text-center'
        > {loading ? 'Sharing ...' : 'Share with the community'}</button>
        </div>
      </form>
      </div>
    </section>
  )
}
