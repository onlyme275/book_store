// src/components/addBook/AddBook.jsx
import React, { useState } from "react";

function AddBook() {
  const [form, setForm] = useState({ title: "", author: "", price: "", isbn: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to backend API
    alert(`Book "${form.title}" submitted!`);
    setForm({ title: "", author: "", price: "", isbn: "" });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Add Book</h2>
        <p className="text-slate-500 text-sm mt-1">List a new book in the bookstore</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { id: "title", label: "Book Title", type: "text", placeholder: "The Great Gatsby" },
            { id: "author", label: "Author", type: "text", placeholder: "F. Scott Fitzgerald" },
            { id: "price", label: "Price ($)", type: "number", placeholder: "19.99" },
            { id: "isbn", label: "ISBN", type: "text", placeholder: "978-0-00-000000-0" },
          ].map((field) => (
            <div key={field.id}>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {field.label}
              </label>
              <input
                name={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.id]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-md mt-2"
          >
            📚 Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;