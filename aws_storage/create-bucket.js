const AWS = require('aws-sdk');
require('dotenv').config();

const BUCKET_NAME = 'portfolioimages';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    // Set your region here
    LocationConstraint: 'eu-west-1',
  },
};

s3.createBucket(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log('Bucket Created Successfully', data.Location);
});
