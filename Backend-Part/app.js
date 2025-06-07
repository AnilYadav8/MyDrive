const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./models/Student');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/DriveData');


app.post('/signup', (req, res) => {
    StudentModel.create(req.body)  // create a new student and req.body means the data we are sending from frontend or the user is providingg data to frontend
    .then(Drive => res.json(Drive))  // if the data is created successfully then it will return the data in json format
    .catch(err => res.json(err))  // if something went wrong then it will log the error in the console
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;  // req.body means the data we are sending from frontend or the user is providingg data to frontend jisse email mai email aur password mai password aa jayega
    StudentModel.findOne({email : email})  // findOne means it will find the data in the database and if it is found then it will return the data in json format
    .then(user => {
        if(user){
            if(user.password == password){
                res.json("Login Successful")
            }
            else{
                res.json("Incorrect Password")
            }
        }
        else{
            res.json("User not found")
        }
    })
})

app.listen(3000, () => [
    console.log('Server is running on port 3000')
])