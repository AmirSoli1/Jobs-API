const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');
const Job = require('../models/Job');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOne({ _id: id, createdBy: req.user.userId });
  if (!job) throw new NotFoundError('Job does not exist');
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const { company, position } = req.body;
  const createdBy = req.user.userId;
  const job = await Job.create({ company, position, createdBy });
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOneAndUpdate(
    { _id: id, createdBy: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job) throw new NotFoundError('Job does not exist');
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  await Job.findOneAndDelete({
    _id: id,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.OK).json({ job: null });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
