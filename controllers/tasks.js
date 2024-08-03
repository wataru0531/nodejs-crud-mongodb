
// アルゴリズム専用のファイル

// MongoDB  https://www.mongodb.com/ja-jp
// Mongoose https://mongoosejs.com/docs/guide.html


const Task = require("../models/Task.js");

// http://localhost:8000/api/v1/tasks

// 前取得
const getAllTasks = async (req, res) => {
  // res.send("タスクを全て取得しました");

  try{
    const allTasks = await Task.find({});
    console.log(allTasks)

    // サーバー側でres.jsonメソッドを使用することで、
    // JavaScriptオブジェクトを自動的にJSON文字列にシリアライズし、
    // HTTPレスポンスとしてクライアントに送信している
    return res.status(200).json({ message: "すべてのタスクを取得しました。", allTasks: allTasks })

  } catch(error) {
    res.status.json(error);
  }
}

// 新規追加
const createTask = async (req, res) => {
  // res.send("タスクを新規作成");

  // 20文字以上超えた場合の処理
  const { name, memo } = req.body;
  // console.log(name);

  if(name.length > 20){
    return res.status(400).json({ error: "名前は20文字以内で入力してください" })
  }

  if(memo.length > 300){
    return res.status(400).json({ error: "メモは300文字以内で入力してください" })
  }

  try{
    const createTask = await Task.create(req.body);

    // return res.status(200).json(createTask);
    return res.status(200).json({
      task: createTask, 
      message: "タスクの追加に成功しました。"
    });

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
      req.body, // 更新したい内容
      { 
        new: true,  // 更新後のドキュメントを返すようにする
        // runValidators: true // 更新時にバリデーションを実行
      }
    )

    if(!updateTask) res.status(404).json({ message: `_id: ${req.params.id}は存在しません` });

    return res.status(200).json({ message: "タスクの編集に成功しました。", updatedTask: updatedTask });
  } catch(error){
    res.status(500).json(error);
  }
}

// 削除
const deleteTask = async (req, res) => {
  // res.send(`ある特定のタスク(id: ${req.params.id})を削除しました。`);

  try{
    const deleteTask = await Task.findOneAndDelete({ _id: req.params.id });

    if(!deleteTask) {
      return res.status(404).json({ message: `_id: ${req.params.id}の削除に失敗しました。` })
    }

    return res.status(200).json({message: "タスクの削除に成功しました", deleteTask: deleteTask});
  }catch(error){
    res.status(500).json({ message: "削除に失敗しました", error: error})
  }
}

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
}