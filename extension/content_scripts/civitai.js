```javascript
// CivitAI content script

// Shared variables
let storedLinks = [];

// Function to scan the page for links
function scanPageForLinks() {
    let links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.href.includes('/api/download/')) {
            addLinkButton(link);
        }
    });
}

// Function to add a "+" button before a link
function addLinkButton(link) {
    let button = document.createElement('button');
    button.id = 'addLinkButton';
    button.textContent = '+';
    button.addEventListener('click', () => storeLink(link));
    link.parentNode.insertBefore(button, link);
}

// Function to store a link
function storeLink(link) {
    let linkObj = {
        href: link.href,
        source: 'CivitAI'
    };
    storedLinks.push(linkObj);
    // Send message to background script
    chrome.runtime.sendMessage({type: 'ADD_LINK', data: linkObj});
}

// Run the script when the page is loaded
window.addEventListener('load', scanPageForLinks);
```