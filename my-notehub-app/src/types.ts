export interface Note {
    id: number;
    title: string;
    content: string;
  }
  
  export interface User {
    username: string;
    access_token: string;
  }

  export interface NoteCreate {
    title: string;
    content: string;
  }