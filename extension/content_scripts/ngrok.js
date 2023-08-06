```javascript
let ngrokValue = '';

function addNgrokButtons() {
    const ngrokInput = document.getElementById('ngrokInputField');
    if (!ngrokInput) return;

    const loadButton = document.createElement('button');
    loadButton.id = 'loadNgrokButton';
    loadButton.textContent = 'Load';
    loadButton.addEventListener('click', loadNgrokValue);

    const saveButton = document.createElement('button');
    saveButton.id = 'saveNgrokButton';
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', saveNgrokValue);

    ngrokInput.parentNode.insertBefore(loadButton, ngrokInput.nextSibling);
    ngrokInput.parentNode.insertBefore(saveButton, loadButton.nextSibling);
}

function loadNgrokValue() {
    chrome.storage.local.get('ngrokValue', function(data) {
        ngrokValue = data.ngrokValue || '';
        document.getElementById('ngrokInputField').value = ngrokValue;
    });
}

function saveNgrokValue() {
    ngrokValue = document.getElementById('ngrokInputField').value;
    chrome.storage.local.set({ ngrokValue: ngrokValue });
}

window.addEventListener('load', addNgrokButtons);
```