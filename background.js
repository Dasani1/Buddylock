chrome.action.onClicked.addListener(() => { //opens the website when you click on the extension icon
    chrome.tabs.create({
      url: chrome.runtime.getURL("Index.html") 
    });
  });