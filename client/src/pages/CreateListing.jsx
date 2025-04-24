import React from "react";

function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="font-semibold text-3xl text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="bg-white p-3 rounded-lg border border-slate-200"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <input
            type="text"
            placeholder="Description"
            id="description"
            className="bg-white p-3 rounded-lg border border-slate-200"
            required
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            className="bg-white p-3 rounded-lg border border-slate-200"
            required
          />
          <div className="flex flex-wrap gap-7">
            <div className="flex  gap-2">
              <input type="checkbox" id="sale" className="w-5" />{" "}
              <span>Sale</span>
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" id="rent" className="w-5" />{" "}
              <span>Rent</span>
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" id="parking" className="w-5" />{" "}
              <span>Parking Spot</span>
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" id="furnished" className="w-5" />{" "}
              <span>Furnished</span>
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" id="offer" className="w-5" />{" "}
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
              />{" "}
              <span>Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                className="w-20 p-3 bg-white rounded-md border border-slate-200"
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
            <input className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept="images/*" multiple />
            <button className="text-green-700 border p-3 rounded-md border-green-700 uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
          </div>
        <button className="p-3 mt-3 bg-slate-700 text-white rounded-md uppercase hover:opacit-95 disabled:opacity-80">Create listing</button>
        </div>
      </form>
    </main>
  );
}

export default CreateListing;
