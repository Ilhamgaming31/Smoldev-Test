```javascript
const customUrlsTextareaId = 'customUrlsTextarea';
const saveLinksButtonId = 'saveLinksButton';
const loadLinksButtonId = 'loadLinksButton';
const clearLinksButtonId = 'clearLinksButton';
const ngrokInputFieldId = 'ngrokInputField';
const loadNgrokButtonId = 'loadNgrokButton';
const saveNgrokButtonId = 'saveNgrokButton';

function modifyColabInputField() {
    const customUrlsInput = document.querySelector('input[name="custom-urls"]');
    if (customUrlsInput) {
        const textarea = document.createElement('textarea');
        textarea.id = customUrlsTextareaId;
        textarea.style = 'background: #000; color: #00f; border-radius: 5px; resize: vertical;';
        customUrlsInput.replaceWith(textarea);
    }
}

function addButtons() {
    const textarea = document.getElementById(customUrlsTextareaId);
    if (textarea) {
        const saveButton = document.createElement('button');
        saveButton.id = saveLinksButtonId;
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: 'SAVE_LINKS', links: textarea.value });
        });

        const loadButton = document.createElement('button');
        loadButton.id = loadLinksButtonId;
        loadButton.textContent = 'Load';
        loadButton.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: 'LOAD_LINKS' }, (response) => {
                textarea.value = response.links;
            });
        });

        const clearButton = document.createElement('button');
        clearButton.id = clearLinksButtonId;
        clearButton.textContent = 'Clear';
        clearButton.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: 'CLEAR_LINKS' });
            textarea.value = '';
        });

        textarea.after(clearButton, loadButton, saveButton);
    }
}

function modifyNgrokInputField() {
    const ngrokInput = document.querySelector('input[name="ngrok"]');
    if (ngrokInput) {
        ngrokInput.id = ngrokInputFieldId;

        const loadButton = document.createElement('button');
        loadButton.id = loadNgrokButtonId;
        loadButton.textContent = 'Load';
        loadButton.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: 'LOAD_NGROK' }, (response) => {
                ngrokInput.value = response.ngrokValue;
            });
        });

        const saveButton = document.createElement('button');
        saveButton.id = saveNgrokButtonId;
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
            chrome.runtime.sendMessage({ type: 'SAVE_NGROK', ngrokValue: ngrokInput.value });
        });

        ngrokInput.after(loadButton, saveButton);
    }
}

function enhanceColab() {
    modifyColabInputField();
    addButtons();
    modifyNgrokInputField();
}

enhanceColab();
```