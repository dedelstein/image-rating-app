import React, { useState, useEffect } from 'react';

const ImageRatingApp = () => {
  const [participantId, setParticipantId] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rating, setRating] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const allImages = [];
  for (let i = 1; i <= 200; i++) {
    allImages.push(`${i}a`);
    allImages.push(`${i}b`);
  }


  useEffect(() => {
    // Randomly select n images (let's say n = 10 for this example)
    const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    setSelectedImages(shuffled.slice(0, 10));
  }, []);

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
    setRatings([...ratings, { participantId, imageFile: selectedImages[currentImageIndex], rating: selectedRating }]);
    if (currentImageIndex < selectedImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setRating(null); // Reset rating for the next image
    } else {
      alert('All images have been rated!');
      console.log('Final ratings:', [...ratings, { participantId, imageFile: selectedImages[currentImageIndex], rating: selectedRating }]);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <input
        type="text"
        value={participantId}
        onChange={(e) => setParticipantId(e.target.value)}
        placeholder="Enter Participant ID"
        className="w-full p-2 mb-4 border rounded"
      />
      {selectedImages.length > 0 && (
        <div className="mb-4">
          <img
            src={`${process.env.PUBLIC_URL}/aligned/${selectedImages[currentImageIndex]}.jpg`}
            alt={`Image ${currentImageIndex + 1}`}
            className="w-full h-auto"
          />
        </div>
      )}
      <div className="mb-4">
        <p className="text-center mb-2">Rate from Unhappy (1) to Happy (10)</p>
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              onClick={() => handleRating(num)}
              className={`w-8 h-8 rounded-full ${
                rating === num ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center">
        Image {currentImageIndex + 1} of {selectedImages.length}
      </p>
    </div>
  );
};

export default ImageRatingApp;