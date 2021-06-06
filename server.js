const express = require('express');
const app = express();
const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(conn => console.log('MongoDB connected'))
    .catch(err => console.log(err))
;

app.use(express.json());

app.get('/health', (_,res) => res.send('Server up and running'))
app.use('/api/auth', require('./api/routes/auth'));

app.use('*', (req,res) => res.sendStatus(404));

app.listen(5000, () => console.log(`Server started a port 5000`));