import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/protectedRoute";
import IsLoggedInRoute from "./routes/IsLoggedInRoute";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import WorkoutGoalsForm from "./Pages/WorkoutGoalsForm";
import Navbar from "./Components/Navbar"; // Import Navbar
import WorkoutCreator from "./Pages/WorkoutCreator";

const App: React.FC = () => {
  const location = useLocation(); // Get current path

  const hideNavbar = location.pathname !== "/login" && location.pathname !== "/signup";

  return (
    <AuthProvider>
      {hideNavbar && <Navbar />}
      <Routes>

        <Route path="/login" element={
          // <IsLoggedInRoute>
            <Login />
          // </IsLoggedInRoute>
        } />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/target"
          element={
            <ProtectedRoute>
              <WorkoutGoalsForm />
            </ProtectedRoute>
          }
        />

       
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <div>History Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/weight-track"
          element={
            <ProtectedRoute>
              <div>Weight & Track Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/macros"
          element={
            <ProtectedRoute>
              <div>Macros Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <div>Profile Page</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/routine"
          element={
            <ProtectedRoute>
              <WorkoutCreator />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
