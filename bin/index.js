#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs/promises';
import { execSync } from 'child_process';
import path from 'path';

async function askProjectType() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message: 'Kya banana hai?',
      choices: ['Frontend', 'Backend', 'Fullstack'],
    },
  ]);
  return answers.projectType;
}

async function createBackendStructure() {
  // Create the basic folder structure for Backend
  await fs.mkdir('backend');
  await fs.mkdir('backend/controllers');
  await fs.mkdir('backend/models');
  await fs.mkdir('backend/routes');

  console.log('Backend folder structure created!');

  // server.js file
  await fs.writeFile(
    'backend/server.js',
    `import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import exampleRoute from './routes/exampleRoute.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', exampleRoute);

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
`
  );

  // exampleModel.js
  await fs.writeFile(
    'backend/models/exampleModel.js',
    `import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const ExampleModel = mongoose.model('Example', exampleSchema);

export default ExampleModel;
`
  );

  // exampleController.js
  await fs.writeFile(
    'backend/controllers/exampleController.js',
    `import ExampleModel from '../models/exampleModel.js';

export const getExample = async (req, res) => {
  const examples = await ExampleModel.find();
  res.json(examples);
};

export const createExample = async (req, res) => {
  const newExample = new ExampleModel(req.body);
  await newExample.save();
  res.json(newExample);
};
`
  );

  // exampleRoute.js
  await fs.writeFile(
    'backend/routes/exampleRoute.js',
    `import express from 'express';
import { getExample, createExample } from '../controllers/exampleController.js';

const router = express.Router();

router.get('/example', getExample);
router.post('/example', createExample);

export default router;
`
  );

  // Create package.json in the backend folder
  await fs.writeFile(
    'backend/package.json',
    `{
  "name": "backend",
  "version": "1.0.0",
  "description": "Backend server for project",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^6.0.0",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5"
  },
  "type": "module"
}`
  );

  console.log('Backend files created with dummy routes!');
}

async function createFrontendStructure() {
  // Create the basic folder structure for Frontend
  await fs.mkdir('frontend');
  console.log('Frontend folder created!');

  // Initialize Vite React App
  execSync('npm create vite@latest frontend --template react', { stdio: 'inherit' });
  

  // Change directory to frontend (fixing the double 'frontend' folder issue)
  process.chdir('frontend');

  // Install Axios for making HTTP requests
  execSync('npm install axios', { stdio: 'inherit' });

  // Override App.jsx and App.css using fs.writeFile

  await fs.writeFile(
    'src/App.jsx', // Correct path for the App.jsx file
    `import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

function App() {
  const [data, setData] = useState([]);
  const [newRecord, setNewRecord] = useState({ name: '', age: '' });

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/example')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/api/example', newRecord)
      .then((response) => {
        setData([...data, response.data]);
        setNewRecord({ name: '', age: '' });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Example Data from MongoDB</h1>
        <p>Welcome to the Example App! This app shows data from a MongoDB database and allows you to add new records.</p>
        <p>Here, you can view, add, and manage your data easily.</p>
        <h2>Instructions:</h2>
        <ul>
          <li>View existing records below.</li>
          <li>Fill out the form to add a new record.</li>
          <li>Each new record will be saved in the MongoDB database and displayed here.</li>
        </ul>
      </header>

      <div className="content">
        <h3>Data from Database</h3>
        <ul className="data-list">
          {data.map((item) => (
            <li key={item._id} className="data-item">
              <div><strong>Name:</strong> {item.name}</div>
              <div><strong>Age:</strong> {item.age}</div>
            </li>
          ))}
        </ul>

        <h3>Add New Record</h3>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            placeholder="Enter Name"
            value={newRecord.name}
            onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter Age"
            value={newRecord.age}
            onChange={(e) => setNewRecord({ ...newRecord, age: e.target.value })}
            className="input-field"
          />
          <button type="submit" className="submit-btn">Add Record</button>
        </form>
      </div>
    </div>
  );
}

export default App;
`
  );

  await fs.writeFile(
    'src/App.css', // Correct path for the App.css file
    `/* Global Styles */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

.App {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.App-header {
  text-align: center;
  margin-bottom: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 10px 0;
  width: 100%;
}

h1 {
  font-size: 2.5em;
  margin: 10px 0;
}

h2, h3 {
  color: #333;
}

p {
  color: #777;
  font-size: 1.1em;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin: 5px 0;
}

.content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.data-list {
  margin-top: 20px;
  padding-left: 0;
}

.data-item {
  background-color: #f9f9f9;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

.data-item div {
  margin-bottom: 5px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  box-sizing: border-box;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
}

.submit-btn:hover {
  background-color: #45a049;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2, h3 {
  margin-top: 20px;
}
`
  );


  console.log('Frontend React app created with UI to interact with the backend!');
}


async function createProjectStructure(projectType) {
  if (projectType === 'Frontend' || projectType === 'Fullstack') {
    await createFrontendStructure();
  }

  if (projectType === 'Backend' || projectType === 'Fullstack') {
    // Change directory back to the original root (one level up if frontend was created)
    if (projectType === 'Fullstack') {
      process.chdir('..'); // Go back to root from frontend
    }
    await createBackendStructure();
  }
  // Readme instructions
  await fs.writeFile('README.md', `
    Project Setup Instructions

Overview
This project allows you to set up a full-stack application with a React/Vite frontend and Node/Express backend. The backend is connected to a MongoDB database where you can store and retrieve records. You can create and view data using a simple UI created with React, and the data is stored in MongoDB.

Features
- Frontend: Built using React/Vite for a fast and modern user experience.
- Backend: Created with Express.js and MongoDB to handle data and provide REST API endpoints.
- MongoDB: Used to store and retrieve records (name and age).
- CORS enabled: For communication between frontend (localhost:5173) and backend (localhost:5000).

How to Set Up

1. Clone the Project
Clone the repository to your local machine:
git clone <repository-url>

2. Set Up Frontend (React/Vite)
After cloning the project, follow these steps to set up the frontend:

1. Navigate to the frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Start the development server:
npm run dev

4. Access the frontend by opening your browser and going to http://localhost:5173.

3. Set Up Backend (Express and MongoDB)
To set up the backend, follow these steps:

1. Navigate to the backend folder:
cd backend

2. Install dependencies:
npm install

3. Start the backend server:
npm start

4. The backend server will be running at http://127.0.0.1:5000.

4. MongoDB Setup
Make sure MongoDB is installed and running on your local machine. The backend will try to connect to mongodb://127.0.0.1:27017/mydb.

If you don't have MongoDB installed, follow the instructions from the official website:
- Install MongoDB (https://www.mongodb.com/docs/manual/installation/)

5. Usage
- The frontend application will show a list of records fetched from MongoDB.
- You can add new records (name and age) using the form in the UI, and they will be saved to the database.
- After adding a record, the UI will update automatically with the new data.

6. Available Options
When creating the project, you can choose from the following options:
- Frontend: Only the frontend folder will be created, and you can set up a React application.
- Backend: Only the backend folder will be created, with Express and MongoDB setup.
- Fullstack: Both frontend and backend will be created, allowing you to have a complete full-stack application.

7. Why This Project Was Created
This project is designed to make it easier for developers to quickly set up a full-stack application with a modern React frontend and a robust Node/Express backend. The goal is to provide a simple structure where you can:
- View and interact with data stored in MongoDB.
- Learn how to connect a React frontend with a Node/Express backend.
- Understand basic CRUD (Create, Read, Update, Delete) operations with a MongoDB database.

8. Notes
- Ensure you have Node.js and npm installed on your system.
- MongoDB should be running locally on your machine.
- If you face any CORS-related issues, make sure CORS is handled in your backend.

Contributing
Feel free to contribute to this project by forking the repository and submitting pull requests. Any suggestions or improvements are welcome!

License
This project is open-source and available under the MIT License (LICENSE).

    
    `);
  console.log('README.md created!');
}

async function main() {
  const projectType = await askProjectType();
  await createProjectStructure(projectType);
  console.log('Project setup complete!');
}

main();
