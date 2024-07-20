import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotes } from '../context/NoteContext';
import NoteItem from '../components/NoteItem';

const Dashboard: React.FC = () => {
  const { notes, fetchNotes } = useNotes();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Link to="/notes/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Create New Note
      </Link>
      <ul>
        {notes.map(note => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
