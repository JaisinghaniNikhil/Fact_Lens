import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        age: '',
        phone: '',
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const validate = () => {
        let newErrors = {};

        if (!formData.fname.trim()) newErrors.fname = "First name is required";
        if (!formData.lname.trim()) newErrors.lname = "Last name is required";

        if (!formData.age || formData.age < 1) {
            newErrors.age = "Enter valid age";
        }

        if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Enter valid Indian phone number";
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email";
        }

        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // FIXED: Added async keyword here
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validate()) return;

        try{
            const res = await axios.post('https://fact-lens-tdlu.onrender.com/api/auth/signup', formData);
            alert(res.data.message);
            navigate('/user/login');
        }
        catch(err){
            alert(err.response?.data?.message || "Signup Failed");
        }
    }

    const fields = [
        { label: 'First Name', name: 'fname', type: 'text', placeholder: 'John' },
        { label: 'Last Name', name: 'lname', type: 'text', placeholder: 'Doe' },
        { label: 'Age', name: 'age', type: 'number', placeholder: '25' },
        { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
        { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' }
    ]

    return (
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0b1f4d] via-[#08142e] to-[#050a1f] px-6 md:px-16 py-20 overflow-hidden">
            
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto w-full">

                <div className="flex flex-col gap-8 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Join the Fight Against{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Misinformation
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
                        Create your FactLens account and gain access to cutting-edge tools 
                        for verifying news authenticity and detecting misinformation patterns.
                    </p>

                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                            <p className="text-gray-300">Advanced AI-powered fact-checking</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                            <p className="text-gray-300">Real-time misinformation detection</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"></div>
                            <p className="text-gray-300">Comprehensive analysis reports</p>
                        </div>
                    </div>
                </div>

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                    
                    <h3 className="text-3xl font-bold text-white mb-2">Create Account</h3>
                    <p className="text-gray-400 mb-8">Start your journey with FactLens today</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* FIXED: First name and last name with proper error display */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {fields.slice(0, 2).map((field, index) => (
                                <div key={index} className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                    {/* FIXED: Display error for each field dynamically */}
                                    {errors[field.name] && (
                                        <p className="text-red-400 text-sm">{errors[field.name]}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* FIXED: Remaining fields with proper error display */}
                        {fields.slice(2).map((field, index) => (
                            <div key={index} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                                {/* FIXED: Display error for each field dynamically */}
                                {errors[field.name] && (
                                    <p className="text-red-400 text-sm">{errors[field.name]}</p>
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-lg shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1 transition duration-300 mt-6"
                        >
                            Create Account
                        </button>

                        <p className="text-center text-sm text-gray-400 mt-6">
                            Already have an account?{' '}
                            <a href="/user/login" className="text-blue-400 font-semibold hover:text-blue-300 transition">
                                Login here
                            </a>
                        </p>
                    </form>
                </div>

            </div>
        </section>
    )
}

export default Signup