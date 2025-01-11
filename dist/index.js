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
                    //const response = await client.brPop("training",0);
                    //await processtraining(response.element); 
                    //logic to send user image to replicate for training
                    //TODO:Optional => acknowledgment for completion of task
                    (0, email_1.sendEmail)("yashhegde010@gmail.com", "Hi User, your model is now ready to use. Happy lithouse-ing!");
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
