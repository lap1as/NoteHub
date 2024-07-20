import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NoteContext';
import { Note } from '../types';

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { deleteNote } = useNotes();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(note.id);
    }
  };

  return (
    <li className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-semibold">{note.title}</h3>
      <p>{note.content}</p>
      <div className="mt-2">
        <button
          onClick={() => navigate(`/notes/edit/${note.id}`)}
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
};



export default NoteItem;
