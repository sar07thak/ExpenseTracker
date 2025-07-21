import React, { useState } from 'react';
// Import Link for internal navigation and useNavigate for programmatic navigation
import { Link, useNavigate } from 'react-router-dom';
// Import icons from the 'react-icons/fi' (Feather Icons) set
// Make sure you have run 'npm install react-icons' in your project terminal
import { FiDollarSign, FiEye, FiEyeOff, FiCamera } from 'react-icons/fi';
// Import the default user image. Make sure the path is correct for your project structure.
import user from "../../assets/user.jpeg";

// --- UI Components ---

const SignUpForm = () => {
    // State to manage form inputs, password visibility, and avatar
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState(""); // State for form errors
    const [avatar, setAvatar] = useState(null); // State for the image file
    const [avatarPreview, setAvatarPreview] = useState(null); // State for the image preview URL

    // Regular expression for strong password validation
    const strongPasswordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    );

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        if (formError && strongPasswordRegex.test(newPassword)) {
            setFormError("");
        }
    };
    
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page reload
        
        if (!strongPasswordRegex.test(password)) {
            setFormError("Password must be 8+ characters and include an uppercase letter, a number, and a special character (@$!%*?&).");
            return;
        }

        setFormError(""); 
        console.log('Signing up with:', { fullName, email, password, avatar });
        // Add your user creation logic here, including uploading the avatar file.
        // For example, you would use FormData to send the file to your server.
        // navigate('/login'); 
    };

    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-8 self-start">Expense Tracker</h1>
                
                <div className="mb-6">
                    <h2 className="text-3xl font-bold">Create an Account</h2>
                    <p className="text-gray-500">Join us today by entering your details below.</p>
                </div>

                {/* --- Image Upload Section --- */}
                <div className="mb-6">
                    <label htmlFor="avatarInput" className="cursor-pointer group relative w-28 h-28 block mx-auto">
                        <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 group-hover:border-purple-400 transition-all overflow-hidden">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                            ) : (
                                <img src={user} alt="Default Avatar" className="w-full h-full object-cover" />
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 group-hover:bg-purple-700 transition-all shadow-md">
                            <FiCamera size={16} className="text-white" />
                        </div>
                    </label>
                    <input
                        type="file"
                        id="avatarInput"
                        name="avatar"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </div>


                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/2">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                id="fullName" 
                                name="fullName" 
                                placeholder='John Doe'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                                required
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder='john@example.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="password" 
                                name="password" 
                                value={password}
                                onChange={handlePasswordChange}
                                placeholder="Min 8 Characters" 
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)} 
                                className="absolute inset-y-0 right-0 px-4 flex items-center text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                        {formError && <p className="text-red-500 text-xs mt-2">{formError}</p>}
                    </div>

                    <button type="submit" className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-md">
                        SIGN UP
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-500">
                    Already have an account? <Link to="/login" className="font-semibold text-purple-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

const DecorativePanel = () => {
    return (
        <div className="hidden lg:block w-1/2 bg-purple-50 p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-24 -left-12 w-96 h-96 bg-purple-200 rounded-3xl opacity-50 transform rotate-45"></div>
            
            <div className="relative z-10 flex flex-col justify-center h-full space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="bg-purple-100 p-3 rounded-xl">
                            <FiDollarSign size={28} className="text-purple-600" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Track Your Income & Expenses</p>
                            <p className="text-2xl font-bold text-gray-800">$430,000</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <p className="text-lg font-bold">All Transactions</p>
                            <p className="text-sm text-gray-500">2nd Jan to 21st Dec</p>
                        </div>
                        <a href="#" className="text-sm font-semibold text-purple-600 hover:underline">View More</a>
                    </div>
                    <div className="flex items-end h-32 space-x-3">
                        <div className="flex-1 h-16 bg-purple-300 rounded-t-md" title="Jan"></div>
                        <div className="flex-1 h-24 bg-purple-500 rounded-t-md" title="Feb"></div>
                        <div className="flex-1 h-28 bg-purple-300 rounded-t-md" title="Mar"></div>
                        <div className="flex-1 h-12 bg-purple-500 rounded-t-md" title="Apr"></div>
                        <div className="flex-1 h-20 bg-purple-300 rounded-t-md" title="May"></div>
                        <div className="flex-1 h-32 bg-purple-500 rounded-t-md" title="Jun"></div>
                        <div className="flex-1 h-24 bg-purple-300 rounded-t-md" title="Jul"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main SignUp Page Component ---
export default function SignUp() {
    return (
        <main className="flex min-h-screen bg-white text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
            <SignUpForm />
            <DecorativePanel />
        </main>
    );
}
