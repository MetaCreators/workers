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
  // const training = await replicate.trainings.create(
  //     "ostris",
  //     "flux-dev-lora-trainer",
  //     "e440909d3512c31646ee2e0c7d6f6f4923224863a6a10c494606e79fb5844497",
  //     {
          
  //         destination:  `adityaraj-007/${username}`,
  //         input: {
  //             steps: 1500,
  //             lora_rank: 16,
  //             optimizer: "adamw8bit",
  //             batch_size: 1,
  //             resolution: "512,768,1024",
  //             autocaption: true,
  //             //TODO: Fix input_images to accept zip file as input
  //             input_images:presignedGETURL,
  //             trigger_word: username,
  //             learning_rate: 0.0004,
  //             wandb_project: "flux_train_replicate",
  //             autocaption_prefix: `photo of ${username}`,
  //             wandb_save_interval: 100,
  //             caption_dropout_rate: 0.05,
  //             cache_latents_to_disk: false,
  //             wandb_sample_interval: 100
  //         }
  //     }
  // );

  console.log("training output is: ",training);
  const outputVersion = training.output.version;
  console.log("output version is: ",outputVersion);
  return outputVersion;
}
