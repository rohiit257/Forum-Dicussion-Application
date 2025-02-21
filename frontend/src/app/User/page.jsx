"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const generateRandomName = () => {
  const adjectives = ["Quick", "Happy", "Bright", "Clever", "Brave", "Calm", "Eager", "Jolly"];
  const nouns = ["Lion", "Tiger", "Eagle", "Shark", "Panda", "Wolf", "Hawk", "Otter"];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
};

const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const chatBoxRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [users]);

  const handleSend = async () => {
    if (!email) return;
    try {
      const randomName = generateRandomName();
      const response = await axios.post("http://localhost:4000/users", { name: randomName, email });
      setUsers([...users, response.data]);
      setEmail("");
    } catch (err) {
      console.error("Failed to send email", err);
    }
  };

  if (loading) return <p className="text-white text-center mt-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  
  return (
    <div className="bg-zinc-950 min-h-screen text-white flex flex-col items-center p-6 font-mono">
      <h1 className="text-3xl font-bold mb-6">World Chat</h1>
      
      <div className="w-full max-w-5xl bg-zinc-900 p-4 rounded-lg shadow-md flex flex-col flex-grow h-[600px]">
        <div 
          ref={chatBoxRef} 
          className="flex flex-col gap-2 overflow-y-auto flex-grow p-4 h-[500px]"
        >
          {users.map((user, index) => (
            <div key={user.id} className={`p-3 rounded-lg bg-${index % 2 === 0 ? 'zinc-900' : 'sky-600'}`}>
              <p className="text-sm text-gray-200">{user.name}</p>
              <p className="text-lg text-white">{user.email}</p>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 p-4 w-full border-t border-zinc-700">
          <input 
            type="email" 
            placeholder="Say Hello..." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 bg-zinc-800 rounded-lg focus:outline-none text-white border border-zinc-700"
          />
          <button 
            onClick={handleSend} 
            className="bg-sky-600 hover:bg-sky-400 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
          <button 
            onClick={() => router.push("/")} 
            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
