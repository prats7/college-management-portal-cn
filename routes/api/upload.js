const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const crypto = require('crypto');
const File = require('../../models/File');

//Query request for delete
app.use(methodOverride('_method'));

//Init gfs
let gfs;

conn.once('open', () => {
    //Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('upload');
})

// Create storage engine
const storage = new GridFsStorage({
    url: 'mongodb://localhost/mern-assignment-app',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'upload'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

// // route GET /
// // Loads form
// app.get('/', (req, res) => {
//     res.render('index');
// });

//Upload endpoint
app.post('/', upload.single('file'), (req, res) => {

    newFile
        .save()
        .then(file => res.json(file))
        .catch((err) => res.status(400).json(`Error: ${err}`));
})

