import React from 'react'
import { createBrowserRouter,BrowserRouter ,RouterProvider , Route , Link, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { CreatePost } from './pages/CreatePost';
import './App.css';


// const router = createBrowserRouter([{}])

const route = createBrowserRouter([{
  path:'/',
  element:<Home/>
},
{
  path:'/create-post',
  element:<CreatePost/>
}

])

const App = () => {
  return (
    <>
      <BrowserRouter>
      <header className='w-full flex justify-between items center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
      <Link to='/'>
      <div id='openai_logo'></div>
      </Link>
      <Link to="/create-post">
      <div className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create</div>
      </Link>
      </header>
      <main className='sm:p-8 px-4 py-2 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'><Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/> }/>
        </Routes></main> 
      </BrowserRouter>
    </>
  )
}

export default App;



