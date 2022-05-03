function toggle(remove, add, id, value) {
    let html = document.querySelector('html');
    html.classList.remove(remove);
    html.classList.add(add);
    try {
        window.localStorage.setItem(id, value);
    } catch (e) { }
}

(() => {
    let html = document.querySelector('html');
    const sidebar_toggle = document.querySelector('.sidebartoggle');

    sidebar_toggle.addEventListener('click', function sidebarToggle() {
        if (html.classList.contains('sidebar-visible')) {
            toggle('sidebar-visible', 'sidebar-hidden', 'sidebar', 'hidden');
        } else {
            toggle('sidebar-hidden', 'sidebar-visible', 'sidebar', 'visible');
        }
    });
})();

(() => {
    let html = document.querySelector('html');
    const theme_toggle = document.querySelector('.themetoggle');

    theme_toggle.addEventListener('click', function themeToggle() {
        if (html.classList.contains('light')) {
            toggle('light', 'dark', 'theme', 'dark');
        } else {
            toggle('dark', 'light', 'theme', 'light');
        }
    });
})();

(() => {
    let html = document.querySelector('html');
    document.addEventListener('keydown', function (h) {
        if (window.search && window.search.hasFocus()) { return; }
        if (h.altKey || h.ctrlKey || h.metaKey || h.shiftKey) { return; }

        switch (h.key) {
            case 'ArrowLeft':
                const prev = document.querySelector('.navigation .nav.prev');
                window.location.href = prev.href;
                break
            case 'ArrowRight':
                const next = document.querySelector('.navigation .nav.next');
                window.location.href = next.href;
                break
            case 't':
                if (html.classList.contains('light')) {
                    toggle('light', 'dark', 'theme', 'dark');
                } else {
                    toggle('dark', 'light', 'theme', 'light');
                }
                break
            case 'k':
                if (html.classList.contains('sidebar-visible')) {
                    toggle('sidebar-visible', 'sidebar-hidden', 'sidebar', 'hidden');
                } else {
                    toggle('sidebar-hidden', 'sidebar-visible', 'sidebar', 'visible');
                }
                break
            case 'e':
                const edit = document.querySelector('.gitedit');
                edit.click();
                break
            case 'r':
                const repo = document.querySelector('.giturl');
                repo.click();
                break
        };
    });
})();
