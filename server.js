const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Dummy data (in-memory storage)
let users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
];

//  1. GET all users
app.get("/users", (req, res) => {
    res.json(users);
});

//  2. GET a single user by ID
app.get("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

// 3. POST - Add a new user
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

//  4. PUT - Update a user
app.put("/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.json(user);
});

//  5. DELETE - Remove a user
app.delete("/users/:id", (req, res) => {
    users = users.filter((u) => u.id !== parseInt(req.params.id));
    res.json({ message: "User deleted" });
});

// Start server
app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});