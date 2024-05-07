import React, { useState } from 'react'

function Contact() {
    const[email,setemail]=useState("");
    const[subject,setsubject]=useState("");
    const[message,setmessage]=useState("");

    const handleContact = (e) => {
        e.preventDefault();
        console.log(email, subject, message);
        fetch("http://localhost:5000/contact-data", {
            method: "POST",
            headers:{
              'Content-Type': 'application/json'  
            },
            body: JSON.stringify({ email, subject, message })
        })
        .then(response => {
            if (response.ok) {
                setemail("")
                setsubject("")
                setmessage("")
             alert("data submitted")
            } else {
              throw new Error("Failed to submit data");
            } 
          })
        .catch((error) => {
            console.error("Error:", error);
        });
    };
    
  return (
    <div>
    <div className='flex '>
    
      <div className="w-full h-80  bg-red-500">
        <div className="p-10">
          <p>Thank you for contacting us</p>
        </div>
      
      <div className="w-1/2 ml-80">
        <div className="bg-white  mr-10 py-6 lg:py-14 px-4 mx-auto max-w-screen-md border border-gray drop-shadow-lg">
          <h2 className=" mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
          <p className="mb-6 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
   
<form className="space-y-6 h-140" onSubmit={handleContact}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" value={email} onChange={(e) => setemail(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="example@gmail.com" required />
            </div>
  
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" value={subject} onChange={(e) => setsubject(e.target.value)} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" rows="6" value={message} onChange={(e) => setmessage(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
            </div>
            <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-red-300text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ml-30 mt-5">Send message</button>
          </form>
     
        </div>
      </div>
      </div>
  </div>
  <div className='mt-60 w-full h-80 bg-purple-500'/>
 
  </div>
  )
}

export default Contact

