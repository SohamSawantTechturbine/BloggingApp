import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Arrow from '../assets/arrow.png'
import bookmark from "../assets/bookmark.png"
import { useAuthContext } from '../components/Context/Authcontext';

function ViewBlog(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLogin } = useAuthContext();
    const { title, desc, category, file, token, username, _id, loginid,date} = location.state.blog;
    const [vtitle, setTitle] = useState(title);
    const [vdesc, setDesc] = useState(desc);
    const [vcategory, setCategory] = useState(category);
    const [vfile, setFile] = useState(file);
    const [isAuthor, setIsAuthor] = useState(false);

    const [timer, setTimer] = useState(0);
    const [hasRead, setHasRead] = useState(false);

    const [comment, setComment] = useState("");
    const [commentdata, setCommentData] = useState("");

   const[likedata,setlikedata]=useState("");
   const[dislikedata,setdislikedata]=useState("");


    const loggedInUsername = localStorage.getItem('username');
    const loggedInUserToken = localStorage.getItem('token');
    const loggedInid = localStorage.getItem('userid');

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ loggedInUserToken, token, loggedInid, loginid })
        };

        fetch('http://localhost:5000/viewblogcheckingAuthor', requestOptions)
            .then(response => response.json())
            .then(data => {
                const { isAuthor } = data;
                setIsAuthor(isAuthor);
                // console.log(isAuthor);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        const fetchCommentData = async () => {
            try {
                const response = await fetch("http://localhost:5000/view-comment", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id })
                });
                const data = await response.json();
                setCommentData(data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchCommentData();



    }, []);


    useEffect(() => {
        const fetchLikeData = async () => {
            try {
                const response = await fetch("http://localhost:5000/view-like", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id })
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch like data');
                }
    
                const data = await response.json();
                
                setlikedata(data.likeCount);
                setdislikedata(data.dislikeCount);
            } catch (error) {
                console.error('Error fetching like data:', error);
            }
        };
    
        fetchLikeData(); 
    }, [likedata,dislikedata]);

    const handleUpdate = () => {
        navigate("/updateblog", { state: { title, desc, category, file, token, username, _id} })
        console.log("will update the data ");
    };

    const handleDelete = async() => {
        fetch("http://localhost:5000/deleteblog", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id })
        }).then(res => {
            if (res.ok) {
              toast.success("blog Deleted")
              
                navigate("/home")
            } else {
                toast.error('not possible now server is down')
            }
        })
    };

    const handleComment = async () => {
        if (loggedInid) {
            try {
                const response = await fetch("http://localhost:5000/comment-blog", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ comment, _id, loggedInUserToken, loggedInUsername, loggedInid }),
                });

                if (!response.ok) {
                    throw new Error('Failed to post comment');
                }

                const data = await response.json();
                console.log("Comment posted successfully:", data);

                // Update UI or perform any other actions
            } catch (error) {
                console.error("Error posting comment:", error.message);
            }
        }
        else {
            toast.error("please login ...")
        }
    };

    const handleLike = async () => {
        if (loggedInid) {
        try {
            const response = await fetch("http://localhost:5000/like-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loggedInUserToken}`,
                },
                body: JSON.stringify({ _id, loggedInid }),
            });
            setlikedata(prevCount => prevCount + 1);
            if (!response.ok) {
                throw new Error('Failed to like blog');
            }
    
            // Update UI or perform any other actions
        } catch (error) {
            console.error("Error liking blog:", error.message);
        }
    }else{
        // alert("please login to like")
        toast.error("please login ...")
    }
    };
    
    const handleDislike = async () => {
        if (loggedInid) {
        try {
            const response = await fetch("http://localhost:5000/dislike-blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${loggedInUserToken}`,
                },
                body: JSON.stringify({ _id, loggedInid }),
            });
            setdislikedata(prevCount => prevCount + 1);
            if (!response.ok) {
                throw new Error('Failed to dislike blog');
            }
    
            // Update UI or perform any other actions
        } catch (error) {
            console.error("Error disliking blog:", error.message);
        }
    }
    else{
        toast.error("please login ...")
    }
    };
    
    const handleDeletecomment = async (_id) => {
        console.log(_id);
        fetch("http://localhost:5000/deletecomment", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id })
        }).then(res => {
            if (res.ok) {
                toast.success("comment deleted")
                // navigate("/home")
            } else {
                toast.error('not possible now server is down')
            }
        })
    }

    const handlesubscribe = async () => {
        if(loggedInid){
        try {
            const response = await fetch("http://localhost:5000/subscribe", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ loggedInid, loginid })
            });
    
            if (!response.ok) {
                throw new Error('Failed to subscribe/unsubscribe');
            }
    
            const data = await response.json();
    
            if (data && data.message) {
                toast.success(data.message);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to subscribe/unsubscribe');
        }}
        else{
            toast.warning("login first")
        }
    };
    


  const handlebookmark = async () => {
  if(loggedInid){
    try {
        console.log(_id, loggedInid);
        // Send a request to the backend to check if the user is present and add/remove the bookmark
        const response = await fetch("http://localhost:5000/check-bookmark", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ loggedInid,  _id })
        });
        const data = await response.json();
        toast.success(data.message);
        console.log(data);
   
    } catch (error) {
        console.error('Error:', error);
    }}
    else{
        toast.warning("login first")
    }
}







useEffect(() => {

 

    const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    increaseViewCount();
    return () => clearInterval(interval);
}, []);


const increaseViewCount = async () => {
   if(loggedInid){
    try {
        await fetch("http://localhost:5000/increase-view", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id,loggedInid })
        });
    } catch (error) {
        console.error('Error:', error);
    }}
};


useEffect(() => {
    const TWO_MINUTES = 120;
    if (timer >= TWO_MINUTES && !hasRead) {
        increaseReadCount();
        setHasRead(true);
    }
}, [timer, hasRead]);

// Increase read count in the backend
const increaseReadCount = async () => {
    if(loggedInid){
    try {
        await fetch("http://localhost:5000/increase-read", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id,loggedInid})
        });
    } catch (error) {
        console.error('Error:', error);
    }}
};


    return (
        <div>
            <ToastContainer />
            <div  className='mr-10'>
                            <label htmlFor="description" className="font-bold">Date:</label>
                            <span id="description" >{date}</span>
                        </div>
            <div className="flex flex-col bg-purple-50 h-screen">
                <img className="w-full h-80 bg-white border border-black " src={`http://localhost:5000${vfile}`} alt="oops" />
                <div className="ml-5 mt-3 ">
                    <div className="mb-4 mt-4">
                        <div className="flex px-3 space-x-5">
                            <div>
                                <img onClick={handleLike} src="https://www.iconpacks.net/icons/2/free-instagram-like-icon-3507-thumb.png" alt="like" className='h-10 w-10' />
                                <h3>{likedata}</h3>
                            </div>
                            <div>
                                <img  onClick={handleDislike}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwdcgH9ox32OQLFDhfD9zflycihYQeF8A8QQTqzzZkoQ&s" alt="dislike" className='h-10 w-10 px-2' />
                                <h3>{dislikedata}</h3>
                            </div>
                            <div className='flex justify-end '>
                                <img src='https://cdn.pixabay.com/photo/2021/08/17/17/49/youtube-6553743_1280.png'  alt='subscribeimage'  onClick={handlesubscribe} className='cursor-pointer h-20 w-30'/>
                            </div>
                            <div className='flex justify-end '>
                                <img src={bookmark}  alt='subscribeimage'  onClick={handlebookmark} className='cursor-pointer h-10 w-30'/>
                                <h1 className='text-red-500'>Bookmark</h1>
                            </div>
                        </div>
                       
                        <div className="flex justify-between items-center">
                            <div>
                                <label htmlFor="author" className="font-bold">Author:</label>
                                <span id="author" className="ml-2">{username}</span>
                            </div>
                            {isAuthor && (
                                <div className="flex space-x-4 items-center">
                                    <img onClick={handleUpdate} className="h-10 cursor-pointer " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtHdOVLKWmciSKsLEJl2NVx5ulVMZ4e3mWBKUpmfLExQ&s" alt="update"></img>
                                    <img onClick={handleDelete} className="h-10 cursor-pointer " src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete"></img>
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
                        </div>
                    </div>
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <label htmlFor="description" className="font-bold">Description:</label>
                            <span id="description" className="ml-2">{vdesc}</span>
                        </div>
                       
                    </div>
                </div>


                <div className='flex ml-3 mt-5 py-2'>
                    <img className="h-10 px-3 " src="https://www.shutterstock.com/image-vector/comments-icon-on-white-background-260nw-247489372.jpg" alt="Comments icon"></img>
                    <textarea onChange={(e) => setComment(e.target.value)} className='border border-rounded border-black rounded-md h-12 px-2 py-1 w-80' placeholder='Comment'></textarea>
                    <img className="h-10 px-1 " onClick={handleComment} src={Arrow}></img>
                    <h1 className='text-red-600 text-lg '>{commentdata.comments && commentdata.comments.length}</h1>
                </div>
                <div className='mt-2'>
                    <div className='mt-2 bg-gray-100'>
                        <div>
                            {commentdata.comments && commentdata.comments.map((comment, index) => (
                                <div className="flex w-full  border rounded-md" key={index}>
                                    <div className="p-3">
                                        <div className="flex gap-3 items-center">
                                            <img src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400" />
                                            <h3 className="font-bold border border-black">{comment.username}<br /></h3>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mt-5 px-3 ml-2 flex-grow">{comment.comment}</p>
                                    {comment.commentauthorid === loggedInid && <img onClick={() => handleDeletecomment(comment._id)} className="h-10 cursor-pointer mt-5" src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBlog;
