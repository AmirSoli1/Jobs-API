const express = require('express');
const jobsRouter = express.Router();

const testUser = require('../middleware/test-user');
const apiLimiter = require('../middleware/api-limiter');

const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} = require('../controllers/jobs');

jobsRouter.route('/').get(getAllJobs).post(testUser, apiLimiter, createJob);
jobsRouter.route('/stats').get(showStats);
jobsRouter
  .route('/:id')
  .get(getJob)
  .patch(testUser, updateJob)
  .delete(testUser, deleteJob);

module.exports = jobsRouter;
