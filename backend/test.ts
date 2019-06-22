import dotenv from 'dotenv';
import StorageS3 from './StorageS3';
import StorageGoogle from './StorageGoogle';
dotenv.config();

const bucketName = 'aap-en-beer';

const configS3 = {
  bucketName,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
}

const configGoogle = {
  bucketName,
  projectId: 'default-demo-app-35b34',
  keyFilename: './da2719acad70.json',
}

const getFilesInBucket1 = async () => {
  const s3 = new StorageS3(configS3);
  const d = await s3.getFilesInBucket('aap-en-beers')
  console.log(d);
}
// getFilesInBucket1();



const createBucket = async () => {
  const gc = new StorageGoogle(configGoogle);
  const d = await gc.createBucket('aap-en-beers')
  console.log(d);
}
// createBucket();


// getFilesInBucket();
const getFilesInBucket = async () => {
  const gc = new StorageGoogle(configGoogle);
  const d = await gc.getFilesInBucket('aap-en-beers')
  console.log(d);
}
// getFilesInBucket();


const listBucketNames = async () => {
  const gc = new StorageGoogle(configGoogle);
  const d = await gc.listBucketNames()
  console.log(d);
}
// listBucketNames();


const addFileFromPath = async (path: string) => {
  const gc = new StorageGoogle(configGoogle);
  const d = await gc.addFileFromPath(path)
  console.log(d);
}
addFileFromPath('/home/abudaan/Pictures/sun-blanket.jpg')