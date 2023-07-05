```javascript
class MapService {
    constructor() {
        this.apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
    }

    searchMap(serviceType) {
        const url = `https://www.google.com/maps/search/?api=1&query=${serviceType}`;
        return url;
    }
}

const mapService = new MapService();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'mapSearch') {
        const url = mapService.searchMap(request.serviceType);
        sendResponse({url: url});
    }
});
```