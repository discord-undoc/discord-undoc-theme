"use strict";

window.onunload = function () { };

(function customeElements() {
    (function user() {
        const users = document.querySelectorAll('.user');
        users.forEach((user) => {
            const uinfo = user.innerHTML.split('#');
            const uname = uinfo[0];
            const discrim = uinfo[1];
            const uavatar =  user.id.split(" ");
            const avatar = `https://cdn.discordapp.com/avatars/${uavatar[0]}/${uavatar[1]}.${(uavatar[1].startsWith("a_")) ? 'gif' : 'webp'}`;
            user.href = `https://discord.com/users/${uavatar[0]}`;
            user.innerHTML = `<img src="${avatar}" alt="" class="avatar"><b>${uname}</b><span>#${discrim}</span></img>`
        });
    })();
    
    (function undocumented() {
        const undocs = document.querySelectorAll('.undoc');
        undocs.forEach((undoc) => {
            undoc.innerHTML = `<b class="material-icons round">article</b><b class="tooltip">This is not officially documented.</b>`;
        });
    })();

    (function noBot() {
        const nobots = document.querySelectorAll('.nobot');
        nobots.forEach((nobot) => {
            nobot.innerHTML = `<b class="material-icons round">smart_toy</b><b class="tooltip">This is not useable by bots.</b>`;
        });
    })();

    (function ianDeploy() {
        const iandeploys = document.querySelectorAll('.iandeploy');
        iandeploys.forEach((iandeploy) => {
            iandeploy.innerHTML = `<b class="material-icons round">build_circle</b><b class="tooltip">IAN DEPLOY!!!!!</b>`;
        });
    })();
})();

(function codeSnippets() {

    // Syntax highlighting Configuration
    hljs.configure({
        tabReplace: '    ', // 4 spaces
        languages: [],      // Languages used for auto-detection
    });

    Array.from(document.querySelectorAll('pre code')).forEach(function (block) {
        hljs.highlightElement(block);
        block.classList.add('hljs');
    });

})();

(function addHomepageLink() {
    const header = document.querySelector('.sidebar .header a');
    let href = window.location.origin + '/' + base_url;
    href = (href.endsWith('/')) ? href + first_page : href  + '/' + first_page;
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

(function sidebar() {
    var html = document.querySelector("html");
    var sidebar = document.querySelector(".sidebar");
    var sidebarToggleButton = document.querySelector(".sidebartoggle");

    function showSidebar() {
        html.classList.remove('sidebar-hidden')
        html.classList.add('sidebar-visible');
        try {
            localStorage.setItem('sidebar', 'visible');
        } catch (e) { }
    }

    function hideSidebar() {
        html.classList.remove('sidebar-visible')
        html.classList.add('sidebar-hidden');
        try {
            localStorage.setItem('sidebar', 'hidden');
        } catch (e) { }
    }

    // Toggle sidebar
    sidebarToggleButton.addEventListener('click', function sidebarToggle() {
        if (html.classList.contains("sidebar-hidden")) {
            showSidebar();
        } else {
            hideSidebar();
        }
    });

    // Scroll sidebar to current active section
    var activeSection = sidebar.querySelector(".active");
    if (activeSection) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
        activeSection.scrollIntoView({ block: 'center' });
    }
})();
