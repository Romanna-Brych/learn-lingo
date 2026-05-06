# LearnLingo

![LearnLingo Preview](./public/preview.png)

## 🚀 Live Demo

👉 https://learn-lingo-three-teal.vercel.app

---

## 📌 About the Project

**LearnLingo** is a modern web application for finding and booking language tutors.  
Users can browse teachers, filter them by different criteria, add favorites, and book trial lessons.

---

## ✨ Features

- 🔐 Authentication (Register / Login with Firebase)
- ❤️ Add / remove teachers from favorites
- 🔎 Filtering by:
  - Language
  - Level
  - Price
- 📄 Pagination (Load more)
- 📅 Book trial lesson (form with validation)
- 🔔 Toast notifications
- 🛡 Protected routes
- 🎨 Custom UI components (dropdowns, modals)

---

## 🛠 Tech Stack

- **React**
- **TypeScript**
- **React Router**
- **TanStack Query**
- **Firebase (Auth + Realtime DB)**
- **React Hook Form**
- **Yup**
- **CSS Modules**
- **React Hot Toast**

---

## 🧠 Architecture Highlights

- Separation of concerns:
  - `services/` → API & Firebase logic
  - `hooks/` → business logic (favorites, etc.)
  - `components/` → reusable UI
  - `pages/` → route-level components
- URL-based filters using `searchParams`
- Optimized data fetching with TanStack Query
- Reusable custom components (FilterSelect, Modal)

---

## 📷 Pages

- **Home** – hero section with CTA and stats
- **Teachers** – list with filters and pagination
- **Favorites** – saved teachers (protected route)

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/learnlingo.git
cd learnlingo
npm install
npm run dev

🔑 Environment Variables

Create a .env file:
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_DATABASE_URL=your_db_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Author
Romanna Brych
