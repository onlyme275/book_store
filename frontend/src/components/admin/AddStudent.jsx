// src/pages/AddStudent.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../../store/slice/studentSlice";

const AddStudent = () => {
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state.students);

  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    student_class: "",
    fathername: "",
    mothename: "",
    address: "",
    email: "",
    password: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateStudent({ id: editingId, studentData: formData }));
      setEditingId(null);
    } else {
      dispatch(addStudent(formData));
    }
    setFormData({
      firstname: "",
      middlename: "",
      lastname: "",
      student_class: "",
      fathername: "",
      mothename: "",
      address: "",
      email: "",
      password: "",
    });
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      firstname: student.firstname,
      middlename: student.middlename,
      lastname: student.lastname,
      student_class: student.student_class,
      fathername: student.fathername,
      mothename: student.mothename,
      address: student.address,
      email: student.user.email,
      password: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add / Edit Student</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        {["firstname","middlename","lastname","student_class","fathername","mothename","address","email","password"].map((field) => (
          <input
            key={field}
            type={field==="password"?"password":"text"}
            name={field}
            placeholder={field}
            value={formData[field]}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required={field!=="middlename"}
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Student List</h2>
      {loading ? <p>Loading...</p> : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="border p-2">{s.firstname} {s.middlename} {s.lastname}</td>
                <td className="border p-2">{s.student_class}</td>
                <td className="border p-2">{s.email}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-yellow-500 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="bg-red-500 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddStudent;