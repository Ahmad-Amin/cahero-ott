import React from 'react';
import WebinarCard from './WebinarCard';

function LatestLectures() {
  return (
    <div>
      <h1 className="text-white text-3xl font-semibold ml-8 mt-3 p-4">Latest Lectures</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mx-8 my-4">
        <WebinarCard
          title="Affection of Love"
          year="2022"
          genre="Tutor Name"
          image={`${process.env.PUBLIC_URL}/images/AffectionOfLove.png`}
          height="300px" // Smaller height for this card
        />
        <WebinarCard
          title="Physical Activities"
          year="2022"
          genre="Tutor Name"
          image={`${process.env.PUBLIC_URL}/images/PhysicalActivities.png`}
          height="300px" // Smaller height for this card
        />
        <WebinarCard
          title="Study of Stars"
          year="2022"
          genre="Tutor Name"
          image={`${process.env.PUBLIC_URL}/images/StudyOfStars.png`}
          height="300px" // Smaller height for this card
        />
      </div>
    </div>
  );
}

export default LatestLectures;
