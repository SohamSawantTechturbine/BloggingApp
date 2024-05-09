import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
function Bookmark() {
    const loggedInid = localStorage.getItem('userid');
    const [bookmark, setBookmark] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(loggedInid){
        const fetchUserBookmark = async () => {
            try {
                const response = await fetch("http://localhost:5000/getbookmark-data", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ loggedInid })
                });
                const data = await response.json();
                setBookmark(data.blogdata);
            } catch (error) {
                // toast.warning("Server is down");
                console.error('Error:', error);
            }
        };
        fetchUserBookmark();   }else{
            toast.warning("login first")
        }
       
    }, []);

    console.log(bookmark);
    
  const handleview = (blog) => {
    console.log(blog);
    navigate('/viewblog', { state: { blog } });
  };


    return (
        
        <div>
            <ToastContainer />
            {loggedInid&&bookmark.length === 0 ? (
                <p>You haven't Bookmark anyone yet.</p>
            ) : (
                <div className=" mt-4 grid grid-cols-3 gap-4 ">
                    {loggedInid&&bookmark.map((item ,index )=> (
                        
                            <div key={index} className="border border-black bg-white rounded-lgoverflow-hidden shadow-lg transform transition duration-300 hover:scale-105 aspect-w-2 aspect-h-2 border border-black" onClick={() => handleview(item)} style={{ minWidth: '60px', minHeight: '60px' }}>
              <img className="w-full h-32 object-cover" src={`http://localhost:5000${item.file}`} alt='image' />
              <div className="px-4 py-3">
                <div className="font-bold text-lg mb-1">Title:-{item.title}</div>
                <p className="text-gray-700 text-sm mb-2">Description:-{item.desc}</p>
                <h2 className="text-black text-lg mb-2">Author:-{item.username}</h2>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">category:-{item.category}</span>
              </div>
            </div>
                    
                    ))
                    }
                    </div>
            )}
        </div>
    );
}

export default Bookmark;
