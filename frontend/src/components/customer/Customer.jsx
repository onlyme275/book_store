import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../store/slice/bookSlice";

const Customer = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const soldBooks = books.filter((book) => book.is_sold);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🛒 Purchased Books
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : soldBooks.length === 0 ? (
        <p className="text-center text-gray-500">
          No books have been purchased yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {soldBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              {book.photo && (
                <img
                  src={book.photo}
                  alt={book.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {book.title}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Sold
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Author: <span className="font-medium">{book.author}</span>
                </p>

                <p className="text-sm text-gray-500">
                  Price: <span className="font-medium">${book.price}</span>
                </p>

                <div className="text-sm text-gray-600 space-y-1 mt-2">
                  <p>
                    <span className="font-medium">Seller:</span>{" "}
                    {book.seller_email}
                  </p>
                  <p>
                    <span className="font-medium">Buyer:</span>{" "}
                    {book.buyer_email}
                  </p>
                </div>

                <div className="text-xs text-gray-400 mt-3 border-t pt-2">
                  <p>
                    Created: {new Date(book.created_at).toLocaleString()}
                  </p>
                  <p>
                    Updated: {new Date(book.updated_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customer;