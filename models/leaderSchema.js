const mongoose = require('mongoose');

const leaderShipSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
    },
    memberID: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        enum: [],
        required: true,
    },
    postingName: {
        type:String,
        enum: [],
        required:true,
    },
    qualification: {
        type: String,
        enum: ['UG', 'PG', 'PhD', 'SSLC', 'HSC', 'others'],
        required: true,
    },
    leaderID: {
        type: String,
        required: true,
    },
    isSuspended: {
        type: Boolean,
        default: false,
    },
    suspensionEndDate: {
        type: Date,
    },
}, {timestamps: true});

module.exports = mongoose.model('Leader', leaderShipSchema);