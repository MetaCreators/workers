
#### 1. Docker commands

starting the worker image on docker:
```
docker run \
  -e SMTP_USERNAME="" \
  -e SMTP_PASSWORD="" \
  -e SMTP_ENDPOINT="" \
  -e REPLICATE_API_TOKEN="" \
  lithouse_worker

```

building the image:
```
docker build -t lithouse_worker .
```