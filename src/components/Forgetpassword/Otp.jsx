import { data } from 'autoprefixer';
import React ,{useState}from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Otp() {
    const location = useLocation();
    const { username } = location.state;
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const fullOtp = otp.join("");
        console.log(username, password, fullOtp);
        const fetchotp=async()=>{
            try {
                const response = await fetch("http://localhost:5000/get-otp", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username,  password,fullOtp })
                })
        
                if (!response.ok) {
                    const data = await response.json();
                    toast.warning(data.message);
                }
        
                const data = await response.json();
                toast.success(data.message);
                if(data){
                navigate("/")
                }
            } catch (error) {
                toast.warning(data.message);
                console.error('Error:', error);
            }
        }
        fetchotp();
        
    };

    function handleChange(e, index) {
        if (isNaN(e.target.value)) return false;
        setOtp([...otp.map((data, indx) => (indx === index ? e.target.value : data))]);
        if (e.target.value && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                        Enter OTP and Password
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="text-center mb-8">
                            <div className='flex justify-center space-x-2'>
                                {otp.map((data, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        className="text-center w-12 h-12 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                                        value={data}
                                        maxLength={1}
                                        onChange={(e) => handleChange(e, i)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-500"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Otp
