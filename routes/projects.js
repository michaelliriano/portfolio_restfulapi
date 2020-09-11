const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const multer = require('multer');
const redis = require('redis');
const uploadFile = require('../aws_storage/upload');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'portfolioimageproject',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

router.post('/project', upload.single('image'), async (req, res) => {
  try {
    const photo = req.file.location;
    const project = new Project({
      name: req.body.name,
      type: req.body.type,
      tools: req.body.tools,
      github: req.body.github,
      live: req.body.live,
      summary: req.body.summary,
      img: photo,
    });
    await project.save();
    res.send({
      data: {
        success: true,
        msg: `${project.name} has posted`,
      },
    });
  } catch (error) {
    console.log(req.file.location);
    res.send({ data: { success: false, msg: error.message } });
  }
});

// Get all Projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.send({
      data: { success: true, length: projects.length, projects: projects },
    });
  } catch (error) {
    res.send({ data: { success: false, msg: error.message } });
  }
});
// Get Project by ID
router.get('/projects/:id', async (req, res) => {
  try {
    let id = req.params.id;
    const project = await Project.findOne({ _id: id });
    if (project === null) {
      res.send({ data: { success: true, msg: 'This project was deleted' } });
    } else res.send({ data: { success: true, project: project } });
  } catch (error) {
    res.send({
      data: {
        success: false,
        error:
          'You have reached a project is invalid or doesnt exist. Please check project id and try again.',
      },
    });
  }
});

// router.delete('/projects/:id', async (req, res) => {
//   try {
//     let id = req.params.id;
//     const project = await Project.findByIdAndDelete({ _id: id });
//     res.send({ success: true, msg: `${project.name} was removed` });
//   } catch (error) {
//     res.send({
//       data: {
//         success: false,
//         error: error.message,
//       },
//     });
//   }
// });
// Update Project
// .put('/projects/:id', async (req, res) => {
//   try {
//     let id = req.params.id;
//     const updateProject = {
//       name: req.body.name,
//       type: req.body.type,
//       tools: req.body.tools,
//       summary: req.body.summary,
//       img: req.body.img,
//     };
//     const project = await Project.update({ id, $set: project });
//     res.send({
//       data: { success: true, msg: `${updateProject.name} was updated` },
//     });
//   } catch (error) {
//     res.send({
//       data: {
//         success: false,
//         error: error.message,
//       },
//     });
//   }
// });

module.exports = router;
