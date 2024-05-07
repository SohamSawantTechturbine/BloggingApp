import React, { useState, useEffect } from 'react'
import { Link, json } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../Context/Authcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const { setIsLogin, isLogin, usernameInput } = useAuthContext();
  const navigate = useNavigate();
  function handleButton(e) {
    e.preventDefault()
    console.log(username, password);
    try {
      fetch("http://localhost:5000/login-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
      }).then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          if (data && data.token) {
            console.log(data);

            console.log(data.result.username);

            localStorage.setItem("token", data.token);
            setIsLogin(true);
            localStorage.setItem("userid", data.result._id)
            localStorage.setItem("username", data.result.username);
            localStorage.setItem("userimage",data.result.file);
            navigate("/home");
          }

        }
        else {
          throw new Error("Invalid username or password");
        }
      })

    } catch (err) {
      console.error("Error submitting data:", error);
      toast.error("Invalid username or password. Click on Register to register yourself", {
        position: "top-center", transition: Slide
      });
    }
    useEffect(() => {
      if (isLogin) {
        localStorage.setItem("username", usernameInput);
      }
    }, [isLogin]);

  }
  return (
    <>
      <ToastContainer />
      <section class="bg-gray-50 bg-white">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  h-180 md:h-screen lg:py-0">
          <div className=" mt-60 w-full  h-1000 md:mt-0 sm:max-w-md xl:p-0  border-white rounded-lg" style={{ backgroundImage: 'url("https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?size=626&ext=jpg")' }}>
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleButton}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-white">
                    Your USERNAME
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="text"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email or Username"
                    required=""
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 text-white">
                  Don’t have an account yet?{" "}
                  <Link to="register" className="font-medium text-primary-600 hover:underline text-green-100">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Login
