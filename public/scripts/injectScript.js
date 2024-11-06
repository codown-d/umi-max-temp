document.addEventListener('click', function (event) {
  console.log('Clicked element:', event.target);
  console.log('Click coordinates:', event.clientX, event.clientY);

  // 你可以在这里添加其他处理逻辑
});
// 监听所有 input 事件
document.addEventListener('input', function (event) {
  console.log('Input event on element:', event.target);
  console.log('Input value:', event.target.value);
});

// 监听所有 change 事件
document.addEventListener('change', function (event) {
  console.log('Change event on element:', event.target);
  console.log('Changed value:', event.target.value);
});

// 监听所有 keydown 事件
document.addEventListener('keydown', function (event) {
  console.log('Keydown event:', event.key);
});

// 监听所有 keyup 事件
document.addEventListener('keyup', function (event) {
  console.log('Keyup event:', event.key);
});

chrome.webNavigation.onCompleted.addListener(
  function (details) {
    console.log('Page loaded:', details.url);
    // 处理页面加载完成的逻辑，例如上报事件
  },
  { url: [{ urlMatches: '.*' }] },
); // 监听所有 URL

// 监听页面前进或后退
chrome.webNavigation.onHistoryStateUpdated.addListener(
  function (details) {
    console.log('History state updated:', details.url);
    // 处理历史状态更新的逻辑，例如上报事件
  },
  { url: [{ urlMatches: '.*' }] },
);

document.addEventListener('selectionchange', function () {
  const selection = window.getSelection();
  if (selection.toString().trim()) {
    const selectedText = selection.toString();
    console.log('Selected text:', selectedText);
  }
});
