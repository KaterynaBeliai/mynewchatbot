const express = require('express');
const app = express();
const port = 3001;
const env = require('dotenv').config({ path: './mykey.env' });
const Groq = require("groq-sdk");
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

pool.query("SELECT NOW()", (error, result) => {
    if (error) {
        console.error("PostgreSQL error:", error);
    } else {
        console.log("PostgreSQL connected!");
    }
});

const client = new Groq({ 
    apiKey: process.env.GROQ_API_KEY
 });

app.use(express.json());

//для чата

app.get('/messages', async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT sender, text FROM messages ORDER BY created_at ASC"
        );

        console.log("Messages from database:", result.rows);

        res.json(result.rows);
    } catch (error) {
        console.error("GET MESSAGES ERROR:", error);
        res.status(500).json({ error: "Database error" });
    }
});


app.post('/send-message', async (req, res) => {
    try {
        const message = req.body.message;

        await pool.query(
            "INSERT INTO messages (sender, text) VALUES ($1, $2)",
            ["user", message]
        );

        const response = await client.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ]
        });

        const reply = response.choices[0].message.content;

        await pool.query(
            "INSERT INTO messages (sender, text) VALUES ($1, $2)",
            ["bot", reply]
        );

        res.sendStatus(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/react.html');
});


//для логіна
app.post('/login',(req,res) => {
    const {login, password} = req.body;
    if (login === "kateryna" && password === "password123") {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});