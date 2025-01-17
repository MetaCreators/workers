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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finetune = finetune;
const replicate_1 = __importDefault(require("replicate"));
const test_1 = require("./test");
require('dotenv').config();
const replicate = new replicate_1.default({
    auth: process.env.REPLICATE_API_TOKEN,
});
//input username should contain userId,username,Image url
function finetune(username) {
    return __awaiter(this, void 0, void 0, function* () {
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
        //             input_images: "https://",
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
        console.log("training output is: ", test_1.training);
        const outputVersion = test_1.training.output.version;
        console.log("output version is: ", outputVersion);
        return outputVersion;
    });
}
