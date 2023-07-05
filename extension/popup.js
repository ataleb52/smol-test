```javascript
import { chatGPT } from './lib/chatgpt.js';
import { mapService } from './lib/maps.js';

document.addEventListener('DOMContentLoaded', function() {
    let commentInput = document.getElementById('commentInput');
    let estimateDisplay = document.getElementById('estimateDisplay');
    let mapDisplay = document.getElementById('mapDisplay');
    let optionsButton = document.getElementById('optionsButton');

    optionsButton.addEventListener('click', openOptions);

    commentInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            addComment(commentInput.value);
            commentInput.value = '';
        }
    });
});

function addComment(comment) {
    let userComment = { text: comment, timestamp: new Date().toISOString() };
    chrome.runtime.sendMessage({ type: 'newComment', data: userComment }, function(response) {
        if (response.success) {
            generateEstimate(userComment);
        }
    });
}

function generateEstimate(userComment) {
    chatGPT.generate(userComment.text, function(err, serviceEstimate) {
        if (err) {
            console.error(err);
        } else {
            estimateDisplay.textContent = serviceEstimate;
            chrome.runtime.sendMessage({ type: 'newEstimate', data: serviceEstimate });
            searchMap(serviceEstimate);
        }
    });
}

function searchMap(serviceEstimate) {
    mapService.search(serviceEstimate, function(err, mapUrl) {
        if (err) {
            console.error(err);
        } else {
            mapDisplay.src = mapUrl;
            chrome.runtime.sendMessage({ type: 'mapSearch', data: mapUrl });
        }
    });
}

function openOptions() {
    chrome.runtime.openOptionsPage();
}
```