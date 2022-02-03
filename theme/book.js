"use strict";

window.onunload = function () { };

(function codeSnippets() {

    // Syntax highlighting Configuration
    hljs.configure({
        tabReplace: '    ', // 4 spaces
        languages: [],      // Languages used for auto-detection
    });

    let code_nodes = Array
        .from(document.querySelectorAll('code'))
        // Don't highlight `inline code` blocks in headers.
        .filter(function (node) {return !node.parentElement.classList.contains("header"); });

    
    code_nodes.forEach(function (block) { hljs.highlightBlock(block); });

    // Adding the hljs class gives code blocks the color css
    // even if highlighting doesn't apply
    code_nodes.forEach(function (block) { block.classList.add('hljs'); });
})();

(function addHomepageLink() {
    const header = document.querySelector('.sidebar .header a');
    let href = window.location.origin + '/' + base_url;
    href = (href.endsWith('/')) ? href.slice(0, -1) : href;
    href = href  + '/' + first_page;
    header.setAttribute('href', href);
})();

(function toggleTheme() {
    const html = document.querySelector('html');
    const theme_toggle = document.querySelector('.themepicker');
    theme_toggle.addEventListener('click', () => {
        const current_theme = localStorage.getItem('theme');
        const to_set = (current_theme === 'dark') ? 'light' : 'dark';
        localStorage.setItem('theme', to_set);
        html.classList.remove(current_theme);
        html.classList.add(to_set);
    });
})();

(function chapterNavigation() {
    /* Megu reference, h h h h h h h h h h h h h h h h h h h h h */
    document.addEventListener('keydown', (h) => {
        if (h.altKey || h.ctrlKey || h.metaKey || h.shiftKey) { return; }
        if (window.search && window.search.hasFocus()) { return; }

        switch (h.key) {
            case 'ArrowLeft':
                h.preventDefault();
                const n_button = document.querySelector('.nav.prev');
                if (n_button) { window.location.href = n_button.href; }
                break
            case 'ArrowRight':
                h.preventDefault();
                const p_button = document.querySelector('.nav.next');
                if (p_button) { window.location.href = p_button.href; }
                break
        };
    });
})();
