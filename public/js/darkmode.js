

// ダークモード

export function darkMode(){
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
      document.documentElement.style.setProperty("--task-backGroundColor", "#161616");
      document.documentElement.style.setProperty("--input-backGroundColor", "#161616");
      document.documentElement.style.setProperty("--input-text-color", "#ffffff");
      document.documentElement.style.setProperty("--input-borderColor", "#f2f4f8");
      
    } else { // 通常モード
      document.documentElement.style.setProperty("--textColor", "#161616");
      document.documentElement.style.setProperty("--backgroundColor", "#f2f4f8");
      document.documentElement.style.setProperty("--form-backGroundColor", "#ffffff");
      document.documentElement.style.setProperty("--task-backGroundColor", "#ffffff");
      document.documentElement.style.setProperty("--input-backGroundColor", "#ffffff");
      document.documentElement.style.setProperty("--input-text-color", "#161616");
      document.documentElement.style.setProperty("--input-borderColor", "#00000029");
    }


  });
}



