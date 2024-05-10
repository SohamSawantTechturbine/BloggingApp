import React, { useEffect, useState } from 'react'

function Statics() {

    const  loggedInid=localStorage.getItem('userid');
   const [staticsdata,setstaticsdata]=useState("");
//    const[datasent,setdatasent]=useState(false);
    useEffect(()=>{
       if(loggedInid){
        const fetchstaticdata=async()=>{
            try {
                const response = await fetch("http://localhost:5000/getstatic-data", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ loggedInid })
                });
                const data = await response.json();
                setstaticsdata(data.blogdata);
                // setdatasent(true);
            } catch (error) {
                // toast.warning("Server is down");
                console.error('Error:', error);
            }
        };
        fetchstaticdata();   }
        
 }, []);
        console.log(staticsdata);
    
  return (
    <div className='bg-gray-100'>
      <p>on statics page</p>
      <table className='mt-10 border border-black ml-15 bg-white w-full'>
        <thead>
            <tr>
                <th className='mt-10 border border-black ml-2'>Category</th>
                <th className='mt-10 border border-black ml-2'>Title</th>
                <th className='mt-10 border border-black ml-2'>Image</th>
                <th className='mt-10 border border-black ml-2'>Likes</th>
                <th className='mt-10 border border-black ml-2'>Dislikes</th>
                <th className='mt-10 border border-black ml-2'>Views</th>
                <th className='mt-10 border border-black ml-2'>Reads</th>

                </tr>
        </thead>
        <tbody>
            {staticsdata&& staticsdata.map((data=>(
                <tr className='p-5 shadow border border-black' key={data._id}>
                    <td className='border border-black px-2'>{data.category}</td>
                    <td className='border border-black'>{data.title}</td>
                    <td className='border border-black w-5 h-20'><img  src={`http://localhost:5000${data.file}`}/></td>
                    <td className='border border-black'>{data.likeCount}</td>
                    <td className='border border-black'>{data.dislikeCount}</td>
                    <td className='border border-black'>{data.views.length}</td>
                    <td className='border border-black'>{data.reads.length}</td>
                    </tr>
            )))}
        </tbody>
      </table>
    </div>
  )
}

export default Statics
