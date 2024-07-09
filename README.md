# MERN Notes Application

## Overview

The MERN Notes Application is a full-stack note-taking web application built using MongoDB, Express.js, React, and Node.js (MERN stack). This application allows users to create, read, update, and delete notes, with user authentication and authorization handled securely using JWT (JSON Web Tokens).

## Features

- **User Authentication:** Secure user registration and login using JWT tokens.
- **CRUD Operations:** Users can perform Create, Read, Update, and Delete operations on their notes.
- **Random Quote Display:** Displays a random inspirational quote in the sidebar for daily motivation.

## Live Demo

Check out the live demo: [MERN Notes Application](https://savenotes-two.vercel.app/)

## Technologies Used

### Frontend

- **React.js:** Frontend framework for building user interfaces.
- **Redux:** State management library for predictable state containers.
- **React Router:** Declarative routing for React applications.
- **Tailwind CSS:** Utility-first CSS framework for styling.

### Backend

- **Node.js:** Server-side JavaScript runtime environment.
- **Express.js:** Fast, minimalist web framework for Node.js.
- **MongoDB:** NoSQL database used for storing application data.
- **Mongoose:** MongoDB object modeling tool for Node.js.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AmanMishra85/mern-notes-app.git
   cd mern-notes-app

**Backend:** 
    cd backend
   npm install

  Create a .env file in the backend directory with the following variables:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

**FrontEnd:**
  cd ../frontend
  npm start

Then Start you development...

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


   

