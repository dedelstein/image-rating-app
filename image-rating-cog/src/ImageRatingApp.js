import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const ImageRatingApp = () => {
  const [participantId, setParticipantId] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rating, setRating] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  /*const allImages = [];
  for (let i = 1; i <= 200; i++) {
    allImages.push(`${i}a`);
    allImages.push(`${i}b`);
  }}*/

  const validImages = ['1b', '2a', '3a', '4a', '4b', '5b', '9a', '10a', '10b', '11b', '13a', '13b', '14a', '15a', '16a', '16b', '17a', '17b', '18a', '18b', '21b', '24a', '25b', '27a', '29a', '30a', '30b', '31a', '31b', '33a', '34b', '36a', '37b', '38a', '38b', '40a', '42a', '43a', '44a', '45a', '46a', '46b', '49b', '50a', '50b', '53b', '55b', '56a', '57a', '58a', '59a', '59b', '60a', '61b', '62b', '63a', '65b', '66a', '66b', '67b', '68a', '68b', '69a', '71a', '72b', '73a', '73b', '74a', '74b', '78a', '79a', '81b', '82a', '86a', '87b', '88b', '89a', '90a', '91a', '93a', '93b', '95b', '99a', '104a', '104b', '110a', '110b', '111a', '111b', '118a', '119a', '120a', '120b', '121a', '121b', '124a', '124b', '125a', '125b', '126b', '127a', '129a', '130a', '131a', '132a', '132b', '133a', '133b', '134a', '134b', '135b', '136a', '137a', '137b', '138b', '139a', '140a', '141a', '141b', '142b', '143b', '145a', '145b', '146a', '146b', '147a', '148a', '149a', '149b', '150a', '150b', '152b', '153a', '154a', '155a', '155b', '158b', '159a', '159b', '164b', '166a', '166b', '167b', '169b', '170a', '170b', '171a', '171b', '172a', '174a', '175b', '177a', '178b', '179b', '180a', '181a', '182b', '183a', '183b', '185a', '186a', '187a', '188a', '189a', '189b', '190b', '191a', '192a', '192b', '193b', '198a', '198b', '199b', '200a', '200b']

  useEffect(() => {
    setParticipantId(uuidv4());
    /*const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    setSelectedImages(shuffled.slice(0, 30));*/
    const shuffled = [...validImages].sort(() => 0.5 - Math.random());
    setSelectedImages(shuffled);
  }, []);

  const handleRating = async (selectedRating) => {
    setRating(selectedRating);
    const newRating = { participantId, imageFile: selectedImages[currentImageIndex], rating: selectedRating };
    const newRatings = [...ratings, newRating];
    setRatings(newRatings);
    
    try {
      await addDoc(collection(db, 'ratings'), newRating);
    } catch (error) {
      console.error('Error saving rating:', error);
    }
    
    if (currentImageIndex < selectedImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setRating(null);
    } else {
      alert('All images have been rated!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
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
