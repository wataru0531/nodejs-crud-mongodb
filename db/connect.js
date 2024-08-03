
// mongoose
// → クライアント(Node.jsアプリケーション)とMongoDBデータベースを接続するためライブラリ

const mongoose = require("mongoose");

const connectDB = (url) => {
  
  return mongoose.connect(url)
  .then(() => console.log("データベースと接続中"))
  .catch((error) => console.log(error));
  
}

module.exports = connectDB;