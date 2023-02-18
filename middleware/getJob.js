const Job = require('../model/job');

 const getJob = async(req, res, next) => {
  let job;
  try {
    job =  await Job.findById(req.params.id);
    console.log(job)
    if (job == null) {
      return res.status(404).json({ message: "Cannot find Job" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.job = job;
  next();
}

module.exports = getJob;
