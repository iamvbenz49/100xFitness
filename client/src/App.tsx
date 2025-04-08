import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoute";
import IsLoggedInRoute from "./routes/IsLoggedInRoute";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import WorkoutGoalsForm from "./Pages/WorkoutGoalsForm";
import Navbar from "./Components/Navbar"; 
import WorkoutForm from "./Pages/WorkoutForm";
import WorkoutHistory from "./Pages/History";
import WeightHistory from "./Pages/WeightHistory";
import MacronutrientTracker from "./Pages/MacronutrientTracker";
import Profile from "./Pages/Profile";
import SocialFeed from "./Pages/SocialFeed";
import WorkoutManagerSample from "./Components/Workouts/WorkoutManagerSample";
import { MacrosProvider } from "./context/macros/MacroProvider";
import { AuthProvider } from "./context/auth/AuthProvider";

const App: React.FC = () => {
  const location = useLocation(); 

  const hideNavbar = location.pathname !== "/login" && location.pathname !== "/signup";

  return (
    <AuthProvider>
      {hideNavbar && <Navbar />}
      <Routes>

        <Route path="/login" element={
          <IsLoggedInRoute>
            <Login />
          </IsLoggedInRoute>
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
              <WorkoutHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weight-track"
          element={
            <ProtectedRoute>
              <WeightHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/macros"
          element={
            <ProtectedRoute>
              <MacrosProvider>
                <MacronutrientTracker />
              </MacrosProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/routine"
          element={
            <ProtectedRoute>
              <WorkoutForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <SocialFeed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sample"
          element={
            <ProtectedRoute>
              <WorkoutManagerSample />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
