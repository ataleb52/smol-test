```javascript
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ userComment: [] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'newComment') {
    chrome.storage.sync.get('userComment', (data) => {
      let comments = data.userComment;
      comments.push(request.data);
      chrome.storage.sync.set({ userComment: comments }, () => {
        sendResponse({ status: 'Comment added successfully' });
      });
    });
    return true;
  }
});

function addComment(comment) {
  chrome.storage.sync.get('userComment', (data) => {
    let comments = data.userComment;
    comments.push(comment);
    chrome.storage.sync.set({ userComment: comments });
  });
}
```