# 用 nginx 托管前端静态文件，部署到 Railway 时自动识别这个 Dockerfile
FROM nginx:alpine

# 把页面文件复制到 nginx 的网页目录，calculator.html 作为首页
COPY calculator.html /usr/share/nginx/html/index.html
COPY style.css /usr/share/nginx/html/style.css
COPY app.js /usr/share/nginx/html/app.js

# nginx 配置模板：启动时自动把 ${PORT} 替换成平台分配的端口
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
