const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ 
    name:{ 
        type: String, 
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

mongoose.model('User', UserSchema);