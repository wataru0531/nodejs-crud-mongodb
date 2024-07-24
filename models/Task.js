
// Task ... モデルの場合は最初の文字は大文字にする

// Mongoose
// https://mongoosejs.com/


const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema({
  // idはMongoDBで自動で振られるので記述する必要はない

  name: {
    type: String,
    required: [
      true, // このフィールドが必須である
      "タスク名を入れてください" // カスタムエラーメッセージ
    ],
    trim: true,
    maxLength: [20, "タスク名は20文字以内で入力してください"]
  },
  memo: {
    type: String,
    required: [true, "メモを記入してください"],
    // trim ... 文字列の前後の空白文字(スペース、タブ、改行など)を削除するが、
    //          文字列の中間にある改行やその他の空白文字はそのままにする
    trim: true,
    maxLength: [300, "メモは300文字以内で記入してください"]
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

// module.exports = mongoose.model("Task", TaskSchema);
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;