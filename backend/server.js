const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")
const app = express()
app.use(express.json())
const uri ='mongodb+srv://Andorra:155J6WYTHDkMgml7@cluster0.tj9ob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(uri)

 

let db;
const connectToDb = () => {
    try {
        client.connect();
        db = client.db("sample_mflix")
        console.log('Connection acquired')
    } catch (error) {
        console.log(error, `Couldn't connect to db`)
    }
};

connectToDb()

app.get("/users", async (req, res) => {
    const users = await db.collection('users').find().toArray();
    res.status(200).send(users)
})

app.get("/theaters", async (req, res) => {
    const theaters = await db.collection('theaters').find().toArray();
    res.status(200).send(theaters)
})

app.post("/users", async (req, res) => {
    try {
        const user = req.body;
        const response = await db.collection("users").insertOne(user);   
        res.send(response);
    } catch (error) {
        res.send(`Error: ${error}`);
    }
});




app.put('/users', async (req, res) => {
    try {
        const { name, email, id} = req.body;
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



app.listen(5000, console.log("Runs at 5000"))
 