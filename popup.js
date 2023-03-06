window.onload = function() {
  // ボタンの要素を取得
  var button = document.getElementById("sort-button");
  // ボタンがクリックされたら、バックグラウンドにメッセージを送る
  button.onclick = function() {
    chrome.runtime.sendMessage({action: "sort-tabs"});
  };
};