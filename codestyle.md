# 前端代码规范（codestyle.md）

本项目前端代码规范主要参考 **Google HTML/CSS Style Guide** 和 **Airbnb JavaScript Style Guide**。

- Google HTML/CSS Style Guide：https://google.github.io/styleguide/htmlcssguide.html
- Airbnb JavaScript Style Guide：https://github.com/airbnb/javascript

以下为本项目遵循的主要规范。

## 1. HTML 规范

1. 使用 `<!DOCTYPE html>` 声明。
2. 标签名、属性名全部小写。
3. 属性值使用双引号。
4. 标签正确嵌套、正确闭合。
5. 缩进使用 2 个空格。
6. 文件使用 UTF-8 编码，并声明 `<meta charset="UTF-8">`。

## 2. CSS 规范

1. 类名使用小写字母加中划线，例如 `history-buttons`。
2. 每个属性单独一行，缩进 2 个空格。
3. 属性冒号后面加一个空格。
4. 颜色、字体等公共样式尽量统一。
5. 样式集中写在独立的 css 文件中，不写内联样式。

## 3. JavaScript 规范

1. 变量名、函数名使用小驼峰，例如 `loadHistory`、`errorMsg`。
2. 语句结束加分号。
3. 字符串使用双引号。
4. 缩进使用 4 个空格。
5. 函数要有注释说明功能。
6. 不允许在前端计算表达式的结果，计算必须交给后端完成。
7. 所有网络请求都要有错误处理（catch），出错时给用户提示。
