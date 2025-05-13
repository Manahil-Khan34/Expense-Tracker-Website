const mongoose = require('mongoose');

const ExpanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    icon: { type: String },//Example : https://example.com/icon.png

    category: { type: String, required: true },//Example : Food, transport, groceory etc.

    amount: { type: Number, required: true },

    date: { type: Date, default: Date.now },
    
}, { timestamps: true });

module.exports = mongoose.model('Expance', ExpanceSchema);