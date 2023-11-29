const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');
const Job = require('../models/Job');

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObj = { createdBy: req.user.userId };

  if (search) {
    queryObj.position = { $regex: search, $options: 'i' };
  }
  if (status && status !== 'all') {
    queryObj.status = status;
  }
  if (jobType && jobType !== 'all') {
    queryObj.jobType = jobType;
  }

  let jobsQuery = Job.find(queryObj);
  if (sort) {
    const lut = {
      latest: () => jobsQuery.sort('-createdAt'),
      oldest: () => jobsQuery.sort('createdAt'),
      'a-z': () => jobsQuery.sort('position'),
      'z-a': () => jobsQuery.sort('-position'),
    };

    lut[sort]();
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  jobsQuery.skip(limit * (page - 1)).limit(limit);

  const jobs = await jobsQuery;

  const totalJobs = await Job.countDocuments(queryObj);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOne({ _id: id, createdBy: req.user.userId });
  if (!job) throw new NotFoundError('Job does not exist');
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  const createdBy = req.user.userId;
  const job = await Job.create({ ...req.body, createdBy });
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
