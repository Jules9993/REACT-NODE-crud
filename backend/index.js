const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors()); 
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/studentsdb')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Could not connect to MongoDB', err);
});

const student = new mongoose.model('student', {
    name: String,
    email: String,
    course: String
});

app.get('/students', async (req, res) => {
    const students = await student.find();
    res.json(students);
});

app.get('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    const studentData = await student.findById(studentId);
    if (!studentData) {
        return res.status(404).send('Student not found');
    }
    res.json(studentData);
});
app.post('/students', async (req, res) => {
    const { name, email, course } = req.body;
    const newStudent = new student({ name, email, course });
    await newStudent.save();
    res.status(201).json(newStudent);
});
app.put('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    const { name, email, course } = req.body;
    const updatedStudent = await student.findByIdAndUpdate(studentId, { name, email, course }, { new: true });
    if (!updatedStudent) {
        return res.status(404).send('Student not found');
    }
    res.json(updatedStudent);
}
);
app.delete('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    const deletedStudent = await student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
        return res.status(404).send('Student not found');
    }
    res.json(deletedStudent);
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


  



