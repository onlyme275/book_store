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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [profileFileName, setProfileFileName] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
      setProfileFileName(files[0]?.name || "");
    } else {
      setForm({ ...form, [name]: value });
    }
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
        .then(() => { alert("Student updated!"); resetForm(); })
        .catch(() => alert("Update failed"));
    } else {
      dispatch(addStudent(formData))
        .unwrap()
        .then(() => { alert("Student added!"); resetForm(); })
        .catch(() => alert("Add failed"));
    }
  };

  const handleEdit = (student) => {
    setIsEditing(true);
    setProfileFileName("");
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
    setShowFormModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const resetForm = () => {
    setForm({
      id: null, firstname: "", middlename: "", lastname: "",
      student_class: "", fathername: "", mothename: "",
      address: "", email: "", password: "", profile_picture: null,
    });
    setProfileFileName("");
    setIsEditing(false);
    setShowFormModal(false);
  };

  const filteredStudents = students ? students.filter((s) =>
    `${s.firstname} ${s.middlename} ${s.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.student_class?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const inputCls = "bg-slate-50 border border-slate-200 text-slate-800 text-sm px-4 py-2.5 rounded-lg outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all placeholder-slate-300 w-full";

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b-2 border-slate-100">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 mb-1">School Management</p>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Students</h1>
          </div>
          <button
            onClick={() => { setIsEditing(false); resetForm(); setShowFormModal(true); }}
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-violet-200"
          >
            <span className="text-lg leading-none">+</span> Add Student
          </button>
        </div>

        {/* ── Search + Table Card ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/60">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 self-start sm:self-center">
              All Students
              <span className="ml-2 font-normal text-slate-300">({filteredStudents.length})</span>
            </p>
            <div className="relative w-full sm:w-72">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search name, email or class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white border border-slate-200 text-slate-700 text-sm pl-8 pr-4 py-2 rounded-lg outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all w-full placeholder-slate-300"
              />
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-violet-300 border-t-violet-600 animate-spin" />
              <p className="text-sm text-slate-400">Loading students...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left text-xs font-semibold tracking-widest uppercase text-slate-400 px-5 py-3">#</th>
                    <th className="text-left text-xs font-semibold tracking-widest uppercase text-slate-400 px-5 py-3">Student</th>
                    <th className="text-left text-xs font-semibold tracking-widest uppercase text-slate-400 px-5 py-3 hidden md:table-cell">Class</th>
                    <th className="text-left text-xs font-semibold tracking-widest uppercase text-slate-400 px-5 py-3 hidden lg:table-cell">Email</th>
                    <th className="text-right text-xs font-semibold tracking-widest uppercase text-slate-400 px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-14">
                        <p className="text-3xl mb-2">🎓</p>
                        <p className="text-sm font-medium text-slate-400">No students found</p>
                        <p className="text-xs text-slate-300 mt-1">Try a different search or add a new student</p>
                      </td>
                    </tr>
                  ) : filteredStudents.map((s, i) => (
                    <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 text-xs text-slate-400">{i + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {s.profile_picture ? (
                            <img src={s.profile_picture} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-slate-200" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-500 text-xs font-bold flex-shrink-0">
                              {s.firstname?.[0]}{s.lastname?.[0]}
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-slate-800">
                              {s.firstname} {s.middlename} {s.lastname}
                            </div>
                            <div className="text-xs text-slate-400 md:hidden">{s.student_class}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="bg-violet-50 text-violet-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-violet-100">
                          {s.student_class}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500 hidden lg:table-cell">{s.email}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => setSelectedStudent(s)}
                            className="border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                          >View</button>
                          <button
                            onClick={() => handleEdit(s)}
                            className="border border-slate-200 text-slate-500 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                          >Edit</button>
                          <button
                            onClick={() => handleDelete(s.id)}
                            className="border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                          >Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════
          ADD / EDIT STUDENT MODAL
      ══════════════════════════════════════ */}
      {showFormModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 mb-0.5">
                  {isEditing ? "Modify Record" : "New Entry"}
                </p>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {isEditing ? "Edit Student" : "Add Student"}
                </h2>
              </div>
              <button
                onClick={resetForm}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all text-xl"
              >×</button>
            </div>

            {/* Modal Body */}
            <div className="px-7 py-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Row */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">Full Name</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input type="text" name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} className={inputCls} required />
                    <input type="text" name="middlename" placeholder="Middle Name" value={form.middlename} onChange={handleChange} className={inputCls} />
                    <input type="text" name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} className={inputCls} required />
                  </div>
                </div>

                {/* Class */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">Class</p>
                  <input type="text" name="student_class" placeholder="e.g. Grade 10 - A" value={form.student_class} onChange={handleChange} className={inputCls} required />
                </div>

                {/* Parent Names */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">Parents</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="fathername" placeholder="Father's Name" value={form.fathername} onChange={handleChange} className={inputCls} required />
                    <input type="text" name="mothename" placeholder="Mother's Name" value={form.mothename} onChange={handleChange} className={inputCls} required />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">Address</p>
                  <textarea
                    name="address"
                    placeholder="Full address..."
                    value={form.address}
                    onChange={handleChange}
                    rows={2}
                    className={`${inputCls} resize-none`}
                    required
                  />
                </div>

                {/* Email + Password */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">Account</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} className={inputCls} required />
                    <input type="password" name="password" placeholder={isEditing ? "Leave blank to keep" : "Password"} value={form.password} onChange={handleChange} className={inputCls} required={!isEditing} />
                  </div>
                </div>

                {/* Profile Picture */}
                <div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-slate-400 mb-2">Profile Picture</p>
                  <label className="flex items-center gap-3 bg-slate-50 border border-dashed border-slate-300 hover:border-violet-400 hover:bg-violet-50/30 px-4 py-3 rounded-lg cursor-pointer transition-all group relative">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 group-hover:border-violet-300 group-hover:text-violet-500 transition-all text-sm shadow-sm flex-shrink-0">↑</span>
                    <div>
                      <p className={`text-sm font-medium ${profileFileName ? "text-violet-600" : "text-slate-400"}`}>
                        {profileFileName || "Upload profile photo"}
                      </p>
                      {!profileFileName && <p className="text-xs text-slate-300 mt-0.5">PNG, JPG up to 5MB</p>}
                    </div>
                    <input type="file" name="profile_picture" onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer w-full" />
                  </label>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-violet-600 hover:bg-violet-700 active:scale-95 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-sm shadow-violet-200"
                  >
                    {isEditing ? "Save Changes" : "Add Student"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 border border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 text-sm font-medium rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          VIEW STUDENT DETAILS MODAL
      ══════════════════════════════════════ */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-0.5">Student Profile</p>
                <h2 className="text-xl font-extrabold text-slate-900">Details</h2>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all text-xl"
              >×</button>
            </div>

            {/* Modal Body */}
            <div className="px-7 py-6">
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-7 pb-6 border-b border-slate-100">
                {selectedStudent.profile_picture ? (
                  <img src={selectedStudent.profile_picture} alt="Profile" className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-500 text-2xl font-bold border border-violet-100">
                    {selectedStudent.firstname?.[0]}{selectedStudent.lastname?.[0]}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {selectedStudent.firstname} {selectedStudent.middlename} {selectedStudent.lastname}
                  </h3>
                  <span className="bg-violet-50 text-violet-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-violet-100 mt-1 inline-block">
                    {selectedStudent.student_class}
                  </span>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Email", value: selectedStudent.email },
                  { label: "Father's Name", value: selectedStudent.fathername },
                  { label: "Mother's Name", value: selectedStudent.mothename },
                  { label: "Address", value: selectedStudent.address },
                  { label: "Registered", value: selectedStudent.created_at ? new Date(selectedStudent.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                    <p className="text-xs font-semibold tracking-wide uppercase text-slate-400 mb-1">{label}</p>
                    <p className="text-sm text-slate-700 font-medium">{value || "—"}</p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-7 flex gap-3">
                <button
                  onClick={() => { setSelectedStudent(null); handleEdit(selectedStudent); }}
                  className="flex-1 border border-violet-200 text-violet-600 hover:bg-violet-50 text-sm font-semibold py-2.5 rounded-xl transition-all"
                >
                  Edit Student
                </button>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 bg-slate-900 hover:bg-slate-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
