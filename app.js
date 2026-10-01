// 计算器前端脚本
// 前端只负责界面和交互，所有计算都通过 HTTP 请求交给后端完成

// 后端接口地址
var API_BASE = "http://localhost:8080/api";

// 获取页面元素
var display = document.getElementById("display");
var errorMsg = document.getElementById("errorMsg");
var historyBody = document.getElementById("historyBody");

// 按数字、运算符、括号按钮时，把字符加到显示框里
function press(ch) {
    display.value = display.value + ch;
    errorMsg.innerText = "";
}

// 删除最后一个字符
function clearOne() {
    display.value = display.value.slice(0, -1);
}

// 清空显示框
function clearAll() {
    display.value = "";
    errorMsg.innerText = "";
}

// 点击等号：把表达式发给后端计算
function calculate() {
    var expression = display.value;
    if (expression === "") {
        errorMsg.innerText = "请先输入表达式";
        return;
    }

    // 界面上显示的 × ÷ 换成后端用的 * /
    var sendExpression = expression.replace(/×/g, "*").replace(/÷/g, "/");

    fetch(API_BASE + "/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: sendExpression })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            if (data.success) {
                // 显示后端返回的结果
                display.value = data.result;
                errorMsg.innerText = "";
                // 计算成功后刷新历史记录
                loadHistory();
            } else {
                // 显示后端返回的错误信息（比如除零、表达式非法）
                errorMsg.innerText = data.message;
            }
        })
        .catch(function () {
            // 后端没启动或网络出错时会走到这里
            errorMsg.innerText = "无法连接后端服务器，请确认后端已启动";
        });
}

// 从后端获取历史记录并显示在表格里
function loadHistory() {
    fetch(API_BASE + "/history")
        .then(function (response) { return response.json(); })
        .then(function (data) {
            historyBody.innerHTML = "";
            if (!data.data || data.data.length === 0) {
                historyBody.innerHTML = "<tr><td colspan='4'>暂无历史记录</td></tr>";
                return;
            }
            for (var i = 0; i < data.data.length; i++) {
                var item = data.data[i];
                var row = document.createElement("tr");

                // createdAt 是后端传来的时间，把中间的 T 换成空格更好看
                var timeText = item.createdAt ? item.createdAt.replace("T", " ").substring(0, 19) : "";

                row.innerHTML =
                    "<td>" + item.expression + "</td>" +
                    "<td>" + item.result + "</td>" +
                    "<td>" + timeText + "</td>" +
                    "<td><button class='deleteBtn' onclick='deleteHistory(" + item.id + ")'>删除</button></td>";
                historyBody.appendChild(row);
            }
        })
        .catch(function () {
            historyBody.innerHTML = "<tr><td colspan='4'>无法连接后端服务器</td></tr>";
        });
}

// 删除指定 id 的历史记录
function deleteHistory(id) {
    fetch(API_BASE + "/history/" + id, { method: "DELETE" })
        .then(function (response) { return response.json(); })
        .then(function () {
            // 删除成功后重新查询最新的历史记录
            loadHistory();
        })
        .catch(function () {
            errorMsg.innerText = "无法连接后端服务器，请确认后端已启动";
        });
}

// 清空全部历史记录
function clearHistory() {
    if (!confirm("确定要清空全部历史记录吗？")) {
        return;
    }
    fetch(API_BASE + "/history", { method: "DELETE" })
        .then(function (response) { return response.json(); })
        .then(function () {
            loadHistory();
        })
        .catch(function () {
            errorMsg.innerText = "无法连接后端服务器，请确认后端已启动";
        });
}

// 页面打开时先加载一次历史记录
loadHistory();
