import { S3 as _S3 } from 'aws-sdk';
import config from '../env';

const { SECRET_ACCESS_KEY, AWS_BUCKET_NAME, ACCESS_KEY_ID } = config;
const S3 = new _S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  ACL: 'public-read'
});

export default { AWS_BUCKET_NAME, S3 };
