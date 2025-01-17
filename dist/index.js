"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const email_1 = require("./email");
const finetune_1 = require("./finetune");
const client = (0, redis_1.createClient)(); //cloud redis url here?  
require('dotenv').config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("connected to redis");
            while (1) {
                try {
                    const response = yield client.brPop("training", 0);
                    console.log(response);
                    //logic to send user image to replicate for training
                    //TODO:Optional => acknowledgment for completion of task
                    if (!response) {
                        return;
                    }
                    const elementData = JSON.parse(response.element);
                    const userId = elementData.userid;
                    const outputVersion = yield (0, finetune_1.finetune)(userId);
                    console.log("reached here in the main file,output version is: ", outputVersion);
                    yield (0, email_1.sendEmail)("yashhegde010@gmail.com", "Hi User, your model is now ready to use. Happy lithouse-ing!");
                    yield new Promise((resolve) => setTimeout(resolve, 2000));
                }
                catch (error) {
                    console.log("error processing training", error);
                }
            }
        }
        catch (error) {
            console.log("error connecting to redis", error);
        }
    });
}
main();
