import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  console.log("Message:", message);
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.useRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.useRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            className=" w-full  border border-gray-500 rounded-md p-2 focus:outline-none"
            name="message"
            id="message"
            rows="2"
            value={message}
            placeholder="Message to landlord.."
          ></textarea>

          <Link to= {`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} 
          className="bg-slate-700 text-white rounded-md p-3 text-center uppercase">Send Message</Link>
        </div>
      )}
    </>
  );
}
