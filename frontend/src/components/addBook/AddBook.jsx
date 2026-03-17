import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, addBook, updateBook, deleteBook } from "../../store/slice/bookSlice";

const AddBook = () => {
  const dispatch = useDispatch();
  const { books, loading } = useSelector((state) => state.books);

  const [form, setForm] = useState({ title: "", author: "", price: "", photo: null });
  const [editingId, setEditingId] = useState(null);

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
    setEditingId(null);
  };

  const handleEdit = (book) => {
    setForm({ title: book.title, author: book.author, price: book.price, photo: null });
    setEditingId(book.id);
  };

  const handleDelete = (id) => { dispatch(deleteBook(id)); };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">{editingId ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
        <input type="text" placeholder="Author" value={form.author} onChange={e => setForm({...form, author: e.target.value})} required />
        <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
        <input type="file" onChange={e => setForm({...form, photo: e.target.files[0]})} />
        <button className="bg-orange-500 text-white px-4 py-2 rounded">{editingId ? "Update" : "Add"}</button>
      </form>

      <h3 className="text-lg mt-6">Books List</h3>
      <ul className="mt-3 space-y-2">
        {loading ? <p>Loading...</p> : books.map(book => (
          <li key={book.id} className="flex justify-between items-center p-2 border rounded">
            <span>{book.title} by {book.author} (${book.price})</span>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(book)} className="bg-yellow-400 px-2 rounded">Edit</button>
              <button onClick={() => handleDelete(book.id)} className="bg-red-500 px-2 rounded text-white">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddBook;