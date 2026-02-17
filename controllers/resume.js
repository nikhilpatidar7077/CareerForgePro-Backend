
const express = require("express");
const Resume = require("../models/resume.model");

const router = express.Router();

// CREATE Resume
const createReume =  async (req, res) => {
  try {
    const {id} = req.user
    const resumeCreate = await Resume.create({
      userID:id,
      ...req.body
    })
    res.status(201).json({
      success:true,
      message:"Resume created successfully",
      resume:resumeCreate
    });
  } catch (error) {
    res.status(500).json({ 
      success:false,
      message: error.message 
    });
  }
}

module.exports = createReume;





