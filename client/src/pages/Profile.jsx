import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser.rest._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async (e) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser.rest._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleUserSignout = async ()=>{
    dispatch(signOutUserStart());
try {
  const res = await fetch('/api/auth/signout')
  const data = res.json();
  if(data.success === false){
    dispatch(signOutUserFailure(data.message));
    return;
  }
  dispatch(signOutUserSuccess(data));
} catch (error) {
  dispatch(signOutUserFailure(data.message));
}
  }

  return (
    <div className="w-lg p-3 mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-y-3 " onSubmit={handleSubmit}>
        <img
          className="self-center rounded-full h-20 w-20 "
          src={
            currentUser.rest.avatar ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="profile"
        />
        <input
          defaultValue={currentUser.rest.username}
          onChange={handleChange}
          className="bg-white p-3 rounded-md"
          type="text"
          placeholder="Username"
          id="username"
        />
        <input
          defaultValue={currentUser.rest.email}
          onChange={handleChange}
          className="bg-white p-3 rounded-md"
          type="email"
          placeholder="Email"
          id="email"
        />
        <input
          onChange={handleChange}
          className="bg-white p-3 rounded-md"
          type="password"
          placeholder="Password"
          id="password"
        />
        <button className="bg-slate-700 p-3 text-white rounded-md cursor-pointer hover:opacity-95 uppercase ">
          {loading ? "Loading.." : "Update"}
        </button>
      </form>

      <div className="flex justify-between mx-auto w-lg text-red-700 cursor-pointer mt-2">
        <span onClick={handleDeleteUser}>Delete account</span>
        <span onClick={handleUserSignout}>Sign Out</span>
      </div>
      <p className="mx-auto text-green-700 cursor-pointer">Show listings</p>
      <p className="text-red-700 mt-5">{error && error}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "Update Successfull"}
      </p>
    </div>
  );
}
