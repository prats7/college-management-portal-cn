const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const url = 'mongodb://localhost/mern-assignment-app';

//User model
const User = require('../../models/User');

//user auth
router.post('/', (req, res) => {
    const { userType, email, password } = req.body;

    //validation
    if (!userType || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    //Find user
    User.findOne({ email, userType })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User doesn't exists " });


            //Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

                    jwt.sign(
                        { id: user.id },
                        "secret", { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    userType: user.userType,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )

                })

        });
});



//GET api/auth/user
//Get user data
//private
router.get('/user', auth, (req, res) => {


    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

router.patch('/:id', (req, res) => {

    User.findByIdAndUpdate(req.params.id)
        .then(user => {

            user.name = req.body.name

            user.save(err => {
                if (err) return res.status(500).json({ message: err.message });
                else return res.status(200).json({ message: user.name });
            })
        }).catch(err => {
            console.log(err);
        })
})


router.patch('/password/:id', (req, res) => {

    User.findByIdAndUpdate(req.params.id)
        .then(user => {

            //password encryption
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(user => {
                            if (err) return res.status(500).json({ message: err.message });
                            else return res.status(200).json({ message: user.password });
                        });
                });
            })
        })
})



module.exports = router;