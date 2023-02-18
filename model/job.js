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
    business_name:{
      type: String,
      required: false
    },
    status: {
      type: String,
      enum: ['NEW','INPROGRESS','ONHOLD','COMPLETED','DROPPED'],
      default: 'NEW',
      required: true
    },
    service_type: {
      type: String,
      enum: ['VECTOR_ART_WORK','DIGITIZING','BUSINESS_CARD','BROUCHER','LOGO','CARTOON','OTHERS'],
      required: true,
    },
    memo: {
      type: String,
      required: true,
    },
    additional_details: {
      type: Object,
      required: false
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
    ],
    final_files: [{
      url: {
        type: String,
        required: false
      },
      name: {
        type: String,
        required: false
      }
    }],
    comments: [{
      name: {
        type: String,
      },
      comment: {
        type: String
      },
      time: {
        type : Date, 
        default: Date.now 
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
