# create-kd-project

## What It Does

`create-kd-project` is a simple and powerful command-line tool designed to help developers quickly set up a full-stack application. The tool allows you to generate a project structure that includes a React frontend, a Node.js/Express backend, and a MongoDB database. Whether you need just the frontend, just the backend, or a complete full-stack application, `create-kd-project` makes it easy to get started.

The tool creates a project scaffold with modern web technologies, allowing you to focus on building your application instead of spending time on initial setup.

---

## Features

* **Frontend**: Built using React and JavaScript with Vite for fast development.
* **Backend**: Created using Node.js and Express.js, with MongoDB to handle your data.
* **Easy Setup**: Automatically generates frontend, backend, or both based on your choices.
* **CORS Handling**: CORS is enabled to allow communication between the frontend and backend running on different ports.
* **MongoDB Support**: Easily connect your backend to a MongoDB database for storing and retrieving data.
* **Optional UI Features**: During setup, you will be asked if you want to include a menu bar and sign-in/sign-up pages. If you select yes, both the frontend and backend will be edited accordingly to support authentication and basic navigation.
* **Sample Directories and Files**: Sample directories and dummy code are included to help you get started quickly. There are basic GET and POST API routes to interact with the backend, and a simple UI to interact with the data.

---

## How to Work With It

### 1. Install Globally

To install `create-kd-project` globally on your machine, run the following command:

```bash
npm install -g @khileshthakur25/create-kd-project
```

This makes the `create-kd-project` command available globally, so you can use it from anywhere on your system.

### 2. Install Locally (Optional)

If you prefer to install the tool locally within a specific project, run:

```bash
npm install @khileshthakur25/create-kd-project
```

### 3. Create an Empty Project Directory

```bash
mkdir my-project
cd my-project
```

### 4. Run the Command

```bash
create-kd-project
```

This will trigger the tool to guide you through the setup process.

---

## 5. Choose the Project Type

You will be prompted to choose one of the following options:

* `frontend` – Generate only the frontend part of the application.
* `backend` – Generate only the backend part of the application.
* `fullstack` – Generate both the frontend and backend parts for a complete full-stack application.

---

## 6. Optional Features Prompt

After selecting the project type, you'll be asked:

> Do you want to include a menu bar and sign-in/sign-up pages? (yes/no)

* If you choose **yes**, both the frontend and backend will be enhanced with basic authentication (sign-in/sign-up) pages and a navigation menu.
* If you choose **no**, the tool will generate a minimal setup without those features.

---

## 7. Frontend Setup (If selected)

Choose `React` and `JavaScript` when prompted for frontend technologies.

---

## 8. Once the Project Setup is Done

### Backend Setup

1. Start MongoDB locally:

```bash
mongod
```

2. Navigate to the backend directory:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
```

4. Start the backend server:

```bash
node server.js
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

---

## 9. Access Your Application

* Backend: [http://localhost:5000](http://localhost:5000)
* Frontend: [http://localhost:5173](http://localhost:5173)

---

## Why This Project Was Created

`create-kd-project` was created to make it easier for developers to set up full-stack applications with modern tools like React, Express, and MongoDB. It streamlines the process of scaffolding a project, eliminating the need to configure the basic project structure manually.

Ideal for:

* Developers needing a quick project setup.
* Learners integrating React, Express, and MongoDB.
* Teams looking to standardize their full-stack project template.

---

## Limitations

* **Frontend**: Only React with JavaScript is currently supported.
* **No `.env` File**: You'll need to manually create and configure your `.env` files.
* **MongoDB**: Must be installed and running locally for the backend to function.

---

## Sample Directories and Files

### Frontend (React)

* `src/`: Contains the main React application code.
* `public/`: Static assets like HTML and images.
* `App.js`: Sample component for adding/viewing records.

### Backend (Node/Express)

* `controllers/`: Handles business logic and DB interaction.
* `routes/`: API endpoints (GET/POST).
* `server.js`: Main server entry point.

---

## Example API Routes

* **GET** `/api/records`: Fetches all records.
* **POST** `/api/records`: Adds a new record.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

Feel free to fork the repository, contribute, and submit pull requests. Any feedback or suggestions are welcome!

---

Let me know if you'd like this in `.md` format or want to auto-generate the full GitHub README layout!
=======
# kd-create-new-project
>>>>>>> 4bf75e3c7e22aac5ac0d02165f824b395b2db911
