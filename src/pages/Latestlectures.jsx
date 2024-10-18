import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WebinarCard from "./WebinarCard";
import axiosInstance from "../lib/axiosInstance";
import LoadingWrapper from "../components/ui/LoadingWrapper";

function LatestLectures() {
  const navigate = useNavigate(); // Hook to handle navigation

  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDocumentries = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/lectures");
        setLectures(response.data.results);
      } catch (e) {
        console.log("Error getting the lecture", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentries();
  }, []);

  return (
    <LoadingWrapper loading={loading} >
      <div>
        <h1 className="text-white text-3xl font-semibold ml-8 mt-3 p-4">
          Latest Lectures
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mx-8 my-4">
          {lectures.map((lecture) => (
            <WebinarCard
              title={lecture.title}
              genre="Webinar Genre"
              height={300}
              image={
                lecture.coverImageUrl ||
                `${process.env.PUBLIC_URL}/images/Tokyotrain.png`
              }
              link={`/documentaries/${lecture.id}`}
            />
          ))}
        </div>
      </div>
    </LoadingWrapper>
  );
}

export default LatestLectures;
