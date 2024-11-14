const createUser = async (req, res, db) => {
    try {
        const { name, email, password } = req.body;
        
        const response = await db.collection('users').insertOne({ name, email, password });
        res.status(201).send({ message: 'User created successfully', data: response });
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
};

module.exports = { createUser };
