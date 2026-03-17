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
  const { students, loading, error } = useSelector((state) => state.student);

  const [form, setForm] = useState({
    id: null,
    firstname: "",
    middlename: "",
    lastname: "",
    student_class: "",
    fathername: "",
    mothename: "",
    address: "",
    email: "",
    password: "",
    profile_picture: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, [name]: files[0] });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      if (form[key] !== null) formData.append(key, form[key]);
    }

    if (isEditing) {
      dispatch(updateStudent({ id: form.id, studentData: formData }))
        .unwrap()
        .then(() => {
          alert("Student updated!");
          resetForm();
        })
        .catch(() => alert("Update failed"));
    } else {
      dispatch(addStudent(formData))
        .unwrap()
        .then(() => {
          alert("Student added!");
          resetForm();
        })
        .catch(() => alert("Add failed"));
    }
  };

  const handleEdit = (student) => {
    setIsEditing(true);
    setForm({
      id: student.id,
      firstname: student.firstname || "",
      middlename: student.middlename || "",
      lastname: student.lastname || "",
      student_class: student.student_class || "",
      fathername: student.fathername || "",
      mothename: student.mothename || "",
      address: student.address || "",
      email: student.email || "",
      password: "",
      profile_picture: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      firstname: "",
      middlename: "",
      lastname: "",
      student_class: "",
      fathername: "",
      mothename: "",
      address: "",
      email: "",
      password: "",
      profile_picture: null,
    });
    setIsEditing(false);
  };

  const filteredStudents = students ? students.filter((s) =>
    `${s.firstname} ${s.middlename} ${s.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.student_class?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      {/* Form Section */}
      <div className="bg-white shadow-md p-6 rounded">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-orange-600">
            {isEditing ? "Edit Student" : "Add Student"}
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="text-orange-600 hover:underline font-medium"
          >
            {showForm ? "Hide Form" : "Show Form"}
          </button>
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={form.firstname || ""}
                onChange={handleChange}
                className="border p-2 rounded flex-1"
                required
              />
              <input
                type="text"
                name="middlename"
                placeholder="Middle Name"
                value={form.middlename || ""}
                onChange={handleChange}
                className="border p-2 rounded flex-1"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={form.lastname || ""}
                onChange={handleChange}
                className="border p-2 rounded flex-1"
                required
              />
            </div>

            <input
              type="text"
              name="student_class"
              placeholder="Class"
              value={form.student_class || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />

            <div className="flex gap-4">
              <input
                type="text"
                name="fathername"
                placeholder="Father Name"
                value={form.fathername || ""}
                onChange={handleChange}
                className="border p-2 rounded flex-1"
                required
              />
              <input
                type="text"
                name="mothename"
                placeholder="Mother Name"
                value={form.mothename || ""}
                onChange={handleChange}
                className="border p-2 rounded flex-1"
                required
              />
            </div>

            <textarea
              name="address"
              placeholder="Address"
              value={form.address || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />

            <div className="flex gap-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email || ""}
                onChange={handleChange}
                className="border p-2 rounded flex-1"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password || ""}
                onChange={handleChange}
                className="border p-2 rounded flex-1"
                required={!isEditing}
              />
            </div>

            <input
              type="file"
              name="profile_picture"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 flex-1"
              >
                {isEditing ? "Update Student" : "Add Student"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 flex-1"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Students List Section */}
      <div className="bg-white shadow-md p-4 rounded overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-orange-600">Students List</h2>
          <input
            type="text"
            placeholder="Search by name, email or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full md:w-80"
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border border-gray-200">
            <thead className="bg-orange-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Class</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, i) => (
                <tr key={s.id} className="hover:bg-orange-50">
                  <td className="border p-2">{i + 1}</td>
                  <td className="border p-2">
                    {s.firstname} {s.middlename} {s.lastname}
                  </td>
                  <td className="border p-2">{s.student_class}</td>
                  <td className="border p-2">{s.email}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(s)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-orange-600 mb-4 border-b pb-2">Student Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 font-semibold">Full Name:</p>
                <p>{selectedStudent.firstname} {selectedStudent.middlename} {selectedStudent.lastname}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Class:</p>
                <p>{selectedStudent.student_class}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Email:</p>
                <p>{selectedStudent.email}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Father's Name:</p>
                <p>{selectedStudent.fathername}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Mother's Name:</p>
                <p>{selectedStudent.mothename}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Address:</p>
                <p>{selectedStudent.address}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Created At:</p>
                <p>{new Date(selectedStudent.created_at).toLocaleString()}</p>
              </div>
            </div>
            {selectedStudent.profile_picture && (
              <div className="mt-6">
                <p className="text-gray-600 font-semibold mb-2">Profile Picture:</p>
                <img
                  src={selectedStudent.profile_picture}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded shadow"
                />
              </div>
            )}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;