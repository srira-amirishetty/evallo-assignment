const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// require('dotenv').config();


const dataRoutes = require('./routes/data');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect("mongodb+srv://sriram:camps@cluster0.88kqnqd.mongodb.net/json-data");

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.use('/', dataRoutes);

// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});