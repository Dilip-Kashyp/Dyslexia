const express = require('express')
const dotenv = require('dotenv').config();
const userRoute = require('./route/userRoute.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use('/api/v1/user', userRoute); // This is for user route 
app.get("/", (req, res) => res.send("Welcome to APIs"));



app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})


