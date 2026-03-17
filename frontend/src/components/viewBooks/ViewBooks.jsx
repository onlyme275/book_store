import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../../store/slice/bookSlice";

const ViewBooks = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleBuy = (book) => {
    alert(`You bought "${book.title}" for $${book.price}!`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Books</h2>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Books Grid */}
      {!loading && books.length === 0 && (
        <p>No books available.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            {/* Image */}
            {book.photo && (
              <img
                src={book.photo}
                alt={book.title}
                className="h-40 w-full object-cover mb-3 rounded"
              />
            )}

            {/* Info */}
            <h3 className="font-bold text-lg">{book.title}</h3>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm">Price: ${book.price}</p>
            <p className="text-xs text-gray-500">
              Seller: {book.seller_email}
            </p>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleBuy(book)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Buy
              </button>

              <button
                onClick={() => handleDelete(book.id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBooks;