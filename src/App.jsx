// App.js
import React, { useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/Context/Authcontext';
import CreateBlog from './components/CreateBlog/CreateBlog';
import ViewBlog from './ViewBlog/ViewBlog';
import UpdateBlog from './components/UpdateBlog/UpdateBlog';
import { Navbar } from './components/Navbar/Navbar'; // Ensure the correct import path
import Contact from './components/Contactus/Contact';
import Followed from './components/Followed/Followed';
import Bookmark from './components/Bookmark/Bookmark';
import Statics from './components/Statics/Statics';
import Forgetpassword from './components/Forgetpassword/Forgetpassword';
import Otp from './components/Forgetpassword/Otp';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <BrowserRouter>
      <AuthContextProvider>
      <Navbar onSearchChange={handleSearchChange} />
        <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={<Home searchTerm={searchTerm} />}
          />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/viewblog" element={<ViewBlog />} />
          <Route path="/updateblog" element={<UpdateBlog />} />
          <Route path="/contact" element={<Contact/>}/>
         <Route path="/follow" element={<Followed/>}/>
         <Route path="/bookmark" element={<Bookmark/>}/>
         <Route path="/statics" element={<Statics/>}/>
         <Route path="/forgetpassword" element={<Forgetpassword/>}/>
         <Route path="/otp" element={<Otp/>}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
