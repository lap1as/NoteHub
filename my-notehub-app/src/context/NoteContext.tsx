import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { Note } from '../types';

interface NoteContextType {
  notes: Note[];
  fetchNotes: (skip?: number, limit?: number) => void;
  createNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: number) => Promise<void>;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

interface NoteProviderProps {
  children: ReactNode;
}

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async (skip = 0, limit = 10) => {
    try {
      const response = await axios.get<Note[]>(`http://localhost:8000/notes?skip=${skip}&limit=${limit}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes', error);
    }
  };

  const createNote = async (note: Note) => {
    try {
      const response = await axios.post<Note>('http://localhost:8000/notes', note);
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error('Failed to create note', error);
    }
  };

  const updateNote = async (note: Note) => {
    try {
      await axios.put(`http://localhost:8000/notes/${note.id}`, note);
      setNotes(notes.map(n => (n.id === note.id ? note : n)));
    } catch (error) {
      console.error('Failed to update note', error);
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/notes/${id}`);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Failed to delete note', error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, fetchNotes, createNote, updateNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NoteProvider');
  }
  return context;
};
