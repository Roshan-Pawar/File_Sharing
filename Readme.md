# 📁 File Sharing App

A secure file sharing web application.  
Users can upload files, view them, and share access via secure links that work only after login.

---

## 🔗 Live Project Links

- **Frontend (Vercel):** [https://your-frontend-url.vercel.app ](https://file-sharing-jade.vercel.app/)  

---

## ✨ Features

- User authentication (Register / Login)
- JWT-based protected routes
- Upload files (PDF, images, CSV, etc.)
- View & Share files via secure links
- “Shared With Me” section
- Responsive UI (Tailwind CSS)

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT 
- Multer

### Database
- MySQL

### Deployment
- Frontend: Vercel
- Backend: Railway
- Database: Railway

---

## 🧑‍💻 Local Setup & Installation

### 1️⃣ Clone the Repository
- https://github.com/Roshan-Pawar/File_Sharing.git
- cd file-sharing-app

### 2️⃣ Frontend Setup
- cd file-sharing-frontend
- npm install
- npm run dev

### 3️⃣ Backend Setup
- cd file-sharing-backend
- npm install
- npm run dev

### 4️⃣ MySQL Database Setup
- CREATE DATABASE file_sharing_app;

- USE file_sharing_app;

- CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
- CREATE TABLE files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      original_name VARCHAR(255),
      file_name VARCHAR(255),
      mime_type VARCHAR(100),
      size INT,
      path VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

- CREATE TABLE file_shares (
      id INT AUTO_INCREMENT PRIMARY KEY,
      file_id INT,
      shared_with INT,
      FOREIGN KEY (file_id) REFERENCES files(id),
      FOREIGN KEY (shared_with) REFERENCES users(id)
    );


## ⭐ If you like this project, give it a star!
   


