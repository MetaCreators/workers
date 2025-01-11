"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.training = void 0;
exports.training = {
    "completed_at": "2024-12-29T16:39:07.017584Z",
    "created_at": "2024-12-29T16:11:12.069000Z",
    "data_removed": false,
    "error": null,
    "id": "yhyxz6wh8nrme0cm2cqr2yxkqc",
    "input": {
        "steps": 1500,
        "lora_rank": 16,
        "optimizer": "adamw8bit",
        "batch_size": 1,
        "resolution": "512,768,1024",
        "autocaption": true,
        "input_images": "https://replicate.delivery/pbxt/MEHfVTmR8nUEOyiwoaYCoWhvryCmmK4L5s1XdXBqu6xi7EOL/shikhar_pics.zip",
        "trigger_word": "Shikhar",
        "learning_rate": 0.0004,
        "wandb_project": "flux_train_replicate",
        "autocaption_prefix": "photo of Shikhar",
        "wandb_save_interval": 100,
        "caption_dropout_rate": 0.05,
        "cache_latents_to_disk": false,
        "wandb_sample_interval": 100
    },
    "logs": "",
    "metrics": {
        "predict_time": 1674.940257378,
        "total_time": 1674.948584
    },
    "output": {
        "version": "adityaraj-007/shikhar_flux:925da5f563c07bb620a3bf3cc2185079b1cfc7d62f47a9c234e67dbc36eab738",
        "weights": "https://replicate.delivery/xezq/nAhWcGRcC2acElRYzK0ukvw1ANLiE8TKfYdYGtHsVSRVa5fTA/trained_model.tar"
    },
    "started_at": "2024-12-29T16:11:12.077327Z",
    "status": "succeeded",
    "urls": {
        "stream": "https://stream.replicate.com/v1/files/bcwr-g6nhrchzei4zcde2z5yjeix724wvksaalpstvoliod2zsu4uf4ua",
        "get": "https://api.replicate.com/v1/trainings/yhyxz6wh8nrme0cm2cqr2yxkqc",
        "cancel": "https://api.replicate.com/v1/trainings/yhyxz6wh8nrme0cm2cqr2yxkqc/cancel"
    },
    "version": "e440909d3512c31646ee2e0c7d6f6f4923224863a6a10c494606e79fb5844497"
};
