import React, { useState ,useEffect} from 'react';
import { Navbar } from '../Navbar/Navbar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuthContext } from '../Context/Authcontext';
import { useNavigate } from 'react-router-dom';

import  Laptop  from '../../assets/laptop.jpg';
function CreateBlog() {
  const navigate = useNavigate();
  const { isLogin } = useAuthContext();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(`${Laptop}`);
  const [fileshow, setFileshow] = useState("https://i.pinimg.com/736x/90/07/5b/90075b356eb2f0cf95e08b53a719f669.jpg");
  const categories = ['Music', 'Movies', 'Sports', 'Tech', 'Fashion'];
  const username = localStorage.getItem('username');
  const userid=localStorage.getItem('userid');
  useEffect(()=>{
    console.log(fileshow);
   },[fileshow])
  const addPost = async (e) => {

    e.preventDefault();
     if(userid){
    const formData = new FormData();
    formData.append('username', username);
    formData.append('token', localStorage.getItem('token'));
    formData.append('file', file );
    
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('category', category);
    formData.append('loginid',userid);
       console.log(file);
    try {
      const response = await axios.post('http://localhost:5000/add-post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        toast.success('Posted successfully');
      } else {
        toast.error('Failed to post. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding post:', error);
      toast.error('An error occurred. Please try again later.');
    }}else{
      navigate("/")
    }
  };

//   const handleFileChange = (e) => {
//     const reader = new FileReader();
//         reader.onload = () => {
//             if (reader.readyState === 2) {
//                 setFileshow(reader.result);
//             }
//         };
// setFile(e.target.files[0]);
//   };

const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setFileshow(reader.result);
            }
        };
        reader.readAsDataURL(selectedFile);
        setFile(selectedFile);
    }
};


  return (
    <>
     <div className="flex flex-col h-screen">
                {/* <Navbar /> */}
                <form method='POST' encType="multipart/form-data" onSubmit={addPost} >
                <img className="w-full h-80" src={fileshow} alt="oops" />
                <div className="flex ml-5 mt-3">
                    <div>
                        <label htmlFor="fileInput">
                            <img className="w-10 mt-3" src="data:image/png;base64,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" />
                        </label>
                    </div>
                    <div className="ml-2">
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange} 
                        />
                        <input
                            className="w-80 ml-5 py-2 px-8 border-black border"
                            type="text"
                            placeholder="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <button
                            
                            type='submit'
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center me-2 mb-2 mr-2 mt-5"
                        >
                            Post
                        </button>
                    </div>
                </div>
                <div className="flex ml-2 h-40">
                    <textarea
                        className="w-full border border-black"
                        placeholder="description"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
<select
                            className=" h-10 w-80 ml-5 py-2 px-8 border-black border"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        >
                            <option value="">Select category</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>

                </div>
                </form>
            </div>
    </>
  );
}

export default CreateBlog;
