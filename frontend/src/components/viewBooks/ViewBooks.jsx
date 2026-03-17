import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook } from "../../features/book/bookSlice";

const ViewBooks = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector(state => state.books);

  useEffect(() => { dispatch(fetchBooks()); }, [dispatch]);

  const handleBuy = (book) => {
    alert(`You bought "${book.title}" for $${book.price}!`);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Available Books</h2>
      {loading ? <p>Loading...</p> :
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map(book => (
            <div key={book.id} className="border p-4 rounded shadow">
              {book.photo && <img src={`http://127.0.0.1:8000${book.photo}`} alt={book.title} className="h-40 w-full object-cover mb-2 rounded"/>}
              <h3 className="font-bold">{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
              <p>Seller: {book.seller_email}</p>
              <button onClick={() => handleBuy(book)} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">Buy</button>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default ViewBooks;