
/**************************************************************
編集ページのJS
***************************************************************/

// TODO
// editページに最初から入る場合はindex.htmlにリダイレクト

// URLパラメータ(クエリパラメータとも呼ばれるreru)
// URL の末尾に ? から始まる部分で、キーと値のペアで記述。
// これにより、サーバーに追加のデータを渡すことが可能。
// 例　https://example.com/?id=6671a2a03837103c807c07a7&name=JohnDoe

// URLSearchParams
// → URL のクエリパラメータを操作するための Web API 
//   クエリ文字列を解析し、キーと値のペアを管理するデータ構造を使用して、パラメータの操作を効率的に行う。
//   追加、削除、取得などを簡単に行うための便利なインターフェースを提供


const ENDPOINT = "http://localhost:8000/api/v1/tasks";

const editFormDOM = document.getElementById("js-single-task-form");
const taskIdDOM = document.getElementById("js-task-edit-id");
const taskNameDOM = document.querySelector(".js-task-edit-name");
const taskMemoDOM = document.querySelector(".js-task-edit-memo")
const alertDOM = document.getElementById("js-form-alert");
const taskCompletedDOM = document.getElementById("js-task-edit-completed");


window.addEventListener("DOMContentLoaded", init);

// 初期化処理
function init(){
  // 編集するとき以外でedit.htmlに遷移してしまったとき
  // → index.htmlにリダイレクト
  const taskId = getTaskId();

  if(!taskId){
    window.location.href = "../index.html";

  } else {
    showTask();

  }
}

// 特定のページのIdを取得する関数
function getTaskId(){
  // console.log(window.location); // Location {ancestorOrigins: DOMStringList, href: 'http://localhost:8000/edit/index.html?id=6672e6e2ef854b7df4c9946f', origin: 'http://localhost:8000', protocol: 'http:', host: 'localhost:8000', …}

  const params = window.location.search;
  // console.log(params); // ?id=6671a2a03837103c807c07a7
  // console.log(search);

  const id = new URLSearchParams(params).get("id");
  // console.log(id); // 6671a2a03837103c807c07a7

  return id;
}


// タスクを表示する処理
async function showTask () {
  try{
    const taskId = getTaskId();

    // バックエンド側のgetSingleTask()が発火してsingleTaskが変える
    const { data: { singleTask } } = await axios.get(`${ENDPOINT}/${taskId}`);
    // console.log(data); // {message: 'タスク取得に成功', singleTask: {…}}
    // → dataオブジェクトを分割代入で取得し、さらにその中のsingleTaskオブジェクトを分割代入で取得
    // console.log(singleTask) // {message: 'タスク取得に成功', singleTask: {…}}
    
    const { _id, name, memo, completed } = singleTask;
    // console.log(_id, name, completed)

    taskIdDOM.textContent = _id;
    taskNameDOM.value = name;
    taskMemoDOM.value = memo;
    taskCompletedDOM.checked = completed;

  }catch(error){

    console.log(`Taskの取得に失敗しました。`, error);
  }
}


// タスクの編集
editFormDOM.addEventListener("submit", async (e) => {
  e.preventDefault();

  const taskId = getTaskId(); // urlパラメータからidを取得
  const taskName = taskNameDOM.value;
  const taskMemo = taskMemoDOM.value;
  const taskCompleted = taskCompletedDOM.checked;
  // console.log(taskCompleted)

  try {
    const { data: { updatedTask, message } } = await axios.patch(
      `${ENDPOINT}/${taskId}`,
      { // 編集する内容
        name: taskName, 
        memo: taskMemo,
        completed: taskCompleted,
      }
    );
    // console.log(updatedTask, message);

    const { name, memo, completed } = updatedTask;  // 返り値

    taskNameDOM.value = name;
    taskMemoDOM.value = memo;
    taskCompletedDOM.checked = completed;
    
    alertDOM.innerText = message;
    alertDOM.classList.add("text-success");

    setTimeout(() => {
      alertDOM.innerText = "";
      alertDOM.classList.remove("text-success");
    }, 1500)

    
  } catch(error){
    console.log(`タスクの編集に失敗しました。`, error);
  }


})