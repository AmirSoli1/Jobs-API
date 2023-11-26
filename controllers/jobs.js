const getAllJobs = (req, res) => {
  res.status(200).send('getAllJobs');
};

const getJob = (req, res) => {
  res.status(200).send('getJob');
};

const createJob = (req, res) => {
  res.status(200).send('createJob');
};

const updateJob = (req, res) => {
  res.status(200).send('updateJob');
};

const deleteJob = (req, res) => {
  res.status(200).send('deleteJob');
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
