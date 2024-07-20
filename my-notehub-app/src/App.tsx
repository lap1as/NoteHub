import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { NoteProvider } from './context/NoteContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NoteForm from './components/NoteForm'; // Make sure this is imported

const App: React.FC = () => {
  return (
    <UserProvider>
      <NoteProvider>
        <Navbar />
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/notes/new"
              element={
                <PrivateRoute>
                  <NoteForm /> {/* Component to handle creating new notes */}
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </NoteProvider>
    </UserProvider>
  );
};

export default App;
