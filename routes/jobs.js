const express = require('express');
const jobsRouter = express.Router();

const testUser = require('../middleware/test-user');

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

jobsRouter.route('/').get(getAllJobs).post(testUser, createJob);
jobsRouter
  .route('/:id')
  .get(getJob)
  .patch(testUser, updateJob)
  .delete(testUser, deleteJob);

module.exports = jobsRouter;
