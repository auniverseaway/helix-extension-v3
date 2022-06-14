import './components/project-list.js';

async function options() {
    // await browser.storage.sync.set({ projects: [ {
    //   name: 'Milo',
    //   repoUrl: 'https://github.com/adobecom/milo'
    // }] });
}

options();

// chrome.runtime.sendMessage({ message: "get_name" }, response => {
//     if (response.message !== 'success') return;
//     document.querySelector('div').innerHTML = `Hello ${response.payload}`;
// });