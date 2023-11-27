const { StatusCodes } = require('http-status-codes');
const Job = require('../models/Job');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = (req, res) => {
  res.status(200).send('getJob');
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  const createdBy = req.user.userId;
  const job = await Job.create({ company, position, createdBy });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = (req, res) => {
  res.status(200).send('updateJob');
};

const deleteJob = (req, res) => {
  res.status(200).send('deleteJob');
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
