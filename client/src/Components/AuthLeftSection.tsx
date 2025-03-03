import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  { 
    text: "I can do this all day... and with 100x Fitness, so can you. Strength, endurance, discipline—every hero needs them. Suit up and get to work.", 
    author: "Steve Rogers (Captain America)" 
  },
  { 
    text: "A weak body can’t protect a city. I train because Gotham depends on me. You train because the world needs you at your best. No excuses—100x Fitness is your Batcave.", 
    author: "Bruce Wayne (Batman)" 
  },
  { 
    text: "This is your life, and it’s ending one workout at a time. Pain is temporary. Weakness is a lie. At 100x Fitness, we break limits, not promises.", 
    author: "Tyler Durden" 
  },
  { 
    text: "I wasn’t born strong—I earned it under a yellow sun. You don’t need Krypton, just commitment. Push past limits. At 100x Fitness, your strength is your legacy.", 
    author: "Clark Kent (Superman)" 
  },
  { 
    text: "Pain is weakness leaving the body. At 100x Fitness, we don’t just push past pain—we conquer it. Train like your life depends on it, because someday, it might.", 
    author: "Frank Castle (The Punisher)" 
  },
  { 
    text: "The game is always afoot, and the body must match the mind. Logic dictates that strength enhances deduction. Stay ready with 100x Fitness.", 
    author: "Sherlock Holmes" 
  },
  { 
    text: "When I was a boy, they told me power belonged to the wealthy. They were wrong. True power belongs to the strong. At 100x Fitness, we don’t ask for respect—we take it. One lift at a time.", 
    author: "Wilson Fisk (The Kingpin)" 
  }
];

const AuthLeftSection: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="text-center lg:text-left text-white lg:w-1/2 p-8"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-8xl font-extrabold text-blue-400 mb-6">100x Fitness</h1>
      <p className="text-3xl text-gray-300 italic mb-8">
        "Coz 10x ain't enough"
      </p>

      {/* Testimonial Slideshow */}
      <div className="h-48 w-2/3 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="text-gray-400 text-lg italic text-center lg:text-left"
          >
            “{testimonials[index].text}”
            <br />
            <span className="text-blue-400 font-semibold">- {testimonials[index].author}</span>
          </motion.div>
        </AnimatePresence>
      </div>


      <div className="flex justify-center lg:justify-start mt-4">
        {testimonials.map((_, i) => (
          <motion.div
            key={i}
            className={`h-3 w-3 mx-1 rounded-full ${
              i === index ? "bg-blue-400" : "bg-gray-500"
            }`}
            animate={{ scale: i === index ? 1.3 : 1, opacity: i === index ? 1 : 0.5 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AuthLeftSection;
