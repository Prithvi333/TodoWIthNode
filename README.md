# Todo Application

This project is a Todo application built with Node.js, Express, MongoDB for the backend, and React for the frontend.

## Backend Features

### User Authentication

- **Register**: Allows users to register with a unique username, email, and password. Passwords are hashed using bcrypt before storing in the database.
- **Login**: Authenticates users with email and password, issuing JWT tokens for authentication and refresh purposes.
- **Logout**: Logs out users by blacklisting tokens using a separate model in MongoDB.
- **Token Refresh**: Provides a route to refresh the JWT token using a refresh token mechanism.

### Todo Management

- **Create Todo**: Creates a new todo item with specified fields such as title, priority, completion status, and timestamp.
- **List Todos**: Retrieves all todos associated with the authenticated user.
- **Filter Todos**: Retrieves todos based on title search query.
- **Update Todo**: Updates a specific todo item identified by its ID, ensuring only the owner can modify it.
- **Delete Todo**: Deletes a specific todo item identified by its ID, with permission validation.

## Frontend Features

The frontend of the application is built with React, leveraging components to interact with the backend API endpoints.

- **User Authentication**: Provides forms for user registration and login.
- **Todo Management Interface**: Displays todos fetched from the backend, with options to create, update, delete, and filter todos.
- **Responsive Design**: Ensures the application is usable on both desktop and mobile devices.

## Installation

1. **Clone Repository**: `git clone https://github.com/your/repository.git`
2. **Install Dependencies**:
   - Backend: `cd backend && npm install`
   - Frontend: `cd frontend && npm install`
3. **Set Environment Variables**: Create a `.env` file in the backend directory with the following variables:
4. **Run the Application**:
- Backend: `npm start` inside the `backend` directory.
- Frontend: `npm start` inside the `frontend` directory.

## API Documentation

### User Routes

- `POST /api/users/register`: Registers a new user.
- `POST /api/users/login`: Logs in a user and returns JWT tokens.
- `GET /api/users/logout`: Logs out the user.
- `GET /api/users/rtoken`: Refreshes the JWT token.

### Todo Routes

- `POST /api/todos/create`: Creates a new todo item.
- `GET /api/todos`: Retrieves all todos for the authenticated user.
- `GET /api/todos/titletodos?taskTitle=title`: Retrieves todos filtered by title.
- `PATCH /api/todos/update/:taskId`: Updates a specific todo item.
- `DELETE /api/todos/todo/:taskId`: Deletes a specific todo item.
- `PATCH /api/todos/cstatus/:taskId`: Marks a todo item as complete.
- `PATCH /api/todos/fstatus/:taskId`: Marks a todo item as incomplete.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, bcrypt, JSON Web Tokens (JWT).
- **Frontend**: React, Axios, React Router, Bootstrap (or any other UI library).

## Contributors

- Prithvi Chauhan

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
