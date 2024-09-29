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
