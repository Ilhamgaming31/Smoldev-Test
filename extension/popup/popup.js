```javascript
document.addEventListener('DOMContentLoaded', function() {
    const saveLinksButton = document.getElementById('saveLinksButton');
    const loadLinksButton = document.getElementById('loadLinksButton');
    const clearLinksButton = document.getElementById('clearLinksButton');
    const saveNgrokButton = document.getElementById('saveNgrokButton');
    const loadNgrokButton = document.getElementById('loadNgrokButton');
    const customUrlsTextarea = document.getElementById('customUrlsTextarea');
    const ngrokInputField = document.getElementById('ngrokInputField');

    saveLinksButton.addEventListener('click', function() {
        const links = customUrlsTextarea.value.split('\n');
        chrome.runtime.sendMessage({type: 'SAVE_LINKS', data: links});
    });

    loadLinksButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'LOAD_LINKS'}, function(response) {
            customUrlsTextarea.value = response.data.join('\n');
        });
    });

    clearLinksButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'CLEAR_LINKS'});
        customUrlsTextarea.value = '';
    });

    saveNgrokButton.addEventListener('click', function() {
        const ngrokValue = ngrokInputField.value;
        chrome.runtime.sendMessage({type: 'SAVE_NGROK', data: ngrokValue});
    });

    loadNgrokButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({type: 'LOAD_NGROK'}, function(response) {
            ngrokInputField.value = response.data;
        });
    });
});
```