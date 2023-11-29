require('dotenv').config();
const Job = require('./models/Job');
const data = require('./MOCK_DATA.json');
const connect = require('./db/connect');

const populate = async (req, res) => {
  try {
    await connect(process.env.MONGO_URL);
    await Job.deleteMany();
    await Job.insertMany(data);
    console.log('success');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

populate();
