import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { toast,ToastContainer } from 'react-toastify';
import Arrow from '../assets/arrow.png'
function ViewBlog(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, desc, category, file, token, username ,_id} = location.state.blog;
    const [vtitle, setTitle] = useState(title);
    const [vdesc, setDesc] = useState(desc);
    const [vcategory, setCategory] = useState(category);
    const [vfile, setFile] = useState(file);
 //   const [vfileshow, setFileshow] = useState("https://i.pinimg.com/736x/90/07/5b/90075b356eb2f0cf95e08b53a719f669.jpg");
    const [isAuthor, setIsAuthor] = useState(false);
    const [comment ,setcomment]=useState("");
    useEffect(() => {
        const loggedInUserToken = localStorage.getItem('token');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loggedInUserToken, token })
        };

        fetch('http://localhost:5000/viewblogcheckingAuthor', requestOptions)
            .then(response => response.json())
            .then(data => {
                const { isAuthor } = data;
                setIsAuthor(isAuthor);
                console.log(isAuthor);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const handleUpdate = () => {
        // Handle update logic
          navigate("/updateblog" ,{ state: {  title, desc, category, file, token, username ,_id } })
        console.log("will update the data ");
    };

    const handleDelete = () => {
         console.log(_id);
        fetch("http://localhost:5000/deleteblog",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id })
        }).then(res=>{if(res.ok){
             toast.success("blog Deleted")
             navigate("/home")
        }else{
            toast.error('not possible now server is down')
        }})
    };
    // console.log(isAuthor);
    const handlecomment=()=>{
        console.log("will do")
        console.log(comment);
    }
    return (
<div>
    <ToastContainer />
   
    <div className="flex flex-col bg-gray-100 h-screen">
        <Navbar />
        <img className="w-full h-80  bg-white border border-black " src={`http://localhost:5000${vfile}`} alt="oops" />
        <div className="ml-5 mt-3 ">
            <div className="mb-4 mt-4">
                <div className="flex justify-between items-center">
                    <div>
                        <label htmlFor="author" className="font-bold">Author:</label>
                        <span id="author" className="ml-2">{username}</span>
                    </div>
                    {isAuthor && (
                        <div className="flex space-x-4 items-center">
                            {/* <button onClick={handleUpdate} className="px-4 py-2 bg-blue-500 text-white rounded-md">Update</button> */}
                            {/* <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button> */}
                        <img onClick={handleUpdate}className="h-10 cursor-pointer "src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtHdOVLKWmciSKsLEJl2NVx5ulVMZ4e3mWBKUpmfLExQ&s" alt="update"></img>
                        <img onClick={handleDelete} className="h-10 cursor-pointer "src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="update"></img>
                     
                        </div>
                    )}
                </div>
            </div>
            <div className="mb-4 flex justify-between items-center">
                <div>
                <label htmlFor="title" className="font-bold">Title:</label>
                <span id="title" className="ml-2">{vtitle}</span>
                </div>
            </div>
            <div className="mb-4 flex justify-between items-center">
                <div>
                <label htmlFor="category" className="font-bold">Category:</label>
                <span id="category" className="ml-2">{vcategory}</span>
           </div> </div>
            <div className="mb-4 flex justify-between items-center">
            <div> <label htmlFor="description" className="font-bold">Description:</label>
                <span id="description" className="ml-2">{vdesc}</span>
</div></div>
        </div>
        <div className='flex ml-3 mt-5 py-2'>
    <img className="h-10 px-3 " src="https://www.shutterstock.com/image-vector/comments-icon-on-white-background-260nw-247489372.jpg" alt="Comments icon"></img>
    <textarea onChange={(e)=>setcomment(e.target.value)} className='border border-rounded border-black rounded-md h-12 px-2 py-1 w-80' placeholder='Comment'></textarea>
    <img  className="h-10 px-1 " onClick={handlecomment} src={Arrow}></img>
</div>


    </div>
   </div>


    ); 
}

export default ViewBlog;
