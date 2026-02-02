import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
// import AppRoutes from "./routes/AppRoutes.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Dashboard from "./pages/auth/dashboard/Dashboard.jsx";
import Home from "./pages/auth/Home.jsx";

function App() {
  return (
    <div>
      {/* <h1>Welcome to the E-Advertisement Project</h1> */}
      <BrowserRouter>
        <Routes>
          {/* default */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* Protected routes */}
          
            <Route path="/home" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} />
            <Route path="/dashboard" element={
              <ProtectedRoute >
                <Dashboard />
              </ProtectedRoute>} />
        </Routes>
        {/* <AppRoutes /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
