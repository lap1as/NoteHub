import React, { useEffect, useState, useCallback } from 'react';
import { useNotes } from '../context/NoteContext';
import NoteItem from '../components/NoteItem';
import { debounce } from '../utils/debounce';
import { Note, NoteCreate } from '../types';

const Dashboard: React.FC = () => {
    const { notes, fetchNotes, createNote } = useNotes();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNote, setNewNote] = useState<NoteCreate>({ title: '', content: '' });
    const [notesLoaded, setNotesLoaded] = useState(false);

    // Debounced fetch function
    const debouncedFetchNotes = useCallback(
        debounce(async () => {
            await fetchNotes();
            setNotesLoaded(true);
        }, 300),
        [fetchNotes]
    );

    // Fetch notes immediately
    const fetchNotesImmediately = useCallback(async () => {
        await fetchNotes(); // `fetchNotes` should return a Promise<void>
        setNotesLoaded(true);
    }, [fetchNotes]);

    useEffect(() => {
        // Fetch notes when component mounts if not already loaded
        if (!notesLoaded) {
            debouncedFetchNotes();
        }
        // Cleanup debounce function on unmount
        return () => {
            debouncedFetchNotes.cancel();
        };
    }, [debouncedFetchNotes, notesLoaded]);

    const handleUpdateClick = () => {
        fetchNotesImmediately(); // Fetch notes immediately on button click
    };

    const handleCreateNote = async () => {
        if (newNote.title && newNote.content) {
            await createNote(newNote); // Pass NoteCreate type
            setNewNote({ title: '', content: '' }); // Reset form
            setIsModalOpen(false); // Close modal
            setNotesLoaded(false); // Reset notesLoaded to refetch notes if needed
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="flex justify-between mb-4">
                <button
                    onClick={handleUpdateClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Update Notes
                </button>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Create Note
                </button>
            </div>

            {/* Notes List */}
            <div>
                {notes.map((note: Note) => (
                    <NoteItem key={note.id} note={note} />
                ))}
            </div>

            {/* Create Note Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-4">Create Note</h3>
                        <input
                            type="text"
                            placeholder="Title"
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        />
                        <textarea
                            placeholder="Content"
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                            rows={4}
                        />
                        <button
                            onClick={handleCreateNote}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
