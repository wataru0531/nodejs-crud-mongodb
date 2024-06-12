
// Task ... モデルの場合は最初の文字は大文字にする

// Mongoose
// https://mongoosejs.com/


const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema({
  // idはMongoDBで自動で振られるので記述する必要はない

  name: {
    type: String,
    required: [true, " タスク名を入れてください"],
    trim: true,
    maxLength: [20, "タスク名は20文字以内で入力してください"]
  },
  completed: {
    type: Boolean,
    default: false,
  }
});

// module.exports = mongoose.model("Task", TaskSchema);
const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;