import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from '../context/NoteContext';
import { Note } from '../types';

const NoteEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notes, updateNote, fetchNotes } = useNotes();
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const loadNote = async () => {
      // Fetch notes only if data is not already fetched
      if (!dataFetched) {
        await fetchNotes();
        setDataFetched(true);
      }

      const noteToEdit = notes.find((note) => note.id === parseInt(id || '', 10));
      if (noteToEdit) {
        setNote(noteToEdit);
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
      } else {
        console.error('Note not found');
      }
    };

    loadNote();
  }, [id, notes, fetchNotes, dataFetched]);

  const handleSave = async () => {
    if (note) {
      try {
        await updateNote({ ...note, title, content });
        navigate('/dashboard');
      } catch (error) {
        console.error('Failed to update note', error);
      }
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NoteEdit;
