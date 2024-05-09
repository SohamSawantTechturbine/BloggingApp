import React, { useEffect, useState } from 'react';
import { Navbar}  from '../Navbar/Navbar';
import { Link } from 'react-router-dom'
import { useAuthContext } from '../Context/Authcontext';
import { useNavigate, useLocation } from 'react-router-dom';
import coursel from '../../assets/Untitled.png'
import Dropdown from './Dropdown';
function Home({searchTerm}) {
  const { isLogin } = useAuthContext();
  const [username, setUsername] = useState('user');
  console.log(searchTerm);
  const [Blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.search ? new URLSearchParams(location.search).get('category') : null;

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [isLogin]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch("http://localhost:5000/displayBlog", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({}) 
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBlog(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogData();
  }, []);

  // const filteredBlog = search ? category ? Blog?.filter(item => item.category === category) : Blog;
  const filteredBlog = searchTerm
  ? Blog?.filter(item => item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  : category
    ? Blog?.filter(item => item.category === category)
    : Blog;

  const handleview = (blog) => {
    console.log(blog);
    navigate('/viewblog', { state: { blog } });
  };

  return (
    <div>
       <img className="w-full h-100" src={coursel} alt="img" />
    <div className="flex flex-col h-full bg-red-300">
    {/* <Navbar /> */}
   
    
    <div className="flex flex-grow mt-4 ml-2 ">
      <div className=" mt-2 w-1/6 bg-white rounded-lg overflow-hidden shadow-lg h-100">
     

        <table className=" mt-2 w-full text-sm text-left rtl:text-right border border-black text-black">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-2" onClick={() => navigate(`/home`)}>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border border-black'>
              <td className="py-2" onClick={() => navigate(`/home?category=Music`)}>Music</td>
            </tr>
            <tr className='border border-black'>
              <td className="py-2" onClick={() => navigate(`/home?category=Movies`)}>Movies</td>
            </tr>
            <tr className='border border-black'>
              <td className="py-2" onClick={() => navigate(`/home?category=Sports`)}>Sports</td>
            </tr>
            <tr className='border border-black'>
              <td className="py-2" onClick={() => navigate(`/home?category=Tech`)}>Tech</td>
            </tr>
            <tr className='border border-black'>
              <td className="py-2" onClick={() => navigate(`/home?category=Fashion`)}>Fashion</td>
            </tr>
          </tbody>
        </table>
        {/* <div className='mt-6'> 
           <Dropdown/>
      </div> */}


      </div>
      
      <div className="w-5/6 "> {/* Adjusted width */}
        <div className='py-2 ml-3 grid grid-cols-3 gap-4'>
          {filteredBlog?.map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 aspect-w-2 aspect-h-2 border border-black" onClick={() => handleview(item)} style={{ minWidth: '60px', minHeight: '60px' }}>
              <img className="w-full h-32 object-cover" src={`http://localhost:5000${item.file}`} alt='image' />
              <div className="px-4 py-3">
                <div className="font-bold text-lg mb-1">Title:-{item.title}</div>
                <p className="text-gray-700 text-sm mb-2">Description:-{item.desc}</p>
                <h2 className="text-black text-lg mb-2">Author:-{item.username}</h2>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">category:-{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  </div>
  );
}

export default Home;
