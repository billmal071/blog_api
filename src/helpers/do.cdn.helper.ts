require('dotenv').config();
import { S3Client } from '@aws-sdk/client-s3';

const ID = process.env.DO_ACCESS_KEY_ID as string;
const SECRET = process.env.DO_SECRET_ACCESS_KEY as string;
const ENDPOINT = process.env.DO_ENDPOINT as string;
const REGION = process.env.DO_REGION as string;

export const s3Client = new S3Client({
  endpoint: ENDPOINT,
  region: REGION,
  credentials: {
    accessKeyId: ID,
    secretAccessKey: SECRET,
  },
});