const express = require('express');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3000;

let users = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).send('User not found');
    }

    if (bcrypt.compareSync(password, user.password)) {
        return res.status(200).send('Login successful!');
    } else {
        return res.status(401).send('Invalid username or password');
    }
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;


    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    return res.status(201).send('User registered successfully');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
