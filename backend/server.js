const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")
const app = express()
const bcrypt =  require("bcrypt")
app.use(express.json())
const uri ='mongodb+srv://Andorra:155J6WYTHDkMgml7@cluster0.tj9ob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(uri)

const userRoute = require("./Routes/userRoutes")

app.use("/signUp", userRoute)
 
 
 
let db;
const connectToDb = async () => {
    try {
        await client.connect();
        db = client.db("sample_mflix") 
        console.log('Connection acquired')
    } catch (error) {
        console.log(error, `Couldn't connect to db`)
    }
};
 
connectToDb()
 

 
 
app.put('/users', async (req, res) => {
    try {
        const { name, email, id } = req.body;
        await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name,
                    email,
                }
            }
        )
        res.send("done")
    } catch (error) {
        console.log(error)
        res.send("Couldn't update")
    }
});
 
app.delete('/users', async (req, res) => {
    try {
        const { id } = req.body;
        await db.collection("users").deleteOne({ _id: new ObjectId(id) });
        res.send("Deleted");
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});
 
 
//SIGN UP LOGIN //
 
 
const loadEncoder = async (req, res, next) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        next(); 
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

const verificationProgress = async (req, res, next) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await bcrypt.compare(password, hashedPassword);
        req.body.password = result; 
        next(); 
    } catch (error) {
        res.status(500).send(`Error: ${error}`);
    }
};

 
 
app.post("/logIn", verificationProgress, async (req, res) => {
    try {
        res.send("Succesfully entered")
    } catch (error) {
        res.send(error)
    }
})
 
 
app.listen(8080, console.log("Runs at 5000"))
 
 