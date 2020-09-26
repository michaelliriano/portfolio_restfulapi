const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Profile = require('../models/Profile');


router.post('/addprofile', async (req, res) => {
    const projects = await Project.find();
    let projectArray = []
    projects.forEach((project) => {
        projectArray.push(project._id)
    })
       try {
        const profile = new Profile({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            bio: req.body.bio,
            yearsOfExperience: req.body.yearsOfExperience,
            projects: projectArray,
            github: req.body.github,
            website: req.body.website,
            education: req.body.education,
            hobbies: req.body.hobbies,
            email: req.body.email
          })
          await profile.save()
          res.send({
            data: { success: true, msg: "Posted to Database" },
          });
       } catch (error) {
           res.send(error.message)
       } 
})
router.get('/michael', async (req,res) => {
    const getProfile = await Profile.find();
    res.send({data: { success: true, profile: getProfile[0] }})
})
module.exports = router;