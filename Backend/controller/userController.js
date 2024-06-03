const bcrypt = require('bcrypt');
const connection = require('../config/DB_connect');
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400).json({
            error : "All fields required!"
        });
        return; // Add return statement to exit the function early
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO user (name, email, hashedPassword) VALUES (?, ?, ?)';
        connection.query(query, [name, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error inserting user data:', err.stack);
                res.status(500).json({error : 'Error saving user data'});
                return;
            }
            res.status(201).json({
              user  :  {
                name,
                email,
                hashedPassword

              }
            }); 
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({
            error : "User not registered"
        });
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(401).json({ Error : "All field required"});
    };
    
    try {
    const query = 'SELECT id, name, email, hashedPassword FROM user WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
        if (err) {
            console.log(err);
            return;
        }
 
        if(results && (await bcrypt.compare(password, results[0].hashedPassword))){
            const accessToken = jwt.sign({
                user : {
                    username : results[0].username,
                    email : results[0].email,
                    id : results[0].id
                }
            },
                process.env.ACCESS_TOKEN,
                {expiresIn: "30m"}
        );
            res.status(200).json({accessToken});
        } else {
            res.status(401);
            res.json({error : "Invalid email or password"});
        }
    });
    } catch (error) {
        console.log(error)       
}}

const currentUser = (req, res) => {
    const user = req.user;
    res.json({
        user
    })
}

module.exports = {
    registerUser,
    loginUser,
    currentUser
}
