# 前后端分离计算器系统 —— 前端

## 项目简介

本仓库是前后端分离计算器系统的前端部分，是一个纯 HTML + CSS + JavaScript 的网页，负责界面展示和用户交互。所有计算都通过 HTTP 请求发送到后端完成，前端本身不做任何计算。

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

如果后端部署在其他地址，修改 `app.js` 开头的 `API_BASE` 变量即可。

## 前后端连接方式

前端通过 fetch 调用后端的 RESTful API：

| 操作 | 请求 |
| --- | --- |
| 计算 | POST /api/calculate |
| 查询历史 | GET /api/history |
| 删除一条历史 | DELETE /api/history/{id} |
| 清空历史 | DELETE /api/history |

界面上乘除号显示为 × ÷，发送给后端前会转换成 `*` `/`。
