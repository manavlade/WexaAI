# WexaAI

WexaAI is a full-stack web application built with a modern React frontend and a robust Node.js/Express backend. This project utilizes the latest web technologies to provide a seamless and responsive user experience.

## 📂 Project Structure

```
WexaAI/
├── Backend/                # Node.js/Express Backend
│   ├── Controller/         # Request handlers
│   ├── models/             # Mongoose database models
│   ├── routes/             # API route definitions
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   └── index.js            # Entry point
│
├── Frontend/               # React Frontend (Vite)
│   ├── src/                # Source code
│   └── package.json        # Frontend dependencies
│
└── README.md               # Project documentation
```

## 🛠 Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: JavaScript (ES Modules)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `tailwindcss-animate` and `tailwind-merge`
- **UI Components**: [Radix UI](https://www.radix-ui.com/) (primitives for accessible components)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State/Forms**: `react-hook-form` with `zod` validation
- **HTTP Client**: Axios
- **Utilities**: `date-fns`, `clsx`, `sonner` (toasts)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: MongoDB with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **Middleware**: `cors`, `cookie-parser`
- **Development**: `nodemon` for hot-reloading

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites
- **Node.js**: Ensure you have Node.js installed (v18+ recommended).
- **MongoDB**: You need a running MongoDB instance (local or Atlas).

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd Backend
npm install
```

**Environment Configuration:**
Create a `.env` file in the `Backend` directory with the following variables (adjust as needed):

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

**Start the Server:**

```bash
# Development mode (with nodemon)
npm run test  # Note: 'test' script currently echoes error, strictly speaking run:
npx nodemon index.js
```
*(Note: The current `package.json` for backend defaults `main` to `index.js` but doesn't have a standard `start` or `dev` script defined, so `npx nodemon index.js` is the reliable way to start it in dev).*

### 2. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd Frontend
npm install
```

**Start the Development Server:**

```bash
npm run dev
```

The application should now be running at `http://localhost:5173` (or the port shown in your terminal).

## 📄 Scripts

**Frontend:**
- `npm run dev`: Start dev server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

**Backend:**
- Currently requires manual execution via `node index.js` or `npx nodemon index.js`.