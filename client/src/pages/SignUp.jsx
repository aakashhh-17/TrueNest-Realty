import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'; 
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e)=>{
setFormData({
  ...formData,
  [e.target.id]: e.target.value
});
console.log(formData);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
    const res = await fetch('/api/auth/signup', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      },
    );

    const data = await res.json();
    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in')
    console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      
    }
    
};
// console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className= ' bg-white  p-3 rounded-lg '
          placeholder="Username"
          id="username"  onChange={handleChange}
        />
        <input
          type="email"
          className=" bg-white p-3 rounded-lg"
          placeholder="Email"
          id="email" onChange={handleChange}
        />
        <input
          type="password"
          className="bg-white p-3 rounded-lg"
          placeholder="Password"
          id="password" onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'loading..' : 'Sign up'}
        </button>
        
        <OAuth />
      </form>
      <h3 className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className="text-blue-600">Sign in</span>
        </Link>
      </h3>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
