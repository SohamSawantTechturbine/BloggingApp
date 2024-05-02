import { useState } from 'react'

import './App.css'
import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { AuthContextProvider } from './components/Context/Authcontext'
import CreateBlog from './components/CreateBlog/CreateBlog'
import ViewBlog from './ViewBlog/ViewBlog'
import UpdateBlog from './components/UpdateBlog/UpdateBlog'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <BrowserRouter>
      <AuthContextProvider>
       <Routes>
       <Route path="/" element={<Login />}/>
       <Route path="/register" element={<Register />}/>
       <Route path="/home" element={<Home />}/>
       <Route path="/CreateBlog" element={<CreateBlog/>}/>
       <Route path="/viewblog" element={<ViewBlog/>}/>     
       <Route path="/updateblog"element={<UpdateBlog/>}/>
       </Routes>
    
       </AuthContextProvider>
      </BrowserRouter>
   
    </>
  )
}

export default App
