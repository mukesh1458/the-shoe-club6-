# The Shoe Club 👟

The Shoe Club is a premium MERN stack (MongoDB, Express, React, Node.js) web application designed for a modern shoe retail experience. It features a stunning, responsive frontend and a robust backend with an admin dashboard for product and content management.

## 🚀 Features

- **Premium UI/UX**: Built with Framer Motion for smooth animations and a futuristic design.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **Admin Dashboard**: Secure admin area to manage products, student discounts, and site content.
- **Student Discount System**: Integrated badge and discount system for student shoppers.
- **Contact & About Pages**: Professional pages for brand storytelling and customer support.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Fast and efficient frontend framework.
- **Tailwind CSS**: Modern utility-first CSS framework for styling.
- **Framer Motion**: Advanced animation library for premium transitions.
- **Lucide React**: Beautifully crafted icons.
- **Axios**: Promised-based HTTP client for API requests.

### Backend
- **Node.js & Express**: Scalable server-side environment.
- **MongoDB & Mongoose**: NoSQL database for flexible data management.
- **JWT & Bcrypt**: Secure authentication and password hashing.
- **Multer**: Middleware for handling image uploads.

## 📦 Project Structure

```text
yaya/
├── client/           # Frontend React application (Vite)
│   ├── src/          # Source code
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page-level components
│   │   └── ...
│   └── ...
├── server/           # Backend Node.js application
│   ├── models/       # Mongoose database models
│   ├── routes/       # API endpoints
│   ├── uploads/      # Stored product images
│   └── index.js      # Server entry point
└── README.md         # Project documentation (this file)
```

## ⚙️ Setup and Installation

### Prerequisites
- Node.js installed
- MongoDB instance (local or Cloud)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yaya
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd ../server
   npm install
   # Create a .env file with your MONGO_URI, JWT_SECRET, etc.
   npm start
   ```

## 🤝 Contributing

Feel free to open issues or submit pull requests to improve the project.

## 📄 License

This project is licensed under the ISC License.
