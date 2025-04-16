import React, { useState } from "react";
import { Navigate, Link, useNavigate} from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold  mt-10">Sign in</h1>
      <form
        onSubmit={handleSubmit}
        className=" flex mx-auto flex-col gap-y-3 mt-5"
      >
        <input
          onChange={handleChange}
          className="w-lg p-3 rounded-lg bg-white"
          type="text"
          id="username"
          placeholder="Username"
        />
        <input
          onChange={handleChange}
          className="w-lg p-3 rounded-lg bg-white"
          type="password"
          id="password"
          placeholder="Password"
        />
        <button disabled={loading} className="bg-slate-700 p-3 uppercase text-white rounded-lg hover:opacity-95 hover:cursor-pointer disabled:opacity-80">
          {loading ? 'loading..' : 'Sign in'}
        </button>
      </form>
        <div className="flex gap-2 mt-3 mx-auto">
          <p>Dont have an account?</p>
          <Link to="/sign-up">
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
