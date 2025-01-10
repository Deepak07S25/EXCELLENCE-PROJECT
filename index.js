const  express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const bcrypt = require("bcrypt");


const app = express();
app.use(express.json());

app.post("/register", async (req,res) =>{
   try{

    const {firstName,lastName,emailId,password,gender} = req.body;

    const passwordHash = await bcrypt.hash(password,10);

    const user = new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash,
        gender,
    })
    await user.save();
    return res.send("User Added successfully");
    }
    catch (err){
        return res.status(400).send("Error " + err.message);
    } 

});

app.post('/login', async(req,res)=>{
    try{
        const {emailId,password} = req.body;

        const user = await User.findOne({emailId});
        if(!user){
            return res.status(404).send("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).send("Invalid email or password");
        }
        return res.send("login successful");
    } catch(err){
        return res.status(500).send("error" + err.message);
    }
});
connectDB()
    .then(()=>{
        console.log("Database connected");
        app.listen(3000,()=>{
            console.log("Server is listening on port 3000....")
        });
    })
    .catch((err) =>{
        console.error("Database not connected");
    })

