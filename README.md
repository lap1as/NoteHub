# My NoteHub

My NoteHub is a full-stack note-taking application featuring a FastAPI backend and a React frontend. This guide will help you understand the project structure, setup the environment, and run the application.

## Overview

The project is divided into two main components:

1. **Backend**: Developed using FastAPI and SQLAlchemy, it handles all server-side logic and database interactions.
2. **Frontend**: Developed using React, TypeScript, and Tailwind CSS, it provides the user interface.

---

## Backend Setup

### Project Structure

- **`crud.py`**: Contains functions for database operations such as create, read, update, and delete.
- **`database.py`**: Configures the database connection and session management with SQLAlchemy.
- **`main.py`**: Sets up the FastAPI application, including routes and middleware.
- **`models.py`**: Defines the database models using SQLAlchemy’s ORM.
- **`schemas.py`**: Provides Pydantic schemas for data validation and serialization.
- **`security.py`**: Manages security functions like password hashing and JWT token handling.

### Installation and Running

1. **Clone the Repository**

    ```bash
    git clone https://github.com/yourusername/my-notehub.git
    cd my-notehub/backend
    ```

2. **Create a Virtual Environment**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install Dependencies**

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure the Database**

    Edit `backend/app/database.py` to update your PostgreSQL connection settings.

5. **Run the Server**

    ```bash
    uvicorn app.main:app --reload
    ```

    The backend server will be available at `http://127.0.0.1:8000`.

### API Endpoints

- **POST /users/**: Create a new user.
- **POST /users/login/**: Authenticate and get a JWT token.
- **GET /users/check-username/{username}**: Check username availability.
- **POST /notes/**: Create a new note.
- **GET /notes/**: List all notes.
- **GET /notes/{note_id}**: Get a specific note by ID.
- **PUT /notes/{note_id}**: Update a note by ID.
- **DELETE /notes/{note_id}**: Delete a note by ID.

### Dependencies

- **FastAPI**: Modern web framework for building APIs.
- **SQLAlchemy**: ORM for database operations.
- **Pydantic**: Data validation and settings management.
- **Passlib**: Password hashing.
- **Python-Jose**: JSON Web Tokens (JWT) handling.
- **Psycopg2**: PostgreSQL adapter for Python.

---

## Frontend Setup

### Project Structure

- **`src/components/`**: React components such as `Navbar.tsx`, `NoteEditForm.tsx`, and `PrivateRoute.tsx`.
- **`src/context/`**: Context providers for global state, including `NoteContext.tsx` and `UserContext.tsx`.
- **`src/pages/`**: Page components like `Dashboard.tsx`, `Home.tsx`, `Login.tsx`, `NoteEdit.tsx`, and `Register.tsx`.
- **`src/utils/`**: Utility functions such as `debounce.ts`.
- **`src/App.tsx`**: Main application component setting up routing.
- **`src/main.tsx`**: Entry point for the React application.
- **`src/types.ts`**: TypeScript types for various data structures.

### Installation and Running

1. **Navigate to the Frontend Directory**

    ```bash
    cd my-notehub/my-notehub-app
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Run the Development Server**

    ```bash
    npm run dev
    ```

    The frontend development server will be available at `http://localhost:3000`.

### Frontend Pages

- **Home Page (`/`)**: The landing page of the application.
- **Login Page (`/login`)**: User login page.
- **Register Page (`/register`)**: User registration page.
- **Dashboard Page (`/dashboard`)**: Displays and manages notes.
- **Note Edit Page (`/notes/:id/edit`)**: Edit an existing note.
- **Note Creation Page (`/notes/create`)**: Form for creating new notes.

### Dependencies

- **React**: JavaScript library for building user interfaces.
- **React Router**: Routing library for React applications.
- **Axios**: HTTP client for making API requests.
- **Tailwind CSS**: Utility-first CSS framework for styling.

---

## Additional Information

For more detailed information or troubleshooting, please refer to the project documentation or contact the maintainers. This `README` provides a comprehensive overview of setting up and running both the backend and frontend components of My NoteHub.

