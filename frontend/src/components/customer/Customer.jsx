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
    <div className="p-6">
      <h2 className="text-xl mb-4">Purchased Books</h2>
      {loading ? (
        <p>Loading...</p>
      ) : soldBooks.length === 0 ? (
        <p>No books have been purchased yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {soldBooks.map((book) => (
            <div key={book.id} className="border p-4 rounded shadow">
              {book.photo && (
                <img
                  src={book.photo}
                  alt={book.title}
                  className="h-40 w-full object-cover mb-2 rounded"
                />
              )}
              <h3 className="font-bold">{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
              <p>Seller: {book.seller_email}</p>
              <p>Buyer: {book.buyer_email}</p>
              <p>Status: {book.is_sold ? "Sold" : "Available"}</p>
              <p>Created: {new Date(book.created_at).toLocaleString()}</p>
              <p>Updated: {new Date(book.updated_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Customer;
