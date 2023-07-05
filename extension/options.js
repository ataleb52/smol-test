```javascript
// Options page script

// DOM Elements
const commentInput = document.getElementById('commentInput');
const estimateDisplay = document.getElementById('estimateDisplay');
const mapDisplay = document.getElementById('mapDisplay');
const optionsButton = document.getElementById('optionsButton');

// Load options
function loadOptions() {
  chrome.storage.sync.get(['userComment', 'serviceEstimate'], function(items) {
    commentInput.value = items.userComment || '';
    estimateDisplay.textContent = items.serviceEstimate || '';
  });
}

// Save options
function saveOptions() {
  chrome.storage.sync.set({
    userComment: commentInput.value,
    serviceEstimate: estimateDisplay.textContent
  }, function() {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Event listeners
optionsButton.addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', loadOptions);
```