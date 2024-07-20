import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          NoteHub
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <button className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
