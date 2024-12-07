"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/hero";
import Language from "@/components/language";
import Modal from "@/components/modal";
import { supabase } from "@/utils/supabaseClient";

interface User {
  id: string;
  email: string;
  user_metadata: {
    username?: string;
  } | null;
}

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user as unknown as User);
      } else {
        setUser(null);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ? (session.user as unknown as User) : null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setIsLoginModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleSignup = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
        },
      });
      if (error) throw error;
      alert('Check your email for the confirmation link!');
        setIsSignupModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div>
        <Hero />
      </div>

      {/* Authentication Buttons */}
      {!user && (
        <div className="flex justify-center space-x-4 my-6">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg"
          >
            Login
          </button>
          <button
            onClick={() => setIsSignupModalOpen(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg"
          >
            Signup
          </button>
        </div>
      )}

      {/* User Info Display */}
      {user && (
        <div className="flex flex-col justify-center items-center space-y-4 my-6 md:flex-row md:space-y-0 md:space-x-4">
          <p>Welcome, {user.email.split("@")[0]}</p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
      )}

      {/* Login Modal */}
      <Modal
        isVisible={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg w-full"
        >
          Login
        </button>
      </Modal>

      {/* Signup Modal */}
      <Modal
        isVisible={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleSignup}
          className="px-6 py-3 bg-green-600 text-white rounded-lg w-full"
        >
          Signup
        </button>
      </Modal>

      {/* Language Section */}
      <div className="mt-6">
        <Language
          language="HTML"
          rounded="rounded-tr-3xl"
          bg="bg-green-200"
          code={`<!DOCTYPE html>
  <html>
  <head>
    <title>HTML Tutorial</title>
  </head>
  <body>
    <h1>This is a heading</h1>
    <p>This is a paragraph.</p>
  </body>
  </html>`}
          prolang="html"
        />
        <Language
          language="CSS"
          rounded="rounded-tl-full"
          bg="bg-amber-100"
          code={`*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}`}
          prolang="css"
        />
        <Language
          language="JavaScript"
          rounded="rounded-tl-full"
          bg="bg-rose-100"
          code={`let name = document.querySelect('h1')
name.innerHTML = "Asaiah Henson"`}
          prolang="javascript"
        />
        <Language
          language="Python"
          rounded="rounded-tl-full"
          bg="bg-purple-200"
          code={`username = input('what is your name: ')
print(username)
name = "Asaiah Henson"
print(name)`}
          prolang="python"
        />
      </div>
    </div>
  );
}
