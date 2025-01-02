require('dotenv').config();
const express = require('express');
const sequelize = require('./db.js');


const PORT = process.env.PORT || 5000;

const app = express();



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

