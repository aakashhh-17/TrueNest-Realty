import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  // console.log(offerListings);
  // console.log(rentListings);
  // console.log(saleListings);

  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);

  return (
    <div className="flex flex-col">
      <div>
        <div className="p-30 flex flex-col gap-7">
          <h1 className="font-bold text-3xl lg:text-6xl text-slate-700">
            Find your next <span className="text-slate-500">perfect</span>{" "}
            <br /> place with ease{" "}
          </h1>
          <div className="text-slate-400 font-semibold">
            <p>
              TrueNest Realty will help you find your home fast, easy and
              comfortable.
            </p>
            <p>Our expert support are always available.</p>
          </div>
          <Link
            to={"/search"}
            className="text-xs sm:text-sm font-bold text-blue-700 hover:underline"
          >
            Let's get started...
          </Link>
        </div>
        <Swiper navigation>
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat `,
                    backgroundSize: "cover",
                  }}
                  className="h-[500px]"
                  key={listing._id}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>

        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
          {offerListings && offerListings.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-slate-500 text-xl font-semibold">
                  Recent offers
                </h2>
                <Link
                  className="text-sm text-blue-700 hover:underline"
                  to={`/search?offer=true`}
                >
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {saleListings && saleListings.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-slate-500 text-xl font-semibold">
                  Recent places for sale
                </h2>
                <Link
                  className="text-sm text-blue-700 hover:underline"
                  to={`/search?type=sale`}
                >
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
          {rentListings && rentListings.length > 0 && (
            <div>
              <div className="my-3">
                <h2 className="text-slate-500 text-xl font-semibold">
                  Recent places for rent
                </h2>
                <Link
                  className="text-sm text-blue-700 hover:underline"
                  to={`/search?type=rent`}
                >
                  Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
