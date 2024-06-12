const express = require("express");

const taskRoute = require("./routes/tasks"); // tasksのルーター
const connectDB = require("./db/connect");

// 環境変数を読み込むための設定 .envを使えるようにする
// config() ... .envファイルの内容を読み込み、環境変数として設定
require("dotenv").config();

const app = express();

// use ミドルウェア
// json形式を内部で対応できる
app.use(express.json());

const PORT = 8000;

// tasksのルーティング設計
// http://localhost:8000/
// v1 → バージョンのこと
// バージョン2などを作る際に既存のapiを壊さずに済む
// /api/tasks とすると、新バージョンのapiにアップデータする時にtasks以外の名前をつけな
// ければならず管理が難しくなってしまう
app.use("/api/v1/tasks", taskRoute);

// データベースと接続、サーバー起動
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL); // mongoDBと接続

    // サーバー立ち上げ
    app.listen(PORT, () =>
      console.log("サーバーが起動しました。", `http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log("データベース接続失敗", error);
  }
};

start();
