export const router = {};

router.setState = function(state, entry) {
    const body = document.querySelector("body");
    const title = document.querySelector("header h1");
    if (state === 'Home') {
        title.innerHTML = "Journal Entries";
        history.pushState({ page: 'Home' }, '', window.location.origin);
    } else if (state === 'Settings') {
        title.innerHTML = "Settings";
        const url = window.location.origin + "#settings";
        history.pushState({ page: 'Settings' }, '', url);
    } else if (state === 'Entry') {
        const order = entry.order;
        const url = window.location.origin + '#entry' + order;
        title.innerHTML = "Entry " + order;
        history.pushState({ page: 'Entry' }, '', url);
    }

    helperFunc(state, entry);
};

export const helperFunc = function(state, entry) {
    const body = document.querySelector("body");

    if (state === 'Home') {
        body.className = '';
    } else if (state === 'Settings') {
        body.className = 'settings';
    } else if (state === 'Entry') {
        body.className = 'single-entry';
        const curr = document.querySelector('entry-page');;
        curr.remove();
        const main = document.querySelector('main')
        const newEntry = document.createElement('entry-page');
        newEntry.entry = entry;
        body.insertBefore(newEntry, main.nextSibling);
    }
};