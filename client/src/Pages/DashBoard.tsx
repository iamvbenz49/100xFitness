import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const auth = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {auth?.user?.email}</p>
      <button onClick={auth?.logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
