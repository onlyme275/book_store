import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../store/slice/bookSlice";
import { fetchReviews, addReview } from "../../store/slice/reviewSlice";

const ReviewApp = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { reviews, loading } = useSelector((state) => state.reviews);

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

  // Group reviews by book
  const reviewsByBook = reviews.reduce((acc, r) => {
    acc[r.book] = acc[r.book] ? [...acc[r.book], r] : [r];
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Books for Review</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border p-4 rounded shadow cursor-pointer"
            onClick={() => setSelectedBook(book)}
          >
            {book.photo && (
              <img
                src={book.photo}
                alt={book.title}
                className="h-40 w-full object-cover mb-2 rounded"
              />
            )}
            <h3 className="font-bold">{book.title}</h3>
            <p>Author: {book.author}</p>

            <div className="mt-2">
              <h4 className="font-semibold">Reviews</h4>
              {(reviewsByBook[book.id] || []).map((r) => (
                <div key={r.id} className="border p-2 rounded my-1">
                  <p>
                    <strong>{r.student_email}</strong> rated {r.rating} ⭐
                  </p>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="mt-6 p-4 border rounded shadow max-w-md">
          <h3 className="font-bold mb-2">Add Review for: {selectedBook.title}</h3>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border px-2 py-1 w-16 mr-2"
          />
          <input
            type="text"
            placeholder="Your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={handleReview}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewApp;