import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Heart, MessageCircle } from "lucide-react";
import Homelander from "../assets/homelander.jpg";

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  text: string;
}

interface Post {
  id: string;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
}

const samplePosts: Post[] = [
  {
    id: "1",
    user: { id: "101", name: "John Doe", avatar: Homelander },
    content: "Just completed an amazing workout! 💪",
    image: Homelander,
    likes: 23,
    comments: [{ id: "c1", text: "Awesome! Keep it up!" }],
  },
  {
    id: "2",
    user: { id: "102", name: "Jane Smith", avatar: Homelander },
    content: "Enjoying the sunny day ☀️",
    image: Homelander,
    likes: 12,
    comments: [{ id: "c2", text: "Nice view!" }],
  },
];

const sampleUsers: User[] = [
  { id: "201", name: "Alice Johnson", avatar: Homelander },
  { id: "202", name: "Michael Brown", avatar: Homelander },
];

const SuggestedUsers: React.FC<{ users: User[] }> = ({ users }) => (
  <aside className="w-full max-w-md p-4 bg-gray-900 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4 text-center">Suggested Users</h2>
    <ul className="space-y-3">
      {users.map((user) => (
        <li key={user.id} className="flex items-center p-3 bg-gray-800 rounded-lg gap-3">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
          <span className="text-sm font-semibold flex-1">{user.name}</span>
          <button className="bg-blue-500 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-blue-600 transition">
            <UserPlus size={16} />
          </button>
        </li>
      ))}
    </ul>
  </aside>
);

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <motion.div
    className="p-5 bg-gray-900 rounded-lg shadow-md border border-gray-700 text-left"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center gap-3 mb-3">
      <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full" />
      <span className="font-semibold">{post.user.name}</span>
    </div>
    <p className="text-gray-300 mb-3">{post.content}</p>
    {post.image && <img src={post.image} alt="Post" className="w-full rounded-lg mb-3 object-cover" />}
    <div className="flex items-center justify-center gap-10 text-gray-400">
      <button className="flex items-center gap-2 hover:text-red-500 transition">
        <Heart size={20} /> <span>{post.likes}</span>
      </button>
      <button className="flex items-center gap-2 hover:text-blue-400 transition">
        <MessageCircle size={20} /> <span>{post.comments.length}</span>
      </button>
    </div>
  </motion.div>
);

const SocialFeed: React.FC = () => {
  const [posts] = useState<Post[]>(samplePosts);
  const [suggestedUsers] = useState<User[]>(sampleUsers);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-6">
      <SuggestedUsers users={suggestedUsers} />
      <main className="w-full max-w-2xl space-y-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Social Feed</h1>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default SocialFeed;
