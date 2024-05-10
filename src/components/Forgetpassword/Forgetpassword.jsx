import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import  { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Forgetpassword() {
    const [username, setUsername] = useState('');
    const [mail, setmail] = useState('');
    const [userNameValid, setUserNameValid] = useState(true);
    const navigate=useNavigate();
    function handleButton(e) {
        e.preventDefault();
        
        async function sendforgetdata() {
            try {
                const response = await fetch("http://localhost:5000/sendforget-datapass", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username,  mail })
                })
        
                if (!response.ok) {
                    throw new Error('Failed to send email');
                }
        
                const data = await response.json();
                 await toast.success(data.message);
                navigate("/otp" ,{state:{username}})
            } catch (error) {
                toast.warning(data.message);
                console.error('Error:', error);
            }
        }
        sendforgetdata()


    }
    function validateUsername() {
        setUserNameValid(username.trim() !== '');
    }
  return (
    <div>
    <ToastContainer/>
   <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h1>
                    <form className="space-y-4 md:space-y-6"  encType='multipart/form-data' onSubmit={handleButton}>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                            <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={validateUsername} className={`bg-gray-50 ${userNameValid ? 'border border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `} placeholder="Enter your username" required />
                            {!userNameValid && <p className="text-red-500 text-xs italic">Username is required.</p>}
                        </div>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mail</label>
                            <input type="text" name="username" id="username" value={mail} onChange={(e) =>setmail(e.target.value)} onBlur={validateUsername} className={`bg-gray-50 ${userNameValid ? 'border border-gray-300' : 'border-red-500'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `} placeholder="Enter your username" required />
                            {!userNameValid && <p className="text-red-500 text-xs italic">Username is required.</p>}
                        </div>
                        <button type="submit" className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">proceed</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
  )
}

export default Forgetpassword
