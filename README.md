# 前后端分离计算器系统 —— 前端

## 项目简介

本仓库是前后端分离计算器系统的前端部分，是一个纯 HTML + CSS + JavaScript 的网页，负责界面展示和用户交互。所有计算都通过 HTTP 请求发送到后端完成，前端本身不做任何计算。

使用前需要先输入用户名并点击确认，每个人的历史记录单独保存在后端数据库中，互相隔离。

## 技术栈

- HTML
- CSS
- 原生 JavaScript（使用 fetch 调用后端接口）

## 运行环境

- 任意现代浏览器（Chrome、Edge 等）
- 需要先启动后端服务（见后端仓库 README）

## 项目结构

```
StudentID_calculator_frontend/
├── calculator.html   计算器页面
├── style.css         页面样式
├── app.js            页面逻辑（调用后端接口）
├── README.md
└── codestyle.md
```

## 启动方法

1. 先启动后端服务（默认地址 `http://localhost:8080`）。
2. 直接用浏览器打开 `calculator.html` 即可使用。

`app.js` 开头的 `API_BASE` 会自动判断：本地打开时连 `http://localhost:8080/api`；
通过公网域名访问时自动使用同域名的 `/api`（由反向代理转发到后端），部署到任何地址都不用改代码。

## 前后端连接方式

前端通过 fetch 调用后端的 RESTful API：

| 操作 | 请求 |
| --- | --- |
| 计算 | POST /api/calculate |
| 查询历史 | GET /api/history |
| 删除一条历史 | DELETE /api/history/{id} |
| 清空历史 | DELETE /api/history |

界面上乘除号显示为 × ÷，发送给后端前会转换成 `*` `/`。

## 公网部署说明

本地开发时前后端分别运行在 8080 和 8600 端口。公网部署时通过一个反向代理
（`proxy.py`，/api 转发到后端，其余转发到前端）合并到一个入口（9000 端口），
再用内网穿透工具（如 pinggy / cloudflared）把 9000 端口暴露到公网即可。

项目根目录提供了 `一键部署.bat`：依次启动后端、前端静态服务、反向代理和隧道，
公网地址会显示在窗口中。免费隧道的地址每次重启都会变化，且 60 分钟后过期，
如需长期稳定访问，可注册隧道服务的账号或购买云服务器部署。
