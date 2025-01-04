import React, { useState } from "react";
import people from "./../../data/review";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import Rating from '@mui/material/Rating';

const Review = () => {
  const [index, setIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(1);

  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };

  const nextPersons = () => {
    setIndex((index) => checkNumber(index + 2));
    setSecondIndex((secondIndex) => checkNumber(secondIndex + 2));
  };

  const prevPersons = () => {
    setIndex((index) => checkNumber(index - 2));
    setSecondIndex((secondIndex) => checkNumber(secondIndex - 2));
  };

  const truncateText = (text) => text.length > 100 ? `${text.substring(0, 100)}...` : text;

  const { name: name1, job: job1, image: image1, text: text1 } = people[index];
  const { name: name2, job: job2, image: image2, text: text2 } = people[secondIndex];

  return (
    <div className="flex items-center mt-6 justify-center">
      <button className="bg-gray-200 p-2 rounded-full mx-2" onClick={prevPersons}>
        <FaChevronLeft />
      </button>
      <div className="flex space-x-4">
        <article className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <div className="w-12 h-12 rounded-full overflow-hidden mb-4">
            <img src={image1} alt={name1} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm text-gray-600">
            <FaQuoteRight />
          </span>
          <h4 className="text-sm font-bold">{name1}</h4>
          <p className="text-sm text-gray-500">{job1}</p>
          <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
          <p className="text-sm text-gray-700">{truncateText(text1)}</p>
        </article>
        <article className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
          <div className="w-12 h-12 rounded-full overflow-hidden mb-4">
            <img src={image2} alt={name2} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm text-gray-600">
            <FaQuoteRight />
          </span>
          <h4 className="text-sm font-bold">{name2}</h4>
          <p className="text-sm text-gray-500">{job2}</p>
          <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
          <p className="text-sm text-gray-700">{truncateText(text2)}</p>
        </article>
      </div>
      <button className="bg-gray-200 p-2 rounded-full mx-2" onClick={nextPersons}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Review;
