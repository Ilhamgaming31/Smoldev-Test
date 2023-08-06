```javascript
let storedLinks = [];
let ngrokValue = '';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case 'ADD_LINK':
      storedLinks.push(request.link);
      break;
    case 'LOAD_LINKS':
      sendResponse({ links: storedLinks });
      break;
    case 'SAVE_LINKS':
      storedLinks = request.links;
      localStorage.setItem('nocrypt-qol', JSON.stringify(storedLinks));
      break;
    case 'CLEAR_LINKS':
      storedLinks = [];
      localStorage.removeItem('nocrypt-qol');
      break;
    case 'LOAD_NGROK':
      sendResponse({ ngrok: ngrokValue });
      break;
    case 'SAVE_NGROK':
      ngrokValue = request.ngrok;
      localStorage.setItem('nocrypt-ngrok', ngrokValue);
      break;
    default:
      console.error('Unrecognised message: ', request.message);
  }
});

// Load stored links and ngrok value from local storage on startup
storedLinks = JSON.parse(localStorage.getItem('nocrypt-qol')) || [];
ngrokValue = localStorage.getItem('nocrypt-ngrok') || '';
```