const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['NEW','INPROGRESS','ONHOLD','COMPLETED'],
      default: 'NEW'
    },
    service_type: {
      type: String,
      enum: ['VECTOR_ART_WORK','DIGITIZING'],
      required: true,
    },
    memo: {
      type: String,
      required: true,
    },
    files: [{
      url: {
        type: String,
        required: false
      },
      name: {
        type: String,
        required: false
      }
    }
    ]
  },
  {
    timestamps: true
  }
);

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
