# x-headers-research

This is the Nginx Configuration File:
```
events {}

http {
  upstream backend {
    server app:3000;
  }

  server {
    listen 80;
    server_name localhost;

    location / {
      proxy_pass http://backend;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Host $host;
    }
  }
}
```

## Normal Request
![image](https://user-images.githubusercontent.com/25315255/222780322-c3b62a8b-e23b-4a73-80e6-6b26cb58b797.png)

## Change X-Real-IP Request
```
GET / HTTP/1.1
Host: ec2-54-164-141-50.compute-1.amazonaws.com
X-Real-IP: evil.com
```

*Response*<br/>
Nothing changes because `x-real-ip` is not spoofable.<br/>
![image](https://user-images.githubusercontent.com/25315255/222780322-c3b62a8b-e23b-4a73-80e6-6b26cb58b797.png)

## Change X-Forwarded-For Request
```
GET / HTTP/1.1
Host: ec2-54-164-141-50.compute-1.amazonaws.com
X-Forwarded-For: evil.com
```

*Response*<br/>
The host gets appended to an array<br/>
![image](https://user-images.githubusercontent.com/25315255/222781109-2e34ea18-1515-47d5-bcf7-390ae8d085d8.png)

## Change Host & X-Forwarded-Host Request
Not sure if I correctly configured the `X-Forwarded-Host` header because it is set the same as `$host`. Anyways, changing the `Host` header will result in both being changed.
```
GET / HTTP/1.1
Host: evil.com
```

*Response*<br/>
![image](https://user-images.githubusercontent.com/25315255/222781605-07361805-d356-44cb-b4f8-44baca588ec9.png)
