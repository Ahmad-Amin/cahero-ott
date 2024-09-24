import React from 'react';
import WebinarCard from './WebinarCard';

function RecommendedBooks() {
  return (
    <div>
      <h1 className="text-white text-3xl font-semibold ml-8 mt-3 p-4">Recommended Webinars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 my-4">
        <WebinarCard/>
        <WebinarCard/>
        <WebinarCard/>
        <WebinarCard/>
      </div>
    </div>
  );
}

export default RecommendedBooks;
