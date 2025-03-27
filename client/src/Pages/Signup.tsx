import { useContext, useState, FormEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import AuthLeftSection from "../Components/AuthLeftSection";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import GuestButton from "../Components/GuestButtion";

const Signup: React.FC = () => {
  const auth = useContext(AuthContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth && auth.signup) {
      setLoading(true);
      try {
        await auth.signup(name, email, password);
      } catch (error: unknown) {
        alert(`Signup failed. Please try again. ${error}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <AuthLeftSection />

      <motion.div
        className="bg-gray-900 p-12 rounded-3xl shadow-xl w-full max-w-lg text-center border border-gray-700 lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-extrabold text-white mb-6">Create an Account</h2>
        <p className="text-gray-400 text-lg mb-6">Join 100x Fitness and start your journey!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-4 bg-gray-800 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 bg-gray-800 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 bg-gray-800 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            type="submit"
            className={`w-full py-4 rounded-xl shadow-md font-semibold text-lg transition-all ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:opacity-90"
            }`}
            whileHover={!loading ? { scale: 1.05 } : {}}
            whileTap={!loading ? { scale: 0.95 } : {}}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>

        <GuestButton />

        <p className="mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Signup;
