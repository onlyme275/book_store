// src/components/ViewBooks/ViewBooks.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, deleteBook, buyBook } from "../../store/slice/bookSlice";
import { BookOpen } from "lucide-react";

const BookCard = ({ book, onBuy }) => {
  const sold = book.is_sold;

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col">

      {/* Cover / Image */}
      <div className="relative h-36 bg-gray-50 flex items-center justify-center flex-shrink-0">
        {book.photo ? (
          <img
            src={book.photo}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <BookOpen size={28} className="text-gray-200" />
        )}

        {/* Status badge */}
        <span
          className={`absolute top-2.5 right-2.5 text-[10px] font-medium px-2 py-0.5 rounded-full ${
            sold
              ? "bg-gray-100 text-gray-400 border border-gray-200"
              : "bg-emerald-50 text-emerald-700"
          }`}
        >
          {sold ? "Sold" : "Available"}
        </span>
      </div>

      {/* Body */}
      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-sm font-medium text-gray-900 truncate leading-tight">
          {book.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{book.author}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-semibold text-gray-900">
            ${book.price}
          </span>
          <span className="text-[10px] text-gray-400 truncate max-w-[100px]">
            {book.seller_email}
          </span>
        </div>

        {/* Timestamps */}
        <div className="mt-2 space-y-0.5">
          <p className="text-[10px] text-gray-300">
            Added {new Date(book.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => !sold && onBuy(book)}
          disabled={sold}
          className={`mt-3 w-full py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 ${
            sold
              ? "bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-700 cursor-pointer"
          }`}
        >
          {sold ? "Sold out" : "Buy now"}
        </button>
      </div>
    </div>
  );
};

const ViewBooks = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleBuy = (book) => {
    dispatch(buyBook(book.id));
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Books</h2>
        {!loading && (
          <p className="text-xs text-gray-400 mt-0.5">
            {books.filter((b) => !b.is_sold).length} title
            {books.filter((b) => !b.is_sold).length !== 1 ? "s" : ""} available
          </p>
        )}
      </div>

      {/* States */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-100 rounded-xl h-64 animate-pulse"
            />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <BookOpen size={32} className="text-gray-200 mb-3" />
          <p className="text-sm text-gray-400">No books yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onBuy={handleBuy} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBooks;