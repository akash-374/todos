/* server.js */
const express = require("express");
const app = express();

app.use(express.static("public")); // Serve HTML
app.use(express.json()); // Allow JSON inputs

// --- 1. IN-MEMORY DATA LISTS (The Syllabus Concept) ---
let users = [
  { email: "admin", password: "123" }, // Default User
];

let tasks = [
  { id: "1", title: "Learn Node.js", desc: "Study Express", status: "todo" },
  { id: "2", title: "Design UI", desc: "Make it blue", status: "doing" },
];

// --- 2. LOGIN & SIGNUP ROUTES ---
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Search the List
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) res.json({ success: true });
  else res.json({ success: false });
});

app.post("/signup", (req, res) => {
  // Add to List
  users.push(req.body);
  res.json({ success: true });
});

// --- 3. TASK ROUTES ---

// Read (Get all tasks)
app.get("/tasks", (req, res) => {
  res.json(tasks); // Send the Array to frontend
});

// Create or Update
app.post("/save-task", (req, res) => {
  const newTask = req.body;

  // Check if ID exists in list
  const index = tasks.findIndex((t) => t.id == newTask.id);

  if (index !== -1) {
    // UPDATE: Replace item at index
    tasks[index] = newTask;
  } else {
    // CREATE: Push to list
    newTask.id = Date.now().toString();
    tasks.push(newTask);
  }
  res.json({ success: true });
});

// Delete
app.post("/delete-task", (req, res) => {
  // Filter the list to remove item
  tasks = tasks.filter((t) => t.id != req.body.id);
  res.json({ success: true });
});

// Start
app.listen(3000, () =>
  console.log("Server running at http://localhost:3000/login.html")
);