// Database 
const db = require('./db/db');
require('dotenv').config();

// Server
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const developmentRoutes = require('./routes/developmentRoutes');
const storeRoutes = require('./routes/storeRoutes');
const app = express();
app.use(express.json());
app.use(cors( {
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.json("From backend");
});

app.use('/api/users', userRoutes);
app.use('/api/development', developmentRoutes);
app.use('/api/stores', storeRoutes);



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

