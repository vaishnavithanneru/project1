# TaskManager"# project1" 
# Task Manager Web Application

A simple full-stack Task Manager web application.

## 🛠 Tech Stack

| Layer    | Technologies Used                         |
|----------|------------------------------------------|
| Backend  | Node.js, Express.js, TypeORM, PostgreSQL |
| Frontend | Next.js (React), Tailwind CSS / CSS      |
| Optional | Docker Compose, .env for config          |

---

## 📦 Repository Structure

```
your-repo-name/
├── backend/
└── frontend/
```

---

## 🚀 Getting Started

### 1. Backend Setup

#### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL (local or Docker)

#### Steps

1. **Install dependencies**
    ```bash
    cd backend
    npm install
    ```

2. **Configure environment variables**

    Copy `.env.example` to `.env` and fill in your PostgreSQL details:
    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_db_user
    DB_PASSWORD=your_db_password
    DB_DATABASE=task_manager
    ```

3. **Run database migrations (if any)**

    ```bash
    npm run typeorm migration:run
    ```

4. **Start the backend server**
    ```bash
    npm run dev
    ```
    The API will be running at `http://localhost:3001` (or your configured port).

#### API Endpoints

| Method | Endpoint      | Description         |
|--------|--------------|---------------------|
| GET    | /tasks       | List all tasks      |
| POST   | /tasks       | Create a new task   |
| PUT    | /tasks/:id   | Update a task       |
| DELETE | /tasks/:id   | Delete a task       |

---

### 2. Frontend Setup

#### Prerequisites
- Node.js (v18+ recommended)

#### Steps

1. **Install dependencies**
    ```bash
    cd frontend
    npm install
    ```

2. **Configure environment variables**

    Copy `.env.example` to `.env` and set the backend API URL:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```

3. **Start the frontend**
    ```bash
    npm run dev
    ```
    The app will be running at `http://localhost:3000`.

---

## ✨ Features

- List, add, edit, and delete tasks
- Minimal, clean UI (Tailwind CSS or plain CSS)
- Client-side data fetching with React Hooks
- Optional: filter tasks by status, basic form validation, responsive layout

---

## 🗄 Database Model

| Field      | Type                       | Required |
|------------|----------------------------|----------|
| id         | UUID (Primary Key)         | Yes      |
| title      | String                     | Yes      |
| description| Text                       | No       |
| status     | Enum: todo, in_progress, done | Yes   |
| dueDate    | Date                       | No       |
| createdAt  | Timestamp                  | Yes      |
| updatedAt  | Timestamp                  | Yes      |

---

## 📝 Screenshots

