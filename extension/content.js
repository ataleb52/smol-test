```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'newComment') {
        let userComment = request.data;
        chrome.storage.sync.set({[sender.tab.url]: userComment}, () => {
            console.log('Comment saved for this page');
        });
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.storage.sync.get([tab.url], (result) => {
            if (result[tab.url]) {
                chrome.tabs.sendMessage(tabId, {
                    type: 'displayComment',
                    data: result[tab.url]
                });
            }
        });
    }
});
```