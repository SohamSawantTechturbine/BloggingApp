import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Followed() {
    const loggedInid = localStorage.getItem('userid');
    const [userData, setUserData] = useState([]);
    const [userinfo, setUserinfo] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5000/subscribed-data", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ loggedInid })
                }).then((res)=>res)
                const { blogs, userinfo } = await response.json();
                setUserinfo(userinfo);
                setUserData(blogs);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
    }, [userData]);

    const handleview = (blog) => {
        console.log(blog);
        navigate('/viewblog', { state: { blog } });
      };

      const handleunsubscribe=(id)=>{
        console.log(id);
        if(loggedInid){
        fetch("http://localhost:5000/unsubscribe", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id,loggedInid })
        }).then(res => {
            if (res.ok) {
              toast.success("unsubscribe succesfully ")
              
            } else {
                toast.error('not possible now server is down')
            }
        })}else{
            toast.warning("login first")
        }
      }
console.log(userinfo);
    return (
        <div>
            <ToastContainer/>
            <div className="ml-2">
  
    <table className="border border-black">
        <tbody>
            <th> <p className="font-bold mb-2">Authors you are subscribed to:</p></th>
            {loggedInid && userinfo.map((info, index) => (
                <tr key={index}>
                    <td className="border border-black px-4 py-2">{info.username}</td>
                    <td className="border border-black px-4 py-2">
                        <img
                            onClick={() => handleunsubscribe(info._id)}
                            src="https://t3.ftcdn.net/jpg/04/23/69/78/360_F_423697861_7QcnlkiOu2Ys5TN6tHdP687VoWJCnE9l.jpg"
                            className="h-20 w-20 mt-2 cursor-pointer"
                            alt="Author avatar"
                        />
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

            {loggedInid&&userData.length === 0 ? (
                <p>You haven't followed anyone yet.</p>
            ) : (
                <div className=" mt-4 grid grid-cols-3 gap-4 ">
                    {loggedInid&&userData.map((item ,index )=> (
                        
                            <div key={index} className="border border-black bg-white rounded-lgoverflow-hidden shadow-lg transform transition duration-300 hover:scale-105 aspect-w-2 aspect-h-2 border border-black" onClick={() => handleview(item)} style={{ minWidth: '60px', minHeight: '60px' }}>
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
            )}
        </div>
    );
}

export default Followed;
