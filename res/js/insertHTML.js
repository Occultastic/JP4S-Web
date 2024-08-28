//Use <div include-html="path/to/document.html"></div>
async function includeHTML() {
    const elements = document.querySelectorAll('[include-html]');
    if (elements.length === 0) {
        console.debug("No elements with [include-html] found.");
        return;
    } 
    for (const element of elements) {
        const filePath = element.getAttribute('include-html');
        try {
            if (!filePath.startsWith('./') && !filePath.startsWith('/')) {
                console.error("Invalid filepath for the include-html attribute.");
            }
            const response = await fetch(filePath);
            if (!response.ok) {
                console.error(`Could not load file "${filePath}".`);
            }
            const content = await response.text();
            element.innerHTML = content;
            element.removeAttribute('include-html');
        } catch (error) {
            console.error(error.message);
        }
    }

    includeHTML();
}

document.addEventListener('DOMContentLoaded', async function () {
    includeHTML();
});


