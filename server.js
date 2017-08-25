const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Task = require('./api/models/todoListModel');
const bodyParser = require('body-parser');

/**
 * mongooseのインスタンスを指定のurlに接続する
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb', {
  useMongoClient: true,
});

/**
 * urlencodedボディ（application/x-www-form-urlencoded）のみを解析し、
 * Content-Typeヘッダーがtypeオプションと一致するリクエストのみを参照するミドルウェアを返す
 * ミドルウェアとは簡潔に説明するとrequest、response、nextを受け取る関数
 * このパーサは本体のUTF-8エンコーディングのみを受け入れ、gzipとdeflateエンコーディングの自動拡張をサポートする
 * 解析されたデータを含む新しいbodyオブジェクトは、ミドルウェア（すなわち、req.body）の後のrequestオブジェクトに移入される
 * このオブジェクトにはキーと値のペアが含まれる。値は文字列または配列（{extended: false}の場合）、
 * または任意のタイプ（{ extended: true }）になる
 */
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * jsonのみを解析し、Content-Typeヘッダーがtypeオプションと一致する要求のみを参照するミドルウェアを返す
 * このパーサは本体のUnicodeエンコーディングを受け入れ、gzipとdeflateエンコーディングの自動拡張をサポートする
 * 解析されたデータを含む新しいbodyオブジェクトは、ミドルウェア（すなわち、req.body）の後のrequestオブジェクトに移入される
 */
app.use(bodyParser.json());

const routes = require('./api/routes/todoListRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);