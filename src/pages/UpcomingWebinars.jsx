import React, { useEffect, useState } from "react";
import WebinarCard from "./WebinarCard";
import axiosInstance from "../lib/axiosInstance";
import { useSelector } from "react-redux";

function UpcomingWebinars() {
  const [webinars, setWebinars] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      if (user?.id !== "") {
        try {
          const response = await axiosInstance.get("/webinars");
          setWebinars(response.data.results.slice(0, 4));
        } catch (error) {
          console.log("Error fetching the webinars");
        }
      } 
    })();
  }, [user]);

  return (
    <div>
      <h1 className="text-white text-3xl font-semibold ml-8 mt-3 p-4">
        Upcoming Webinars
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 my-4">
        {webinars.map((webinar) => {
          return <WebinarCard
            title={webinar.title}
            year={webinar.startDate.split('-')[0]}
            genre="Webinar Genre"
            image={`${process.env.PUBLIC_URL}/images/Tokyotrain.png`}
            link={`/webinar/${webinar.id}`}
          />;
        })}
      </div>
    </div>
  );
}

export default UpcomingWebinars;
