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
      <header className='absolute bottom-0 left-0 h-16 w-16 ...'>
      <Link to='/'>
      <div className=''>here comes the open ai logo</div>
      </Link>
      <Link to="/create-post">
      <div>create button here</div>
      </Link>
      <main><Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/> }/>
        </Routes></main> 
      </header>
      </BrowserRouter>
      <h1 className='text-teal-400'>fasdkfmasldkm</h1>
    </>
  )
}

export default App;



