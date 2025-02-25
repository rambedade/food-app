# 🍽️ Interactive Recipe Application

## 🚀 Overview
This is a full-stack **Interactive Recipe Application** where users can **search for recipes, view details, and save their favorite recipes**. The app is built using:

- **Frontend**: Vite + React.js + Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB
- **Authentication**: JWT-based login/register system
- **API Integration**: Spoonacular API for fetching recipes

---

## ✨ Features
✅ **User Authentication** (Login, Register, Logout)
✅ **Search Recipes** using keywords
✅ **View Recipe Details** (Ingredients, Instructions, Nutrition Info)
✅ **Save Favorite Recipes** (Only for logged-in users)
✅ **Retrieve Saved Recipes** (Persisted in MongoDB)
✅ **Responsive UI** (Works on Desktop & Mobile)
✅ **Protected Routes** (Only logged-in users can save/view recipes)

---

## 🏗️ Folder Structure
```
📂 food-app
├── 📁 backend
│   ├── 📁 config
│   │   ├── db.js
│   ├── 📁 middleware
│   │   ├── auth.js
│   ├── 📁 models
│   │   ├── Recipe.js
│   │   ├── User.js
│   ├── 📁 routes
│   │   ├── authRoutes.js
│   │   ├── recipeRoutes.js
│   ├── server.js
├── 📁 frontend
│   ├── 📁 src
│   │   ├── 📁 components
│   │   ├── 📁 pages
│   │   ├── 📁 context
│   │   ├── 📁 assets
│   │   ├── 📄 App.jsx
│   │   ├── 📄 main.jsx
│   │   ├── 📄 config.js
│   ├── 📄 index.html
```

---

## 🛠️ Setup & Installation
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/recipe-app.git
cd recipe-app
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install  # Install dependencies
```

#### **🔹 Create a `.env` File in Backend Directory**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SPOONACULAR_API_KEY=your_api_key
```

```sh
npm run dev  # Start backend server
```

### **3️⃣ Frontend Setup**
```sh
cd ../frontend
npm install  # Install dependencies
```

#### **🔹 Create a `src/config.js` File in Frontend**
```js
export const BASE_URL = "https://food-app-1-b0sd.onrender.com";
```

```sh
npm run dev  # Start frontend server
```

---

## 🚀 API Endpoints
### **Auth Routes** (`/api/auth`)
- `POST /register` → Register new user
- `POST /login` → Login user
- `POST /logout` → Logout user

### **Recipe Routes** (`/api/recipes`)
- `GET /search?query=` → Search for recipes
- `GET /details/:id` → Get recipe details
- `POST /save` → Save a recipe (Authenticated)
- `GET /saved` → Get saved recipes (Authenticated)

---

## 📌 Deployment
### **Backend Deployment on Render**
1. Push backend code to GitHub
2. Create a new **Render Web Service**
3. Set **environment variables** in Render Dashboard
4. Deploy & get **backend URL** (e.g., `https://your-app.onrender.com`)

### **Frontend Deployment on Netlify**
1. Push frontend code to GitHub
2. Deploy **React App** on **Netlify**
3. Set **BASE_URL** to Render backend URL
4. Deploy & get **frontend URL**

---

## 🔍 Troubleshooting
- If **login issues** → Ensure **JWT_SECRET** matches in backend
- If **recipes don’t save** → Ensure **MongoDB is connected**
- If **CORS errors** → Update backend CORS settings:
  ```js
  app.use(cors({ credentials: true, origin: "https://your-frontend.netlify.app" }));
  ```

---

## 📜 License
This project is open-source and free to use.

---

## 🙌 Contributing
If you find issues or want to improve the project, feel free to submit a pull request!

---

### 🎉 Happy Coding! 🚀

