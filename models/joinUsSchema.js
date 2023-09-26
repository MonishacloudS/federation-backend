const mongoose = require("mongoose");

const joinUsSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: false,
    },
    otp: {
      type: String,
      required: false,
    },
    memberID: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "Transgender", "Others"],
      required: true,
    },
    referralCode: {
      type: String,
      required: true,
    },
    aadharCard: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      enum: ["Bachelors", "Masters", "Doctrate", "SSLC", "HSC", "Others"],
      required: true,
    },
    religion: {
      type: String,
      enum: ["Hindu", "Chirstian", "Muslim", "Buddhism", "Others"],
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-", "Others"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      enum: [],
      required: true,
    },
    aadharCardURL: {
      type: String,
      required: true,
    },
    profileURL: {
      type: String,
      required: true,
    },
    isAdminApproved: {
      type: Boolean,
      default: false,
    },
    postingLocation: {
      type: String,
      required: false,
    },
    postingName: {
      enum: [],
      type: String,
      required: false,
    },
    leaderID: {
      type: String,
      required: false,
    },
    suspendedUntil: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("joinUs", joinUsSchema);
