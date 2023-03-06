chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action == "sort-tabs") {
    var targetWindowId = null;
    var tabCount = 0;

    function start(tab) {
      chrome.windows.getCurrent(getWindows);
    }

    function getWindows(win) {
      targetWindowId = win.id;
      chrome.tabs.query({}, getTabs);
    }

    function getTabs(tabs) {
      tabCount = tabs.length;
      // タブをソートして並び替える
      tabs.sort(function(a, b) {
        return a.url.split('/')[2].localeCompare(b.url.split('/')[2]);
      }).forEach(function(tab, i) {
        chrome.tabs.move(tab.id, {windowId: targetWindowId, index: i});
      });
      // すべてのタブが移動し終わったらウィンドウをアクティブにする
      chrome.windows.update(targetWindowId, {focused: true});
    }

    start();
  }
});