
#### 1. Docker commands

starting the worker image on docker:
```
docker run -d --network backend_redis_worker_network -e SMTP_USERNAME="AKIAR6B7ETLZQLHGKJNQ" -e SMTP_PASSWORD="BMaxge1YJctnjFtcqZAejfBv3bJnVjfkwXwWkkMdpF4C" -e SMTP_ENDPOINT="email-smtp.ap-south-1.amazonaws.com" -e REPLICATE_API_TOKEN="r8_a8lgqiJ1UOkoSlokLFnchC9vmgLvmbv1Li3Yg" -e REDIS_URL="redis://lithouse-redis:6379" lithouse_worker
```

building the image:
```
docker build -t lithouse_worker .
```