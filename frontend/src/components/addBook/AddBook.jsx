import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, addBook, updateBook, deleteBook } from "../../store/slice/bookSlice";

const AddBook = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);
  const [form, setForm] = useState({ title: "", author: "", price: "", photo: null });
  const [editingId, setEditingId] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => { dispatch(fetchBooks()); }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("price", form.price);
    if (form.photo) formData.append("photo", form.photo);
    if (editingId) {
      dispatch(updateBook({ id: editingId, bookData: formData }));
    } else {
      dispatch(addBook(formData));
    }
    setForm({ title: "", author: "", price: "", photo: null });
    setFileName("");
    setEditingId(null);
  };

  const handleEdit = (book) => {
    setForm({ title: book.title, author: book.author, price: book.price, photo: null });
    setFileName("");
    setEditingId(book.id);
  };

  const handleCancel = () => {
    setForm({ title: "", author: "", price: "", photo: null });
    setFileName("");
    setEditingId(null);
  };

  const handleDelete = (id) => { dispatch(deleteBook(id)); };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, photo: file });
    setFileName(file ? file.name : "");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 pb-6 border-b-2 border-slate-100">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-indigo-500 mb-1">
              Library Management
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Book Catalog
            </h1>
          </div>
          <span className="text-xs font-medium text-slate-400 tracking-wide bg-slate-50 border border-slate-200 rounded-full px-3 py-1">
            {books.length} {books.length === 1 ? "book" : "books"}
          </span>
        </div>

        {/* Form Card */}
        <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm shadow-slate-100 p-8 mb-10">
          {editingId && (
            <span className="absolute top-4 right-4 bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-indigo-100">
              ✎ Editing
            </span>
          )}

          <p className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6">
            {editingId ? "Update Book" : "Add New Book"}
          </p>

          <form onSubmit={handleSubmit}>
            {/* Title + Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">Title</label>
                <input
                  type="text"
                  placeholder="e.g. The Alchemist"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder-slate-300"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">Author</label>
                <input
                  type="text"
                  placeholder="e.g. Paulo Coelho"
                  value={form.author}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                  required
                  className="bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder-slate-300"
                />
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1.5 mb-4 max-w-[180px]">
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-400">Price (Rs)</label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.00"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  required
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm pl-7 pr-4 py-2.5 rounded-lg outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all placeholder-slate-300"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="relative mb-6">
              <label className="flex items-center gap-3 bg-slate-50 border border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30 px-4 py-3 rounded-lg cursor-pointer transition-all group">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 group-hover:border-indigo-300 group-hover:text-indigo-500 transition-all text-sm shadow-sm">
                  ↑
                </span>
                <div>
                  <p className={`text-sm font-medium ${fileName ? "text-indigo-600" : "text-slate-400"}`}>
                    {fileName || "Upload cover image"}
                  </p>
                  {!fileName && <p className="text-xs text-slate-300 mt-0.5">PNG, JPG up to 5MB</p>}
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold py-2.5 rounded-lg transition-all shadow-sm shadow-indigo-200"
              >
                {editingId ? "Save Changes" : "+ Add Book"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 text-sm font-medium rounded-lg transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Books Table */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400">All Books</p>
          {!loading && books.length > 0 && (
            <span className="text-xs text-slate-400">{books.length} total</span>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm shadow-slate-100">
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-indigo-300 border-t-indigo-600 animate-spin" />
              <p className="text-sm text-slate-400">Loading books...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <span className="text-4xl">📚</span>
              <p className="text-sm font-medium text-slate-400">No books added yet</p>
              <p className="text-xs text-slate-300">Add your first book above</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left text-xs font-semibold tracking-widest uppercase text-slate-400 px-5 py-3">
                    Book
                  </th>
                  <th className="text-left text-xs font-semibold tracking-widest uppercase text-slate-400 px-5 py-3 hidden sm:table-cell">
                    Price
                  </th>
                  <th className="text-right text-xs font-semibold tracking-widest uppercase text-slate-400 px-5 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {books.map((book) => (
                  <tr key={book.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-10 rounded bg-indigo-100 flex items-center justify-center text-indigo-400 text-xs flex-shrink-0">
                          📖
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{book.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{book.author}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-sm font-semibold text-emerald-600">Rs. {book.price}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(book)}
                          className="border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default AddBook;
