const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");

const router = require("./router");

require("./model");

const app = express();
const port = process.env.PORT || 3000;

//日志输出
app.use(morgan("dev"));
//跨域请求
app.use(cors());
// 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 挂载路由
app.use("/api", router);

// 统一异常处理中间件
app.use(errorHandler());

app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
