const berypt = require('bcrypt')

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400).json({
            error : "All field required!"
        });
    }


    const alreadyuser = false;
    // check for the email already Registered or not 
     if (alreadyuser){
        res.status(400).json({
            error : "User already registered with this e-mail"
        })
     }

     const hasedpassword = await berypt.hash(password, 10) //
     console.log(hasedpassword);

    //  create a new user in DB
    const newUser =  {name, email, hasedpassword}

    if(newUser){
        res.status(201).json({
            // _id : newUser.id,
            email : newUser.email
        })
    }else{
        res.status(400).json({
            error : "user data is not vaild"
        })
    }

    console.log(name, email, password)
    res.send("User created")
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