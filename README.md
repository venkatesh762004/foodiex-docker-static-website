
# 🍔 Foodiex - Food Ordering Website

A premium food ordering static website built using HTML, CSS, and JavaScript, and deployed using Docker and Nginx.

## 🚀 Technologies Used

- HTML5
- CSS3
- JavaScript
- Docker
- Nginx
- AWS EC2

## 📁 Project Structure

foodiex-docker-static-website/
├── index.html
├── style.css
├── script.js
├── Dockerfile
└── README.md

## 🐳 Docker Build

docker build -t foodiex-website:v1 .

## 🚀 Run Container

docker run -d \
  --name foodiex-container \
  -p 8081:80 \
  foodiex-website:v1

## 🌐 Access Website

http://YOUR-EC2-PUBLIC-IP:8081

## 🔍 Verify Container

docker ps

## 👨‍💻 Author

Venkatesh

GitHub: https://github.com/venkatesh762004
