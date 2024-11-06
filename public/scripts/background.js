const welcomePage = '/index.html';
// const basUrl = 'http://139.9.228.139:31188';

function getStorageData(keys) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(keys, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
}
async function fetchData(url, method, prams) {
  let newUrl = url;
  if (method == 'GET') {
    newUrl = `${url}?${new URLSearchParams(prams)}`;
  }
  try {
    const { basUrl } = await getStorageData(['basUrl']);
    const response = await fetch(`${basUrl}${newUrl}`, {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: method == 'GET' ? undefined : JSON.stringify(prams),
    });
    if (!response.ok) {
      let result = await response.json();
      throw new Error(`${result.error.message}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`请求失败: ${error.message}`);
  }
}
function init() {
  let settingInfo = {
    enable: true,
    maxStudyTime: 90,
    disposeDelay: 10,
    product: [],
  };
  chrome.storage?.local.set({ settingInfo }, () => {});
}
function sendPanelData(msg, type) {
  chrome.storage.session.set({ webinfo: msg });
  chrome.runtime.sendMessage({
    type: 'FROM_BACKGROUND_' + type.toUpperCase(),
    msg: msg,
  });
}
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setOptions({ path: welcomePage });
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  init();
});
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    sendPanelData(
      {
        title: tab.title,
        url: tab.url,
      },
      'webinfo',
    );
  });
  chrome.storage.local.get('settingInfo', function (result) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'FROM_BACKGROUND_SETINFO',
        msg: result['settingInfo'],
      });
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url?.startsWith('chrome://')) return undefined;
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['scripts/injectScript.js'],
    });
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details && details.method === 'POST') {
      const rawData = details.requestBody.raw[0].bytes;
      const decoder = new TextDecoder('utf-8');
      const decodedString = decoder.decode(rawData);
      try {
        const jsonData = JSON.parse(decodedString);
        // fetchData('/api/v1/webAction', 'POST', jsonData).then((res) => {
        //   console.log(res);
        // });
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    }
  },
  {
    urls: ['https://console.tensorsecurity.cn/*'],
  },
  ['requestBody'],
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FROM_CONTENT_WEBINFO') {
    let info = JSON.parse(request.msg);
    sendPanelData(info, 'webinfo');
    sendResponse();
  } else if (request.type === 'FROM_CONTENT_IP') {
    fetchData('/api/v1/ip/' + request.msg)
      .then((res) => {
        sendResponse({
          type: 'FROM_CONTENT_IP',
          msg: Object.assign({ ip: request.msg }, res.data.item),
        });
      })
      .catch((error) => {
        sendResponse({ type: 'FROM_CONTENT_IP', error: error.message });
      });
    return true;
  } else if (request.type === 'FROM_PAGE_GETPLUGCONFIG') {
    let key = request.key || 'settingInfo';
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) {
        sendResponse({
          type: 'FROM_PAGE_GETPLUGCONFIG',
          error: chrome.runtime.lastError,
        });
        return;
      }
      sendResponse({ type: 'FROM_PAGE_GETPLUGCONFIG', value: result[key] });
    });
    return true;
  }
});
