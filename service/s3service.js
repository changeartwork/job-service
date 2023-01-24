const { S3 } = require("aws-sdk");

exports.s3upload = async (files) => {
    const s3 = new S3();
  
    const params = files.map((file) => {
      return {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `job-source-files/${new Date().getTime()}_${file.originalname}`,
        Body: file.buffer,
      };
    });
  
    return await Promise.all(params.map((param) => s3.upload(param).promise()));
  };


exports.s3download =  async (params) => {
    const s3 = new S3();
    return new Promise((resolve, reject) => {
            s3.getObject(params, function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log("Successfully dowloaded data from bucket");
                    resolve(data);
                }
            });
    });
}