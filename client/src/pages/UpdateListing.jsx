import React, { useEffect, useRef, useState } from "react";
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router-dom";

function UpdateListing() {
const {currentUser} = useSelector(state => state.user);
const navigate = useNavigate();
const params = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] =  useState(false);

  useEffect(()=>{
    const fetchListing = async ()=>{
const listingId = params.listingId;
console.log(listingId);
const res = await fetch(`/api/listing/get/${listingId}`)
const data =  await res.json();
if(data.success === false){
  console.log(data.message);
  
}
setFormData(data);
    }
    fetchListing();
  }, [])

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

// console.log(currentUser.rest._id);
  const handleSubmit = async (e)=>{
e.preventDefault();
try {
  setLoading(true)
  setError(false);
  const res = await fetch(`/api/listing/update/${params.listingId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...formData,
      useRef: currentUser.rest._id
    })
  });

  const data = await res.json();
  setLoading(false);
  if(data.success === false){
    setError(error.message)
  }
  navigate(`/listing/${data._id}`)
} catch (error) {
  setError(error.message)
  setLoading(false)
}
  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">
        Update Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="bg-white p-3 rounded-lg border border-slate-200"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            placeholder="Description"
            id="description"
            className="bg-white p-3 rounded-lg border border-slate-200"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="bg-white p-3 rounded-lg border border-slate-200"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex flex-wrap gap-7">
            <div className="flex  gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />{" "}
              <span>Sale</span>
            </div>
            <div className="flex  gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />{" "}
              <span>Rent</span>
            </div>
            <div className="flex  gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />{" "}
              <span>Parking Spot</span>
            </div>
            <div className="flex  gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />{" "}
              <span>Furnished</span>
            </div>
            <div className="flex  gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />{" "}
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-5 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                className="w-20 p-3 bg-white rounded-md border border-slate-200 "
                min={1}
                max={10}
                onChange={handleChange}
                value={formData.bedrooms}
              />{" "}
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                className="w-20 p-3 bg-white rounded-md border border-slate-200"
                min={1}
                max={10}
                onChange={handleChange}
                value={formData.bathrooms}
              />{" "}
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                className="w-20 p-3 bg-white rounded-md border border-slate-200"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col">
                <span>Regular Price</span>
                <span>($/month)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                id="discountPrice"
                className="w-20 p-3 bg-white rounded-md border border-slate-200"
                onChange={handleChange}
                value={formData.discountPrice}
              />
              <div className="flex flex-col">
                <span>Discounted Price</span>
                <span>($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-gray-700 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button className="text-green-700 border p-3 rounded-md border-green-700 uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="p-3 mt-3 bg-slate-700 text-white rounded-md uppercase hover:opacit-95 disabled:opacity-80">
            {loading ? 'Updating..' : 'Updated Listing'}
          </button>
          {error ? <p className="text-red-700">{error.message}</p> : ''}
        </div>
      </form>
    </main>
  );
}

export default UpdateListing;
