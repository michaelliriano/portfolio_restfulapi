const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Welcome Message
router.get('/', (req, res) => {
  try {
    res.send({
      data: {
        success: true,
        msg:
          'Thank you for visting my page and please feel free to contact me if you have any questions.',
      },
    });
  } catch (error) {
    res.send({ data: { success: false, msg: error } });
  }
});

// Get all Projects
router.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.send(projects);
});

// Add new Project
router.post('/project', async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      type: req.body.type,
      tools: req.body.tools,
      summary: req.body.summary,
      img: req.body.img,
    });
    await project.save();
    res.send({ success: true, msg: 'Project added to the database' });
  } catch (error) {
    res.send({ success: false, msg: error.message });
  }
});

// Get Project by ID
router
  .get('/projects/:id', async (req, res) => {
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
  })

  // Delete Project
  .delete('/projects/:id', async (req, res) => {
    try {
      let id = req.params.id;
      const project = await Project.findByIdAndDelete({ _id: id });
      res.send({ success: true, msg: `${project.name} was removed` });
    } catch (error) {
      res.send({
        data: {
          success: false,
          error: error.message,
        },
      });
    }
  })

  // Update Project
  .put('/projects/:id', async (req, res) => {
    try {
      let id = req.params.id;
      const updateProject = {
        name: req.body.name,
        type: req.body.type,
        tools: req.body.tools,
        summary: req.body.summary,
        img: req.body.img,
      };
      const project = await Project.update({ id, $set: project });
      res.send({ success: true, msg: `${updateProject.name} was updated` });
    } catch (error) {
      res.send({
        data: {
          success: false,
          error: error.message,
        },
      });
    }
  });

module.exports = router;
