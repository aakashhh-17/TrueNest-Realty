import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import SwiperCore, { Swiper } from 'swiper'
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle'

export default function Listing() {
    SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setLoading(false);
        setError(false)
        setListing(data);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
  <main>
    {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
    {error && <p className="text-center text-red-700 my-7 text-2xl">Something went wrong</p>}
    {listing && !error && !loading && (
        <Swiper Navigation>
          {
            listing.imageUrls.map( url => <SwiperSlide key={url}>
              <div className="h-[550px]" style={{background: `url(${url}) center no-repeat`, backgroundSize: `cover`}}>

              </div>
            </SwiperSlide>
            )
          }
        </Swiper>
    )}
  </main>
  )
}
