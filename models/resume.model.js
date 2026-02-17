const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    userID :{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
    },
    objective: {
      summery: String,
    },
    education: [
      {
        school: String,
        degree: String,
        year: String,
      },
    ],

    experience: [
      {
        company: String,
        role: String,
        duration: String,
        bullets: [String],
      },
    ],

    skills: [String],

    atsScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Resume", resumeSchema);
