function previewHTML() {
    const htmlCode = document.getElementById('htmlInput').value;
    const iframe = document.getElementById('previewFrame');
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    // Default CSS for the iframe content
    const defaultCSS = `
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: white; /* Default background color */
                color: black; /* Default text color for visibility */
            }
        </style>
    `;

    // Ensure the iframe content has the default styles and user HTML
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            ${defaultCSS}
        </head>
        <body>${htmlCode}</body>
        </html>
    `);
    doc.close();
}

function clearHTML() {
    document.getElementById('htmlInput').value = '';
    const iframe = document.getElementById('previewFrame');
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    const body = doc.body;

    // Remove all child elements and clear inline styles
    while (body.firstChild) {
        body.removeChild(body.firstChild);
    }
    body.style = ''; // Clear any inline styles
}

function downloadHTML() {
    const htmlCode = document.getElementById('htmlInput').value;
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Live update feature
function enableLiveUpdate() {
    const liveUpdateSwitch = document.getElementById('liveUpdateSwitch');
    const textarea = document.getElementById('htmlInput');

    if (liveUpdateSwitch.checked) {
        textarea.addEventListener('input', previewHTML);
    } else {
        textarea.removeEventListener('input', previewHTML);
    }
}

// Initialize the live update feature
document.getElementById('liveUpdateSwitch').addEventListener('change', enableLiveUpdate);

// Initial call to setup live update based on switch state
enableLiveUpdate();
