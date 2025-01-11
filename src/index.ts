import { createClient } from "redis";
import { sendEmail } from "./email";
import { finetune } from "./finetune";
const client = createClient(); //cloud redis url here?  
require('dotenv').config() 

async function main() {
    try {
        await client.connect();
        console.log("connected to redis");

        while (1) {
            try {
                const response = await client.brPop("training", 0);
                console.log(response);
                //logic to send user image to replicate for training
                //TODO:Optional => acknowledgment for completion of task
                if (!response) {
                    return
                }
                const elementData = JSON.parse(response.element);
                const userId = elementData.userid;

                const outputVersion = await finetune(userId);
                console.log("reached here in the main file,output version is: ",outputVersion)
                await sendEmail("yashhegde010@gmail.com","Hi User, your model is now ready to use. Happy lithouse-ing!")
                await new Promise((resolve)=>setTimeout(resolve,2000))
            } catch (error) {
                 console.log("error processing training",error)
            }
        }
    } catch (error) {
        console.log("error connecting to redis",error)
    }
}

main();