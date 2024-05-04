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
        {/* <Route
            path="/navbar"
            element={<Navbar onSearchChange={handleSearchChange} />}
          /> */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={<Home searchTerm={searchTerm} />}
          />
          <Route path="/CreateBlog" element={<CreateBlog />} />
          <Route path="/viewblog" element={<ViewBlog />} />
          <Route path="/updateblog" element={<UpdateBlog />} />
          {/* Ensure that onSearchChange is passed to Navbar component */}
         
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
