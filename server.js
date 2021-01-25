const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();

//Bodyparser Middleware
app.use(express.json());

//Connect to db
const db = require('./config/mongoose');

//const assignments = require('./routes/api/assignments');
//Use routes
app.use('/api/tasks', require('./routes/api/tasks'));
app.use('/api/assignments', require('./routes/api/assignments'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;

    file.mv(`${__dirname}/client/public/upload/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/upload/${file.name}` });
    });
});

if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//Express server
const PORT = process.env.PORT || 9050;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
