import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook, buyBook } from "../../store/slice/bookSlice";

const ViewBooks = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  const handleBuy = (book) => {
    dispatch(buyBook(book.id));
  };

  

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Books</h2>

      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map(book => (
            <div key={book.id} className="border p-4 rounded shadow">
              
              {/* Image */}
              {book.photo && (
                <img
                  src={book.photo}
                  alt={book.title}
                  className="h-40 w-full object-cover mb-2 rounded"
                />
              )}

              {/* Info */}
              <h3 className="font-bold">{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>

              <p className="text-xs text-gray-500">
                Seller: {book.seller_email}
              </p>

              {/* Time */}
              <p className="text-xs text-gray-400">
                Created: {new Date(book.created_at).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">
                Updated: {new Date(book.updated_at).toLocaleString()}
              </p>

              {/* Status */}
              <p className="text-sm mt-1">
                Status: {book.is_sold ? "Sold" : "Available"}
              </p>

              {/* Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleBuy(book)}
                  disabled={book.is_sold}
                  className={`px-2 py-1 text-white rounded ${
                    book.is_sold ? "bg-gray-400" : "bg-green-500"
                  }`}
                >
                  {book.is_sold ? "Sold" : "Buy"}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBooks;
