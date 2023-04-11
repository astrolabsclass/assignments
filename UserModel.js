//1  import mongoose

const mongoose = require('mongoose');

//2 create the Schema

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        newsLetter: {
            type: true,
            required: true
        },
      
    }

);

// 3. create the model 
const UserModel = mongoose.model('users', UserSchema);

//4. Export user schema

module.exports = UserModel;


