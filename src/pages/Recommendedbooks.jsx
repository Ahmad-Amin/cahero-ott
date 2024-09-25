import React from 'react';
import WebinarCard from './WebinarCard';

function RecommendedBooks() {
  return (
    <div>
      <h1 className="text-white text-3xl font-semibold ml-8 mt-3 p-4">Recommended Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 my-4">
        <WebinarCard
          title="The Black Witch"
          author="Laurie Forest"
          image={`${process.env.PUBLIC_URL}/images/TheBlackWitch.png`}
        />
        <WebinarCard
          title="The Prisoner's Key"
          author="C.J. Archer"
          image={`${process.env.PUBLIC_URL}/images/ThePrisonersKey.png`}
        />
        <WebinarCard
          title="Light Mage"
          author="Laurie Forest"
          image={`${process.env.PUBLIC_URL}/images/LightMage.png`}
        />
        <WebinarCard
          title="The Fire Queen"
          author="Emily R. King"
          image={`${process.env.PUBLIC_URL}/images/TheFireQueen.png`}
        />
      </div>
    </div>
  );
}

export default RecommendedBooks;
