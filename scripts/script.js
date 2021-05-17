import { router } from './router.js';

window.addEventListener('popstate', (event) => {
    router.setState(event.state, event.state.entry);
});

const settingsIcon = document.querySelector('img[alt="settings"]');
settingsIcon.onclick = () => {
    router.setState('Settings');
};

const title = document.querySelector("header h1");
title.onclick = () => {
    router.setState('Home');
};

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://cse110lab6.herokuapp.com/entries')
        .then(response => response.json())
        .then(entries => {
            entries.forEach(entry => {
                const newPost = document.createElement('journal-entry');
                newPost.entry = entry;
                document.querySelector('main').appendChild(newPost);
                const index = document.querySelector('main').childElementCount.toString();
                entry.order = index;
                newPost.onclick = () => {
                    router.setState('Entry', entry);
                };
            });
        });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}