import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../index.css';

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to NoteHub</h1>
      <p className="text-lg mb-8">Your personal note-taking application.</p>
      {!user ? (
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
              Register
            </button>
          </Link>
        </div>
      ) : (
        <Link to="/dashboard">
          <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600">
            Go to Dashboard
          </button>
        </Link>
      )}
    </div>
  );
};

export default Home;
