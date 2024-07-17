import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import bgImg from '../Images/login.png';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        const name = form.get('name');
        const phoneNumber = form.get('phoneNumber');
        const email = form.get('email');
        const pin = form.get('pin');
        const photoURL = form.get('photoURL');

        const pinRegex = /^\d{5}$/;
        if (!pinRegex.test(pin)) {
            toast.error('PIN should be exactly 5 digits');
            return;
        }

        try {
            const response = await fetch('https://mfs-server-three.vercel.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, phoneNumber, email, pin, photoURL }),
            });

            if (response.ok) {
                toast.success('Registration successful!');
            } else {
                const data = await response.json();
                toast.error(data.message || 'Registration failed');
            }
        } catch (error) {
            toast.error('Registration failed. Please try again later.');
        }
    };

    return (
        <div className="flex dark:bg-[#120505] dark:text-white">
            <div className="mx-28">
                <img src={bgImg} alt="Background" />
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm">
                    <h2 className="text-3xl text-center dark:text-white">Register your account</h2>
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Your Name</span>
                            </label>
                            <input type="text" placeholder="Enter Your Name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Photo URL</span>
                            </label>
                            <input type="text" placeholder="Photo URL" name="photoURL" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Phone Number</span>
                            </label>
                            <input type="text" placeholder="Phone Number" name="phoneNumber" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input type="email" placeholder="Email" name="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">PIN</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="5 digit PIN"
                                    name="pin"
                                    className="input input-bordered w-80"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="text-xl absolute right-4 top-3 dark:text-black"
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                        </div>
                        <div className="form-control mt-4">
                            <button type="submit" className="btn bg-slate-900 text-white">Register</button>
                        </div>
                        <ToastContainer />
                    </form>
                    <p className="text-center dark:text-black mb-6">
                        Already have an account?{' '}
                        <Link to="/login">
                            <span className="text-red-700">Login</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
