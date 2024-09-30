# MERN Blog Application

This is a full-stack blog application built using the **MERN** (MongoDB, Express.js, React, Node.js) stack.

## Installation

### Prerequisites

- **Node.js** (v20.x or higher)
- **MongoDB** (running local or use cloud service)
- **React.js** (v18.x or higher)

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:

   ```bash
   # Install client dependencies
   cd <client>
   then
   npm run dev

   open another terminal
   cd <server>
   then
   npm start
   ```

3. Create `.env` files in both the `client` and `server` directories with appropriate environment variables.

   **Client (`client/.env`)**:

   ```
   VITE_BACKEND_URL=
   ```

   **Server (`server/.env`)**:

   ```
   VITE_SERVER_URI=
   PORT=

   # MONGO
   NAME=
   PASSWORD=

   # JWT
   SALT=
   SECRET=
   ```

## API ENDPOINTS

### Authentication Endpoints (`/api/auth`)

- **POST `/login`**: Authenticates a user and returns a token.
- **POST `/register`**: Registers a new user with provided credentials.
- **GET `/user`**: Retrieves the authenticated user's details (requires authentication).
- **PATCH `/edit`**: Updates the authenticated user's profile (requires authentication).

### Blog Endpoints (`/api/blog`)

- **POST `/user`**: Retrieves blogs written by a specific user.
- **POST `/create`**: Creates a new blog post.
- **POST `/single`**: Retrieves a specific blog post by ID.
- **GET `/count`**: Returns the count of blogs in different categories (e.g., Travel, Politics).
- **POST `/blogs`**: Retrieves a list of blogs with an optional limit.
- **GET `/travel`**: Retrieves blogs in the Travel category.
- **PUT `/edit`**: Updates an existing blog post.
- **GET `/feature`**: Retrieves a random featured blog post.
- **GET `/politics`**: Retrieves blogs in the Politics category.
- **DELETE `/delete`**: Deletes a blog post by ID.

### Comment Endpoints (`/api/comment`)

- **GET `/:blogId`**: Retrieves comments associated with a specific blog post.
- **POST `/:blogId`**: Adds a new comment to a specific blog post (requires authentication).
- **PUT `/:commentId`**: Updates a specific comment (requires authentication).
- **DELETE `/:commentId`**: Deletes a specific comment (requires authentication).
