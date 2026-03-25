import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../store/slice/bookSlice";
import { fetchReviews, addReview } from "../../store/slice/reviewSlice";

const ReviewApp = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { reviews } = useSelector((state) => state.reviews);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleReview = () => {
    if (!selectedBook) return;
    dispatch(addReview({ bookId: selectedBook.id, rating, comment }));
    setRating(5);
    setComment("");
  };

  const reviewsByBook = reviews.reduce((acc, r) => {
    acc[r.book] = acc[r.book] ? [...acc[r.book], r] : [r];
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        📚 Book Reviews
      </h2>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => setSelectedBook(book)}
            className={`bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl ${
              selectedBook?.id === book.id ? "ring-2 ring-blue-500" : ""
            }`}
          >
            {book.photo && (
              <img
                src={book.photo}
                alt={book.title}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {book.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                by {book.author}
              </p>

              <div className="mt-3">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Reviews
                </h4>

                <div className="max-h-40 overflow-y-auto space-y-2">
                  {(reviewsByBook[book.id] || []).map((r) => (
                    <div
                      key={r.id}
                      className="bg-gray-50 border rounded-lg p-2"
                    >
                      <p className="text-sm font-medium text-gray-700">
                        {r.student_email} ⭐ {r.rating}
                      </p>
                      <p className="text-sm text-gray-600">
                        {r.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Form */}
      {selectedBook && (
        <div className="mt-10 flex justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Review: {selectedBook.title}
            </h3>

            <div className="flex items-center gap-3 mb-3">
              <label className="text-sm font-medium">Rating:</label>
              <input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <textarea
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            />

            <button
              onClick={handleReview}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewApp;
