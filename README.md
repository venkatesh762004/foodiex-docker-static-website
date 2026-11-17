# 🍔 FoodieX – Premium Food Ordering Website

A modern, responsive food ordering website built using **HTML, CSS and JavaScript**, featuring a premium 3D-inspired dark UI. Containerized with Docker and served using Nginx.

## 🚀 Project Overview

FoodieX is a frontend food ordering website where users can explore food items, search the menu, add products to a shopping cart, manage quantities and place a demo order.

The project demonstrates static website development and containerized deployment using Docker on an AWS EC2 instance.

## ✨ Features

- Premium dark UI with modern visual effects
- Responsive design for desktop and mobile
- Food menu with multiple categories
- Food search functionality
- Add to cart and remove items
- Increase and decrease product quantities
- Automatic cart total calculation
- Checkout form with demo order confirmation
- Nginx web server
- Docker container deployment

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Styling, animations and responsive design |
| JavaScript | Menu, search and cart functionality |
| Docker | Containerization |
| Nginx | Web server |
| AWS EC2 | Cloud deployment |

## 📁 Project Structure

```text
foodiex-docker-static-website/
│
├── index.html
├── Dockerfile
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
└── assets/
```

## 🐳 Docker Setup

### 1. Build Docker Image

```bash
docker build -t foodiex-website:v2 .
```

### 2. Check Docker Image

```bash
docker images
```

### 3. Run Docker Container

```bash
docker run -d \
  --name foodiex-container \
  --restart unless-stopped \
  -p 8085:80 \
  foodiex-website:v2
```

### 4. Verify Container

```bash
docker ps
```

### 5. Check Website Response

```bash
curl -I http://localhost:8085
```

Expected response:

```text
HTTP/1.1 200 OK
```

## ☁️ AWS EC2 Deployment

1. Launch an Amazon Linux EC2 instance.
2. Install and start Docker.
3. Copy or clone the FoodieX project onto EC2.
4. Build the Docker image.
5. Run the container on port 8085.
6. Configure the EC2 Security Group to allow inbound TCP port 8085 from your IP.
7. Open the website in your browser.

Website URL:

```text
http://YOUR-EC2-PUBLIC-IP:8085
```

## 🔍 Useful Docker Commands

```bash
# List running containers
docker ps

# List all containers
docker ps -a

# View container logs
docker logs foodiex-container

# Stop container
docker stop foodiex-container

# Start container
docker start foodiex-container

# Restart container
docker restart foodiex-container

# Remove container
docker rm -f foodiex-container

# Inspect container
docker inspect foodiex-container
```

## 📌 Learning Outcomes

Through this project, I practiced:

- Developing a responsive static website
- Organizing HTML, CSS and JavaScript files
- Creating a custom Dockerfile
- Building Docker images
- Running containers with port mapping
- Hosting a website using Nginx
- Deploying a containerized application on AWS EC2
- Troubleshooting Docker container and port conflicts

## ⚠️ Project Limitations

This is a frontend demonstration project.

- Checkout is a demo and does not process real payments.
- Orders are not stored in a backend database.
- No real restaurant or delivery integration is configured.
- Food images and Google Fonts are loaded from external sources.

## 👨‍💻 Author

**Thotakura Naga Venkatesh**

Cloud & DevOps Engineer | AWS | Linux | Docker | Terraform | Ansible

- GitHub: https://github.com/venkatesh762004
- LinkedIn: https://www.linkedin.com/in/naga-venkatesh-thotakura-156724291/

---

⭐ If you find this project useful, feel free to explore and learn from it.

**Project:** FoodieX – Dockerized Static Food Ordering Website
