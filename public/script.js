/**************************************************************

gsap easings  https://gsap.com/docs/v3/Eases/

***************************************************************/
// "数値" 指定時間後にトゥイーン。タイムラインの先頭からの時間（秒）で開始
// "+=1"  直前のトゥイーンの終了後に何秒だけ離すか delay: 1 と同じ
// "-=1"  直前のトゥイーンの終了に何秒だけ重ねるか delay: -1　と同じ

// ">"    直前のトゥイーンの終了時
// ">3"   直前のトゥイーンの終了後に何秒だけ離すか。3秒後にトゥイーンする
// "<"    直前のトゥイーンの開始時
// "<4"   直前のトゥイーンの開始時の何秒後か。4秒後にトゥイーン

// "ラベル名"  指定したラベルと同じタイミングでトゥイーン
// "ラベル名 += 数値"
// "ラベル名 -= 数値"

// stagger... each   ... デフォルト、1つ１つの要素に効く
//            amount ... 全体で何秒か

// console.log(axios);

const ENDPOINT = "http://localhost:8000/api/v1/tasks";

const taskDOM = document.getElementById("js-task");
const formDOM = document.getElementById("js-form");
const inputDOM = document.querySelector(".js-task-input");
const textareaDOM = document.querySelector(".js-textarea");
const formAlertDOM = document.getElementById("js-form-alert");


window.addEventListener("DOMContentLoaded", init);

function init(){
    if(taskDOM){
      showTask(); // タスク内を一度作書 → 前取得 → 表示

    }
}

// ダークモード
const mode = document.getElementById("js-mode");

let darkMode = false;

mode.addEventListener("click", () => {
  darkMode = !darkMode;

  if(darkMode){  // ダークモード

    // console.log(document.documentElement) // <html><head></head><body></body></html>
    // setProperty ... プロパティ、値を渡すことでJS側からCSSを変更
    document.documentElement.style.setProperty("--textColor", "#f2f4f8");
    document.documentElement.style.setProperty("--backgroundColor", "#161616");
    document.documentElement.style.setProperty("--form-backGroundColor", "#161616");
    document.documentElement.style.setProperty("--singleTask-backGroundColor", "#161616");
    document.documentElement.style.setProperty("--input-backGroundColor", "#161616");
    document.documentElement.style.setProperty("--input-text-color", "#ffffff");
    document.documentElement.style.setProperty("--input-borderColor", "#f2f4f8");
    
  } else { // 通常モード
    document.documentElement.style.setProperty("--textColor", "#161616");
    document.documentElement.style.setProperty("--backgroundColor", "#f2f4f8");
    document.documentElement.style.setProperty("--form-backGroundColor", "#ffffff");
    document.documentElement.style.setProperty("--singleTask-backGroundColor", "#ffffff");
    document.documentElement.style.setProperty("--input-backGroundColor", "#ffffff");
    document.documentElement.style.setProperty("--input-text-color", "#161616");
    document.documentElement.style.setProperty("--input-borderColor", "#00000029")
  }


})


/**************************************************************
// タスク内を一度削除 → 前取得 → 表示
***************************************************************/

async function showTask(){
  taskDOM.innerHTML = ""; // 一度初期化

  // axios
  // → HTTP GET リクエストを送信し、その結果としてプロミスを解決し値を返す。
  const { data: tasks } = await axios.get(ENDPOINT);
  // console.log(tasks); // (3) [{…}, {…}, {…}]
  
  if(tasks.length === 0){ // タスクがない時の処理
    const noTaskMessage = document.createElement("h5");
    noTaskMessage.classList.add("empty-list");
    noTaskMessage.textContent = "タスクがありません";

    taskDOM.appendChild(noTaskMessage);

  } else { // タスクがある場合の処理
    tasks.forEach(task => {
      // console.log(task);
      const { _id, name, memo, completed } = task;
    
      // const singleTask = generateSingleTask(name, _id, completed);
      // console.log(singleTask)
      // taskDOM.appendChild(singleTask);

      const singleTaskTemplate = generateSingleTaskTemplate(name, memo, _id, completed);
      // console.log(singleTaskTemplate);

      // innerHTML = singleTaskTemplate; とすると上書きされてしまうので1つしか入れない
      taskDOM.innerHTML += singleTaskTemplate;
    
      // appendChildはDOMを挿入するメソッドなので文字列は扱えない
      // innerHTMLは内部で、toString()が発火されるので文字列を挿入
      // → オブジェクトを素運輸した場合はオブジェクトの型情報を表す文字列が返されて
      // 　ブラウザに表示される
      // taskDOM.innerHTML = singleTask; // HTMLに挿入
    
      // element.insertAdjacentHTML("位置", dom要素);
      // 位置 beforebegin ... element.の直前
          // afterbegin  ... elementの開始タグ直後
          // beforeend   ... elementの終了タグ直前
          // afterend    ... elementの直後
      // taskDOM.insertAdjacentHTML("afterbegin", singleTask);
    
    });
  }
}

function generateSingleTaskTemplate(_name, _memo, _id, _completed){
  const singleTask =  `
    <div class="single-task ${_completed ? "task-completed" : ""}">
      <div class="single-task__block">
        <h2>
          <span class="material-symbols-outlined check">check_circle</span>
          ${_name}
        </h2>

        <div class="task-links">

          <a href="./edit/index.html?id=${_id}" class="edit-link">
            <span class="material-symbols-outlined">edit</span>
          </a>

          <button class="delete-btn" data-id="${_id}">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
      <div class="single-task__description">${_memo}</div>
    </div> 
  `;

  return singleTask;
}

// singleTaskを生成する関数 domを手書き。
// あまりパフォーマンスがよくないらしい
function generateSingleTask(_name, _id, _completed){
  const singleTask = document.createElement("div");
  singleTask.className = `single-task ${_completed ? "task-completed" : ""}`;

  const h2 = document.createElement("h2");
  const span = document.createElement("span");
  span.innerText = "check_circle";
  span.className = "material-symbols-outlined check";
  h2.append(span, _name);

  const taskLinks = document.createElement("div");
  taskLinks.className = "task-links";

  const editLink = document.createElement("a"); // 編集
  editLink.className = "edit-link";
  editLink.href = `./edit/index.html?id=${_id}`; // クエリパラメーターとしてidを付与
  const editLinkSpan = document.createElement("span");
  editLinkSpan.innerText = "edit";
  editLinkSpan.className = "material-symbols-outlined";
  editLink.appendChild(editLinkSpan);

  // クエリパラメーター
  // → URLの一部であり、ウェブリクエストに追加の情報を提供するために使用される
  //   通常、クエリパラメーターは、?の後にキーと値のペアとして追加され、
  // 複数のパラメーターは & で区切られる
  // 例 http://example.com/page?param1=value1&param2=value2

  const deleteBtn = document.createElement("button"); // 削除ボタン
  deleteBtn.className = "delete-btn";
  deleteBtn.setAttribute("data-id", _id); // data属性を追加
  const deleteBtnSpan = document.createElement("span");
  deleteBtnSpan.innerText = "delete"
  deleteBtnSpan.className = "material-symbols-outlined";
  deleteBtn.appendChild(deleteBtnSpan);

  taskLinks.append(editLink, deleteBtn);

  singleTask.append(h2, taskLinks);

  return singleTask;
}



// Promiseを使った場合の処理
// const getAllTasks = async () => {
//   try{
//     
//     return new Promise((resolve, reject) => {
//       // ここのコールバック内で非同期処理
//       fetch(ENDPOINT)
//         .then((response) => {
//           // console.log(response); // esponse {type: 'basic', url: 'http://localhost:8000/api/v1/tasks', redirected: false, status: 200, ok: true, …}

//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json(); // ここではプロミスオブジェクトを返す。次のthenの引数に
//         })
//         .then(data => {
//           // このdataには解決された値が渡ってくる
//           // console.log(data);
//           resolve(data); // ここで解決
//         })
//         .catch(error => {
//           console.log('タスクの取得に失敗しました。', error);
//           reject(error);
//         });
//     });

//   } catch(error) {
//     console.log(`タスクの取得に失敗しました。`, error)
//   }
// }

// const tasks = await getAllTasks();
// // console.log(allTasks)

// const allTasks = [];

// tasks.map(task => {
//   // console.log(task);
//   const { _id, name, completed } = task;

//   // const singleTask = generateSingleTask(name);
//   // taskDOM.appendChild(singleTask);


//   // テンプレート文字列 → 文字列扱い
//   const singleTask =  `
//     <div class="single-task">
//       <h2>
//         <span class="material-symbols-outlined check">check_circle</span>
//         ${name}
//       </h2>
//       <div class="task-links">
//         <a href="" class="edit-link">
//           <span class="material-symbols-outlined">edit</span>
//         </a>

//         <button class="delete-btn">
//           <span class="material-symbols-outlined">delete</span>
//         </button>
//       </div>
//     </div> 
//   `;

//   // appendChildはDOMを挿入するメソッドなので文字列は扱えない
//   // taskDOM.innerHTML = singleTask; // HTMLに挿入

//   // element.insertAdjacentHTML("位置", dom要素);
//   // 位置 beforebegin ... element.の直前
//       // afterbegin  ... elementの開始タグ直後
//       // beforeend   ... elementの終了タグ直前
//       // afterend    ... elementの直後
//   taskDOM.insertAdjacentHTML("afterbegin", singleTask);

//   allTasks.push(singleTask); // 一応配列に持っておく
// })

// console.log(allTasks)



/**************************************************************
タスクを追加する処理
***************************************************************/

if(formDOM){
  formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = inputDOM.value;
    const memo = textareaDOM.value;
    // console.log(name, memo)

    try{
      // 分割代入から、dataオブジェクトからmessageプロパティを取得
      const { data: { message } } = await axios.post(ENDPOINT, { 
        name: name,
        memo, memo,
      });
      // console.log(message)

      inputDOM.value = "";
      textareaDOM.value = "";

      showTask(); // タスクを表示させる。リアルタイム更新

      formAlertDOM.style.display = "block";
      formAlertDOM.innerHTML = message;
      formAlertDOM.classList.add("text-success");

      setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
      }, 1500)

    } catch(error) {
      console.log(`フォームの送信に失敗しました。`, error);

      inputDOM.value = "";
      textareaDOM.value = "";

      formAlertDOM.style.display = "block";

      // name, memoの両方が入力されていなかった時
      if(error.response.data.error.errors.name && error.response.data.error.errors.memo) {
        
        formAlertDOM.innerHTML = `
          ${error.response.data.error.errors.name.message}<br>
          ${error.response.data.error.errors.memo.message},
        `
      } else if(error.response.data.error.errors.name){ // タスク名のみ
        formAlertDOM.innerHTML = error.response.data.error.errors.name.message;

      } else if(error.response.data.error.errors.memo) { // メモのみ
        formAlertDOM.innerHTML = error.response.data.error.errors.memo.message;

      }

      setTimeout(() => {
        formAlertDOM.style.display = "none";
      }, 1500);
    }

  });
}

/**************************************************************
削除
***************************************************************/
// TODO ... taskDOMにイベントを付与ではなくて、delete-btnに付与した
//          方がいいのでは？

if(taskDOM){
  taskDOM.addEventListener("click", async (e) => {
    // console.log(e)

    // taskDOM内の要素をクリックするとその要素を取得できる
    const element = e.target;
    // console.log(element.parentNode);

    if(element.parentNode.classList.contains("delete-btn")){
      // console.log("delete-btn");

      // 参照方法 → getAttribute、dataset
      // datasetの場合 ... data-」を抜かして参照
      // → data-id="" の場合、dataset.id で参照可能
      // const _id = element.parentNode.dataset.id;
      const _id = element.parentNode.getAttribute("data-id");
      // console.log(_id)
      
      try{
        await axios.delete(`${ENDPOINT}/${_id}`);

        showTask();

      } catch(error) {
        console.log(`タスクの削除に失敗しました。`, error);
      }

    }

  })
}