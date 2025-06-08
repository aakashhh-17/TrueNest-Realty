import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-1 border-slate-200 sm:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex gap-2 items-center ">
            <label className="whitespace-nowrap font-semibold">Search Term: </label>
            <input
              type="text"
              className="bg-white border-transparent rounded-lg p-3 w-full"
              placeholder="search.."
              id="searchTerm"
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2 ">
              <input type="checkbox" className="w-5" id="all" />{" "}
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" className="w-5" id="rent" />{" "}
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" className="w-5" id="sale" />{" "}
              <span>Sale</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" className="w-5" id="offer" />{" "}
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <label className="font-semibold">Amenities</label>
            <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="furnished"/>
                <span>Furnished</span>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" className="w-5" id="parking" />
                <span>Parking</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold" >Sort: </label>
            <select id="sort_order" className="w-fit border-transparent rounded-lg p-2 bg-white">
                <option value="">Price High to Low</option>
                <option value="">Price Low to High</option>
                <option value="">Latest</option>
                <option value="">Oldest</option>
            </select>
          </div>
          <button className="w-full bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95">Search</button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold p-3 text-slate-700 mt-5"> Listing results</h1>
       </div>
    </div>
  );
}
