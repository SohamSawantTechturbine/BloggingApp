import React from 'react'
import  { useState } from 'react';
import {Link} from 'react-router-dom';
function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
 
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-black bg-white hover:bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        personal data
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 ml-2 -mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.707 12.293a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Link
           to='/follow'
              className="block px-4 py-2 text-sm text-black bg-red-300 hover:bg-gray-100 border border-black"
            >
            Subscriptions
            </Link>
            <Link
            to="/bookmark"
              className="block px-4 py-2 text-sm text-black bg-red-300 hover:bg-gray-100 border border-black border "
            >
              Bookmark
            </Link>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-black  border border-black bg-red-300 hover:bg-gray-100"
            >
              statics
            </a>
          </div>
        </div>
      )}
    </div>
  

    </div>
  )
}

export default Dropdown
