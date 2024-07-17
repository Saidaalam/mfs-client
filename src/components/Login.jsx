import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaGithub, FaGoogle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import bgImg from '../Images/login.png';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../Firebase/firebase.config';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
     console.log(email, password)
      try {

          toast.success('Login successful!');
      } catch (error) {
        toast.error(error.message);
      }
  };

    const handleGoogleSignIn = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                console.log('User logged in with Google:', user);
                toast.success("Login with Google successful!");
            })
            .catch(error => {
                console.error('Error logging in with Google:', error.message);
                toast.error("An error occurred. Please try again.");
            });
    };

    const handleGithubSignIn = () => {
        const githubProvider = new GithubAuthProvider();
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const user = result.user;
                console.log('User logged in with GitHub:', user);
                toast.success("Login with GitHub successful!");
                // Redirect or handle successful login
            })
            .catch(error => {
                console.error('Error logging in with GitHub:', error.message);
                toast.error("An error occurred. Please try again.");
            });
    };

    return (
        <div className="flex dark:bg-[#120505] dark:text-white">
            <div className="mx-28">
                <img src={bgImg} alt="Background" />
            </div>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card shrink-0 w-full max-w-sm">
                    <h2 className="text-3xl text-center dark:text-white">Login your account</h2>
                    <form onSubmit={handleLogin} className="card-body pb-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">PIN</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="5 digit PIN"
                                    name="password"
                                    className="input input-bordered w-80"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="text-xl absolute right-4 top-3 dark:text-white"
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover mt-2">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-4">
                            <button className="btn bg-slate-900 text-white">Login</button>
                        </div>
                        <div className="dark:text-slate-800">
                            <button className="text-4xl ml-24 mt-4 top-4" onClick={handleGoogleSignIn}><FaGoogle /></button>
                            <button className="text-4xl ml-16 mt-4 top-4" onClick={handleGithubSignIn}><FaGithub /></button>
                        </div>
                        <ToastContainer />
                    </form>
                    <p className="text-center mb-6 dark:text-black">
                        Do not have an account?{" "}
                        <Link to="/register">
                            <span className="text-red-700">Register</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
