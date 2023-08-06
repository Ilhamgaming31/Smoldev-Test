```javascript
const fileExtensions = [".ckpt", ".safetensors", ".pt", ".yaml"];
const targetHrefSubstring = "/resolve/";

function scanPageForLinks() {
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.href.includes(targetHrefSubstring) && fileExtensions.some(ext => link.href.endsWith(ext))) {
            addLinkButton(link);
        }
    });
}

function addLinkButton(link) {
    const button = document.createElement('button');
    button.id = 'addLinkButton';
    button.textContent = '+';
    button.addEventListener('click', () => storeLink(link));
    link.parentNode.insertBefore(button, link);
}

function storeLink(link) {
    const linkData = {
        href: link.href,
        source: 'Hugging Face'
    };
    chrome.runtime.sendMessage({ type: 'ADD_LINK', data: linkData });
}

window.addEventListener('load', scanPageForLinks);
```
This script scans the Hugging Face website for links that contain the "/resolve/" substring and end with one of the specified file extensions. It adds a "+" button before each of these links, and clicking the button sends a message to the background script to store the link.