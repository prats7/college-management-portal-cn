const express = require('express');
const router = express.Router();

// Assignment model
const Assignment = require('../../models/Assignment');

//Middleware JWT authentication
const auth = require('../../middleware/auth');

// GET api/assignments
//GET all assignmets
router.get('/', (req, res) => {
    Assignment.find()
        .sort({ date: -1 })
        .then(assignments => res.json(assignments))
});

// POST api/assignments
//POST assignmets
router.post('/', auth, (req, res) => {
    const newAssignment = new Assignment({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        assignment: req.body.assignment
    });

    newAssignment.save().then(assignment => res.json(assignment));
});

// Delete a completed Assignment

router.delete('/:id', auth, (req, res) => {
    Assignment.findById(req.params.id)
        .then(assignment => assignment.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;