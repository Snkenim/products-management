const { ObjectId } = require("mongodb")

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await req.db.collection("users").insertOne({ name, email, password });
        res.send("Done")
    } catch (error) {
        res.send(error)
    }
}

module.exports = createUser