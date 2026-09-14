import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    }
    
    const validate = () => {
        let newErrors = {};

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validate()) return;

        setLoading(true);

        try{
            const res = await axios.post('https://fact-lens-tdlu.onrender.com/api/auth/login', formData);
            
            localStorage.setItem('token', res.data.token);
            
            localStorage.setItem('user', JSON.stringify(res.data.user));
            
            alert(res.data.message);
            navigate('/user/dashboard');
        }
        catch(err){
            alert(err.response?.data?.message || "Login Failed");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0b1f4d] via-[#08142e] to-[#050a1f] px-6 md:px-16 py-20 overflow-hidden">

            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">

                <div className="flex flex-col gap-8 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Welcome Back to{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            FactLens
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                        "In a time of deceit, telling the truth is a revolutionary act."
                    </p>
                    <p className="text-sm text-gray-400 -mt-4">— George Orwell</p>

                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                            <p className="text-gray-300">Access your saved analyses</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                            <p className="text-gray-300">Continue fact-checking instantly</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                            <p className="text-gray-300">Track your verification history</p>
                        </div>
                    </div>
                </div>

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                    
                    <h3 className="text-3xl font-bold text-white mb-2">Login</h3>
                    <p className="text-gray-400 mb-8">Enter your credentials to continue</p>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                                className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                            {errors.password && (
                                <p className="text-red-400 text-sm">{errors.password}</p>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <a href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-lg shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>

                        {/* Signup Link */}
                        <p className="text-center text-sm text-gray-400 mt-6">
                            Don't have an account?{' '}
                            <a href="/user/signup" className="text-blue-400 font-semibold hover:text-blue-300 transition">
                                Sign up here
                            </a>
                        </p>
                    </form>
                </div>

            </div>
        </section>
    )
}

export default Login