import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6"; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-md text-gray-300 py-6 w-full fixed bottom-0 shadow-md border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        

        <div className="text-sm font-medium text-gray-400 flex items-center">
          Made with <span className="text-red-500 mx-1">❤️</span> by Vijay Benz
        </div>

        <div className="flex gap-5">
          <a href="https://x.com/batmanwhocodes" target="_blank"  className="hover:text-blue-400 transition duration-300">
            <FaXTwitter size={24} />
          </a>
          <a href="https://github.com/iamvbenz49" target="_blank" className="hover:text-blue-400 transition duration-300">
            <FiGithub size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank"  className="hover:text-blue-400 transition duration-300">
            <FiLinkedin size={24} />
          </a>
          <a href="mailto:iamvbenz1@gmail.com" className="hover:text-blue-400 transition duration-300">
            <FiMail size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
