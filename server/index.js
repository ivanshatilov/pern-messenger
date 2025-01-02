require('dotenv').config();
const express = require('express');
const sequelize = require('./db.js');
const models = require('./models/models.js');
const cors = require('cors');
const router = require('./routes/index.js');
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);


app.use(errorHandler)


app.get('/', (req,res) => {
    res.status(200).json({"message": "works"})
})


const start = async () => {
    try {
        sequelize.authenticate();
        sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Server started successfully on port: ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();

