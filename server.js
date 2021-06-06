require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
 
mongoose.connect('mongodb://localhost:27017/auth', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
})
.then(conn => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4200', credentials: true }))

app.get('/health', (_,res) => res.send('Server up and running'))
app.use('/auth', require('./api/routes/auth'));

app.use('*', (req,res) => res.sendStatus(404));

app.listen(5000, () => console.log(`Server started a port 5000`));