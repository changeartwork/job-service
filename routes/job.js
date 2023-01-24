const path = require('path');
const express = require('express');
const multer = require('multer');
const Job = require('../model/job');
const auth = require("../middleware/auth");
const {s3upload, s3download} = require("../service/s3service");
const Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10000000, // max file size 10MB = 10000000 bytes
    files: 5
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|psd)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls, psd format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

Router.post(
  '/create',
  upload.array('files'),
  async (req, res) => {
    try {
      const { name, mail, contact, memo, service_type } = req.body;
      const job = new Job({
        name,
        mail,
        contact,
        memo,
        service_type
      });
      await job.save();
      const s3response = await s3upload(req.files);
      s3response.map(async (data)=>{
        var s3details = {url: data.Location, name: data.key};
        job.files.push(s3details);
      })
      await job.save();
      res.status(201).json({message : "Job placed successfully"});
    } catch (error) {
      res.status(400).send({ message: "Unable place the job", error: error.message });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({ message: "Something went wrong",error: error.message});
    }
  }
);

Router.get('/list', auth, async (req, res) => {
  try {
    const isFilter = (req.query.email == null) ? false : true;
    const files = isFilter  ? await Job.find({mail:req.query.email}) : await Job.find({}); 
    const sortedByCreationDate = isFilter ? files : files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(500)
      .send(
        {
          message: 'Error while getting job.', 
          error: error.message
        });
  }
});


module.exports = Router;
