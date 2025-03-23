const express = require("express");
const { v4: uuidv4 } = require("uuid"); // For unique IDs
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON

// Dummy data (in-memory storage)
let users = [
    { id: uuidv4(), name: "Alice", email: "alice@example.com" },
    { id: uuidv4(), name: "Bob", email: "bob@example.com" },
];

// Express Router for user routes
const userRouter = express.Router();

// GET all users
userRouter.get("/", (req, res) => {
    res.json(users);
});

// GET a single user by ID
userRouter.get("/:id", (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

// POST - Add a new user
userRouter.post("/", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const newUser = { id: uuidv4(), name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT - Update a user
userRouter.put("/:id", (req, res) => {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { name, email } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;

    res.json(user);
});

// DELETE - Remove a user
userRouter.delete("/:id", (req, res) => {
    const userIndex = users.findIndex((u) => u.id === req.params.id);
    if (userIndex === -1) return res.status(404).json({ error: "User not found" });

    users.splice(userIndex, 1);
    res.json({ message: "User deleted" });
});

// Use the user router
app.use("/users", userRouter);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
