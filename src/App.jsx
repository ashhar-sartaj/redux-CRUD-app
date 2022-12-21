import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Posts from './components/Posts'
import CreatePosts from './components/CreatePosts'

function App() {
  return (
    <>
    <BrowserRouter>
    <div className='container'>
      <Routes>
        <Route path='/' element={<Posts/>}></Route>
        <Route path='/createposts' element={<CreatePosts/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
