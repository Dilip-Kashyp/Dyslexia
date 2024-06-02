const registerUser = (req, res) => {
    const {name, email, password} = req.body;
    console.log(name, email, password)
    res.send("hello")
}

const loginUser = (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    res.send("hey, i am login")
}

module.exports = {
    registerUser,
    loginUser,
}