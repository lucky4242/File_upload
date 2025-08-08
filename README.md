# Drag and Drop Image Upload with Laravel & React

A simple and modern **Drag and Drop Image Upload** system built with **Laravel** as the backend API and **React** for the frontend UI.  
It allows users to upload images via a drag-and-drop interface, preview them instantly, and store them on the server.

---

## ✨ Features

- 🚀 **Drag-and-drop** support for image uploads  
- 🖼️ Live **image preview** before upload  
- 📂 Backend image storage using Laravel  
- 🔄 Progress indicators for uploads  
- ❌ Option to remove/reset before final submission  
- ✅ CSRF protection and Laravel API authentication-ready  

---

## 🛠️ Tech Stack

**Backend:**
- Laravel 11
- Laravel File Storage
- Laravel API Routes

**Frontend:**
- React 18
- Axios for HTTP requests
- CSS / Tailwind (if used)

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
composer install
php artisan migrate
php artisan storage:link
php artisan serve

### Frontend (React)
cd frontend
npm install
npm start
