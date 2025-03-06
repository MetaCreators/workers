import Replicate from "replicate";
import { training } from "./test";
require('dotenv').config()
import * as aws from "aws-sdk";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

//input username should contain userId,username,Image url
export async function finetune(username: string,filename:string,userId:string) {

  const digiendpoint = new aws.Endpoint("blr1.digitaloceanspaces.com");
  const s3Client = new aws.S3({
    endpoint: digiendpoint,
    accessKeyId: process.env.DIGIOCEAN_OBJECT_ACCESS_ID || "" ,
    secretAccessKey: process.env.DIGIOCEAN_OBJECT_SECRET || "" 
  });

  const presignedGETURL = await s3Client.getSignedUrl('getObject', {
    Bucket: 'lithouseuserimages',
    Key: `${userId}/trainingImages/${filename}`,
    Expires: 604800 //this is for 7 days, change it to something legit 
  })

  console.log("presigned url for get zip file is", presignedGETURL);
   
  //once zip file task is done, integrate it here and test out training on replicate
  const training = await replicate.trainings.create(
      "ostris",
      "flux-dev-lora-trainer",
      "e440909d3512c31646ee2e0c7d6f6f4923224863a6a10c494606e79fb5844497",
      {
          
          destination:  `adityaraj-007/${username}`,
          input: {
              steps: 1500,
              lora_rank: 16,
              optimizer: "adamw8bit",
              batch_size: 1,
              resolution: "512,768,1024",
              autocaption: true,
              input_images:presignedGETURL,
              trigger_word: username,
              learning_rate: 0.0004,
              wandb_project: "flux_train_replicate",
              autocaption_prefix: `photo of ${username}`,
              wandb_save_interval: 100,
              caption_dropout_rate: 0.05,
              cache_latents_to_disk: false,
              wandb_sample_interval: 100
          }
      }
  );

  //TODO: PUBSUB ARCHITECTURE FOR CREATION OF NEW MODELS AND UPDATING TRAINING STATUS
  // CHANNELS: TRAINING_STATUS
  // BACKEND AND WORKER BOTH SUBSCRIBE TO THESE CHANNELS
  // BE => PUSHES TO REDIS QUEUE => WORKER PICKS UP USERID FROM THE QUEUE => STARTS PROCESSING => WORKER PUBLISHES {USERID:USERID, STATUS: "PENDING"} TO TRAINING_STATUS CHANNEL
  // SINCE BE HAS SUBSCRIBED TO TRAINING_STATUS , IT RECEIVES THIS "PENDING" MESSAGE AND UPDATES THE DB FOR THAT USERID
  // WHEN THE TRAINING IS COMPLETE, WORKER PUBLISHES {USERID:USERID, STATUS: "FAILED" || "SUCCESS"} TO TRAINING_STATUS CHANNEL
  // SO AGAIN THE BE UPDATES THE DB FOR THAT USERID
  // WHAT ARE OTHER CONSIDERATIONS REQUIRED HERE ? IS THERE ANY SORT OF CLEANUP REQUIRED ? MENTION OTHER THINGS AS WELL

//   Key Considerations & Improvements
// Message Format

// Add timestamps to your messages: {userId: "123", status: "PENDING", timestamp: 1654321987}
// Include more detailed information when relevant: {userId: "123", status: "FAILED", errorCode: "OUT_OF_MEMORY", errorMessage: "Not enough RAM", timestamp: 1654321987}

// Error Handling

// What happens if the worker crashes during processing?
// Consider adding a "STARTED" status before "PENDING" to differentiate queue pickup from actual processing
// Implement heartbeat messages for long-running training jobs

// Message Delivery Guarantees

// Redis pubsub doesn't guarantee message delivery if no subscribers are active
// Consider implementing an acknowledgment mechanism or use Redis Streams instead of basic pubsub (https://redis.io/docs/latest/develop/interact/pubsub/#delivery-semantics)

// Recovery Scenarios

// If the backend restarts, how does it know about in-progress jobs?
// Store job state in Redis (not just as pubsub messages) for persistence

// Resource Cleanup

// Set TTL (time-to-live) for Redis keys
// Implement garbage collection for temporary files generated during training
// Clear memory-intensive resources after job completion

// Monitoring & Debugging

// Add logging for each message published/received
// Consider adding a job ID (besides userId) to track specific training runs
  // Log performance metrics (processing time, resource usage)
  
//   {
//   "jobId": "train_123456",
//   "userId": "user_789",
//   "status": "PENDING", 
//   "progress": 0,
//   "timestamp": 1709747230,
//   "metadata": {
//     "modelType": "classification",
//     "datasetSize": 1024
//   }
// }
  //TODO: hit the /training-status url on backend for updating training status

  //useful output parameters from training =>
  //training.status
  //completed_at
  //created_at
  //started_at
  //id:
  //training.input and training.output
  //after training is completed, hit the backend ("/training-status" ROUTE) => in the backend, update the training status

  console.log("training output is: ",training);
  const outputVersion = training.output.version;
  console.log("output version is: ",outputVersion);
  return outputVersion;
}
