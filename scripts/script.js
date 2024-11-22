let mobileDrawerButtonOpen = null;
let mobileDrawerButtonClose = null;
let drawer = null;
let headers = null;
let inserts = null;
let visited = null;
let newVisitorDialogue = null;
let newVisitorButton = null;
let mobileMode = window.matchMedia('(orientation: portrait) or (pointer: none)').matches;

const drawerAnimationOpen = [
    { translate: "100% 0" },
    { translate: "0 0" },
];
const drawerAnimationClose = [
    { translate: "0 0" },
    { translate: "100% 0" },
];
const drawerAnimationTiming = {
    duration: 300,
    iterations: 1,
    easing: 'ease-in-out'
};

const newVisitorAnimationClose = [
    { opacity: "100%" },
    { opacity: "0%" },
];
const newVisitorAnimationTiming = {
    duration: 300,
    iterations: 1,
    easing: 'ease-in-out'
};

async function handleMobileDrawerOpen() {
    drawer.style.display = 'unset';
    mobileDrawerButtonClose.style.display = 'unset';
    mobileDrawerButtonOpen.style.display = 'none';
    drawer.animate(drawerAnimationOpen, drawerAnimationTiming);
}

async function handleMobileDrawerClose() {
    mobileDrawerButtonOpen.style.display = 'unset';
    drawer.animate(drawerAnimationClose, drawerAnimationTiming).addEventListener('finish', function () {
        drawer.style.display = 'none';
        mobileDrawerButtonClose.style.display = 'none';
    });
}

async function confirmAge() {
    newVisitorDialogue.animate(newVisitorAnimationClose, newVisitorAnimationTiming).addEventListener('finish', function () {
        newVisitorDialogue.style.display = 'none';
        window.localStorage.setItem("visited-JP4S-page", "visited");
    });
}

async function createAnchors() {
    const alphanumerics = "abcdefghijklmnopqrstuvwxyz0123456789";
    for (const header of headers) {
        const id = header.id;
        try {
            header.onclick = function () {
                let link = location.protocol + "//" + location.host + location.pathname + "#" + id;
                navigator.clipboard.writeText(link);
                alert("Copied header URL to clipboard! [" + link + "]");
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    console.log("Created anchors out of headers.")
}

async function insertHTML() {
    for (const element of inserts) {
        const filePath = element.getAttribute('insert-html');
        try {
            if (!filePath.startsWith('./') && !filePath.startsWith('/')) {
                console.error("Invalid filepath for the insert-html attribute.");
            }
            const response = await fetch(filePath);
            if (!response.ok) {
                console.error(`Could not load file "${filePath}".`);
            } else {
                const content = await response.text();
                element.innerHTML = content;
                element.removeAttribute('insert-html');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    inserts = document.querySelectorAll('[insert-html]');
    if (inserts.length === 0) {
        console.log("No HTML elements contain 'insert-html' attributes anymore.");
    } else {
        await insertHTML();
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    inserts = document.querySelectorAll('[insert-html]');
    if (inserts.length === 0) {
        console.log("No elements with [insert-html] found.");
    } else {
        await insertHTML();
    }

    headers = document.querySelectorAll('h2, h3');
    if (headers.length === 0) {
        console.log("No elements with h2 or h3 found.");
    } else {
        await createAnchors();
    }

    visited = window.localStorage.getItem('visited-JP4S-page') !== null;
    newVisitorDialogue = document.getElementById("new-visitor");
    newVisitorButton = document.getElementById("new-visitor-button");
    newVisitorButton.addEventListener("click", confirmAge);

    if (!visited) {
        newVisitorDialogue.style.display = "block";
    }

    mobileDrawerButtonOpen = document.getElementById('mobile-drawer-button-open');
    mobileDrawerButtonClose = document.getElementById('mobile-drawer-button-close');
    drawer = document.getElementById('drawer');
    if (mobileDrawerButtonOpen === undefined || mobileDrawerButtonOpen === null) {
        console.error("The mobile drawer button to open couldn't be found.");
    } else if (mobileDrawerButtonClose === undefined || mobileDrawerButtonClose === null) {
        console.error("The mobile drawer button to close couldn't be found.");
    } else if (drawer === undefined || drawer === null)  {
        console.error("The drawer button couldn't be found.");
    } else {
        mobileDrawerButtonOpen.addEventListener('click', handleMobileDrawerOpen);
        mobileDrawerButtonClose.addEventListener('click', handleMobileDrawerClose);
    }
});

window.addEventListener('resize', async function () {
    //if window is now mobile mode and hasn't been before...
    if (window.matchMedia('(orientation: portrait) or (pointer: none)').matches && !mobileMode) {
        console.log("The window was resized to mobile mode.");
        window.location.reload();
        mobileMode = true;
        //else if window in not in mobile mode but has been before...
    } else if (!window.matchMedia('(orientation: portrait) or (pointer: none)').matches && mobileMode) {
        console.log("The window was resized to desktop mode.");
        window.location.reload();
        mobileMode = false;
    }
});