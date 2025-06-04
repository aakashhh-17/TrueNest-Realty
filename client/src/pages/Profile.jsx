import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
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

  const handleUserSignout = async () => {
    dispatch(signOutUserStart());
    try {
      const res = await fetch("/api/auth/signout");
      const data = res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser.rest._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      console.log(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

const handleListingDelete = async (listingId)=>{
try {
  const res = await fetch(`/api/listing/delete/${listingId}`, {
    method: 'DELETE',
  })
  const data = await res.json();
  if(data.success === false){
    console.log(data.message);
    return;
  }

  setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
} catch (error) {
  console.log(error.message)
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
        <Link
          className="bg-green-700 text-white p-3 rounded-md uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create listing
        </Link>
      </form>

      <div className="flex justify-between mx-auto w-lg text-red-700 cursor-pointer mt-2">
        <span onClick={handleDeleteUser}>Delete account</span>
        <span onClick={handleUserSignout}>Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error && error}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess && "Update Successfull"}
      </p>
      <button
        onClick={handleShowListings}
        className="mx-auto w-full text-green-700 cursor-pointer"
      >
        Show listings
      </button>
      <p>{showListingsError && "Error showing listings"}</p>

      {userListings.length > 0 &&
        userListings.map((listing) => (
            
          <div key={listing._id} className="flex flex-row justify-between mt-5">
            <Link to={`/listing/${listing._id}`} >
            <div className="flex gap-x-2">
              <img
                className="w-15 h-10"
                src="https://mbluxury1.s3.amazonaws.com/2024/02/26165331/Luxury-hotel-website-design.jpg"
                alt=""
              />
              <p className="font-semibold hover:underline truncate">{listing.name}</p>
            </div>
            </Link >
            <div className="flex flex-col">
              <button
              onClick={()=>handleListingDelete(listing._id)}
                type="button"
                className="text-red-700 uppercase text-sm font-semibold cursor-pointer"
              >
                Delete
              </button>
              <Link to={`/update-listing/${listing._id}`} >
              <button
                type="button"
                className="text-green-700 uppercase text-sm font-semibold cursor-pointer"
                > Edit</button>
                </Link>
            </div>
          </div>

        ))}
    </div>
  );
}
