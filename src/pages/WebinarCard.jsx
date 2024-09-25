import React from 'react';

function WebinarCard({ title, year, genre, image, height, author }) {
  return (
    <div
      className="rounded-xl shadow-lg bg-[#1c1c1e] text-white border-2 border-gray-400 relative"
      style={{ height: height || '400px' }} // Default height is 400px
    >
      <img
        src={image}
        alt={title}
        className="rounded-t-xl w-full object-cover rounded-lg"
        style={{ height: '100%' }} // Adjust the height of the image portion
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-white to-transparent text-black p-4 rounded-b-xl">
        <h3 className="font-semibold">{title}</h3>
        {/* Conditionally render either author or year/genre */}
        {author ? (
          <p className="text-sm">{author}</p>
        ) : (
          <p className="text-sm">
            {year} | {genre}
          </p>
        )}
      </div>
    </div>
  );
}

export default WebinarCard;
