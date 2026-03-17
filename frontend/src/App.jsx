// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import DashboardHome from "./dashboard/DashboardHome";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import Info from "./components/info/info";
import AddStudent from "./components/addStudent/AddStudent";
import Message from "./components/message/Message";
import AddBook from "./components/addBook/AddBook";
import ViewBooks from "./components/viewBooks/ViewBooks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested routes rendered in Dashboard's <Outlet /> */}
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<Info />} />
          <Route path="students" element={<AddStudent />} />
          <Route path="messages" element={<Message />} />
          <Route path="books" element={<AddBook />} />
          <Route path="views" element={<ViewBooks />}/>
        </Route>
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
