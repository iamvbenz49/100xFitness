import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./routes/protectedRoute";
import Login from "./Pages/Login";


const App: React.FC = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
    </AuthProvider>
  );
};

export default App;
