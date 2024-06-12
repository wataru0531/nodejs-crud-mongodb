
// アルゴリズム専用のファイル

// MongoDB  https://www.mongodb.com/ja-jp
// Mongoose https://mongoosejs.com/docs/guide.html


const Task = require("../models/Task.js");

// http://localhost:8000/api/v1/tasks

// 前取得
const getAllTasks = async (req, res) => {
  // res.send("タスクを全て取得しました");

  try{
    const allTask = await Task.find({});

    // サーバー側でres.jsonメソッドを使用することで、
    // JavaScriptオブジェクトを自動的にJSON文字列にシリアライズし、
    // HTTPレスポンスとしてクライアントに送信している
    return res.status(200).json(allTask)

  } catch(error) {
    res.status.json(error);
  }
}

// 新規追加
const createTask = async (req, res) => {
  // res.send("タスクを新規作成");

  try{
    const createTask = await Task.create(req.body);

    return res.status(200).json(createTask);

  } catch(error) {
    // console.log(error);
    return res.status(500).json({error});
  }
  
}

// 特定のタスクを取得
const getSingleTask = async (req, res) => {
  // res.send(`ある特定のタスク(id: ${req.params.id})を取得しました。`)
  // console.log(req);
  // console.log(req.params.id);

  try{
    const singleTask = await Task.findOne({ _id: req.params.id });
    // console.log(singleTask)

    // TODO エラーハンドリングがうまくいかない ... 
    // if(!singleTask) {
    //   return res.status(404).json(`_id: ${req.params.id}は存在しません`);
    // }
    // return res.status(200).json(singleTask);
    return res.status(200).json({ message: "タスク取得に成功", singleTask });

  } catch(error){
    return res.status(500).json(error);
  }
}

// 更新
const updateTask = async (req, res) => {
  // res.send(`ある特定のタスク(id: ${req.params.id})を更新しました。`);

  try{

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { 
        new: true,  // 更新後のドキュメントを返すようにする
        // runValidators: true // 更新時にバリデーションを実行
      }
    )

    if(!updateTask) res.status(404).json({ message: `_id: ${req.params.id}は存在しません` });

    return res.status(200).json(updatedTask);
  } catch(error){
    res.status(500).json(error);
  }
}

// 削除
const deleteTask = (req, res) => {
  res.send(`ある特定のタスク(id: ${req.params.id})を削除しました。`);
}

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
}