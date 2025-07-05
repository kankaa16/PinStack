# 📌 PinStack

**PinStack** is a full-stack image-sharing web application where users can upload, explore, and organize visual content. 
It offers a clean, responsive interface and user-friendly features for content discovery and sharing.

## 🚀 Features

- 🖼️ Upload and display image-based posts ("pins")
- 🔐 User authentication (sign up, log in)
- 💬 Like and comment on pins
- 🧑‍💼 Profile pages with user-specific uploads
- 🔍 Search functionality for easy pin discovery
- 📱 Fully responsive UI for all devices

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **Others:** Axios, React Router, Context API, Zustand.

## 🧑‍💻 Getting Started

1. Clone the repository:
(bash)=> git clone https://github.com/kankaa16/PinStack.git


2. Install dependencies:
cd PinStack
npm install

3. Start the app:
npm run dev

4. Ensure you create a .env file with the following:
> - `MONGO_URI=your_mongodb_connection_string`
> - `JWT_SECRET=your_jwt_secret_key`
