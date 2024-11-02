"use client";

import { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Customer Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div
            key={review.review_id}
            className="border rounded-lg p-6 shadow-lg transition-transform duration-300 transform hover:scale-105 bg-white relative"
          >
            <div className="flex items-center mb-4">
              <UserCircleIcon className="h-6 w-6 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                {`Customer ${review.user_id}`}
              </h3>
            </div>
            <p className="text-gray-700 mt-2">{review.comment}</p>
            <div className="mt-4 flex items-center">
              <span className="text-yellow-500 font-bold">
                Rating: {review.rating} ★
              </span>
            </div>
            <div className="absolute top-0 right-0 p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 3a7 7 0 00-6.32 10.59l-2.09 2.09A1 1 0 002 17h4a1 1 0 00.71-1.71l-2.09-2.09A5 5 0 1010 15h1a5 5 0 000-10H10zm1 2h1a3 3 0 110 6h-1a3 3 0 110-6z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
