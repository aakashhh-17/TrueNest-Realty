import React from "react";
import {Link} from 'react-router-dom'; 

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-y-3">
        <input
          type="text"
          className= ' bg-white  p-3 rounded-lg '
          placeholder="Username"
          id="username"
        />
        <input
          type="email"
          className=" bg-white p-3 rounded-lg"
          placeholder="Email"
          id="email"
        />
        <input
          type="password"
          className="bg-white p-3 rounded-lg"
          placeholder="Password"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
        <button className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Continue with google
        </button>
      </form>
      <h3 className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className="text-blue-600">Sign in</span>
        </Link>
      </h3>
    </div>
  );
}
