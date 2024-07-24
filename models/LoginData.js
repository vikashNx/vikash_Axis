const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    username: String,
    password: String
}, { timestamps: true })

const LoginModal = mongoose.model('LoginModal', MessageSchema);

module.exports = LoginModal;
