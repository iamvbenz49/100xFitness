import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6"; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-md text-gray-300 py-4 w-full fixed bottom-0 shadow-md border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 gap-3 text-sm sm:text-base">
        
        {/* Footer text */}
        <div className="flex flex-col items-center sm:items-start text-gray-400">
          <p className="text-xs sm:text-sm text-gray-500">All rights reserved © BenX Corp</p>
        </div>

        {/* Social icons */}
        <div className="flex gap-3 sm:gap-4">
          <a href="https://x.com/batmanwhocodes" target="_blank" className="hover:text-blue-400 transition duration-300">
            <FaXTwitter size={18} />
          </a>
          <a href="https://github.com/iamvbenz49" target="_blank" className="hover:text-blue-400 transition duration-300">
            <FiGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/sham-vijay/" target="_blank" className="hover:text-blue-400 transition duration-300">
            <FiLinkedin size={18} />
          </a>
          <a href="mailto:iamvbenz1@gmail.com" className="hover:text-blue-400 transition duration-300">
            <FiMail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
