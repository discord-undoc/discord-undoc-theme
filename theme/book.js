/*
Copyright 2022 한승민

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

function toggle(remove, add, id, value) {
    let html = document.querySelector('html');
    html.classList.remove(remove);
    html.classList.add(add);
    try {
        window.localStorage.setItem(id, value);
    } catch (e) { }

    if (id !== 'theme') return

    let server_img = document.querySelectorAll('.server-img');
    if (server_img === null) return
    for (const img of server_img) {
        let source = img.src
        source = source.substring(0, source.lastIndexOf('?theme=') + 7);
        img.src = source + value;
    }
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

/* Widget Abominations here */

(() => {
    let alert_boxes = document.querySelectorAll("note, info, warn");
    if (alert_boxes === null) return

    for (const alert_box of alert_boxes) {
        let type = alert_box.tagName
        let data = alert_box.innerHTML
        alert_box.innerHTML = `<div class="${type.toLocaleLowerCase()}">${data}</div>`
    }
})();

(() => {
    let methods = document.querySelectorAll("get, mhead, post, put, delete, connect, options, trace, patch")
    if (methods === null) return

    for (const method of methods) {
        let type = method.tagName
        if (type === "MHEAD") {
            type = "head"
        }
        let url = method.innerHTML
        method.innerHTML = `<b class="endpoint">
        <span class="endpoint-c"><span class="http-method ${type.toLowerCase()}">
        ${type.toUpperCase()}</span> ${url}</span>
        </b>`
    }
})();

(() => {
    let indicators = document.querySelectorAll("undoc, nobot, iandeploy")
    if (indicators === null) return

    for (const indicator of indicators) {
        let type = indicator.tagName
        if (type === "UNDOC") {
            indicator.innerHTML = `<b class="${type.toLocaleLowerCase()}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" 
            width="20" height="20"><path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 
            16zM5.5 4A1.5 1.5 0 004 5.5v5c0 .828.5 1.5 1 1.5v-1a1 1 0 
            011-1h5v1h-1v1h1.5a.5.5 0 00.5-.5v-7a.5.5 0 00-.5-.5h-6zm.5 
            7.25a.25.25 0 01.25-.25H9v2.764a.25.25 0 01-.426.178l-.898-.888a.25.25 
            0 00-.352 0l-.898.888A.25.25 0 016 13.764V11.25z"></path></svg></b>`
        }
        if (type === "NOBOT") {
            indicator.innerHTML = `<b class="${type.toLocaleLowerCase()}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" 
            width="20" height="20"><path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 
            16zm.847-8.145a2.502 2.502 0 10-1.694 0C5.471 8.261 4 9.775 4 11c0 
            .395.145.995 1 .995h6c.855 0 1-.6 1-.995 
            0-1.224-1.47-2.74-3.153-3.145z"></path></svg></b>`
        }
        if (type === "IANDEPLOY") {
            indicator.innerHTML = `<b class="${type.toLocaleLowerCase()}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" 
            width="20" height="20"><path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 
            16zm3.031-12a4.38 4.38 0 00-3.097 
            1.283l-.23.229c-.156.157-.308.32-.452.49H5.65a.876.876 0 
            00-.746.417l-.856 1.388a.375.375 0 00.21.556l1.552.477 1.35 1.35.478 
            1.553a.375.375 0 00.555.21l1.389-.855a.876.876 0 
            00.416-.746V8.747c.17-.144.333-.295.49-.452l.23-.23A4.38 4.38 0 
            0012 4.969v-.093A.876.876 0 0011.124 4h-.093zm-5.107 7.144a.81.81 0 
            01-.188.263c-.394.394-1.258.563-1.62.619a.124.124 0 
            01-.143-.143c.056-.362.225-1.226.62-1.62a.808.808 0 011.33.881z"></path></svg></b>`
        }
    }
})();

(() => {
    let spoilers = document.querySelectorAll("spoiler")
    if (spoilers === null) return

    for (const spoiler of spoilers) {
        let id = new Date().getTime() + Math.floor(Math.random() * 500000);
        let data = spoiler.innerHTML
        spoiler.innerHTML = `<input type="checkbox" class="spoiler" id="spoiler-${id}">
        <label class="spoiler" for="spoiler-${id}">${data}</label>`
    }
})();

(async () => {
    let discordRegex = /^[0-9]+$/
    let badges = document.querySelectorAll("user")
    if (badges === null) return

    window.users = {}

    for (const badge of badges) {
        let user_id = badge.id;
        if (user_id.startsWith("github:")) {
            let user_name = user_id.substring(7);
            if (window.users.hasOwnProperty(user_id)) {
                let user = window.users[user_id];
                badge.innerHTML = `<a href="${user.url}" targe="_blank" class="user">
                    <img src="${user.avatar}" alt="${user.name}\'s avatar"
                    class="avatar">
                    <span class="username">${user.name}</span>
                    </img>
                    </a>`
                continue
            }
            let data = await (await fetch(`https://api.github.com/users/${user_name}`)).json()
            let user = {
                url: "https://github.com/ghost",
                avatar: "https://avatars.githubusercontent.com/u/10137?v=4",
                name: "Deleted user",
                id: "ghost"
            }
            if (data.message != "Not Found") {
                user = {
                    url: data.html_url,
                    avatar: data.avatar_url,
                    name: data.name || data.login,
                    id: data.login
                }
            }
            window.users[user_id] = user
            badge.innerHTML = `<a href="${user.url}" targe="_blank" class="user">
            <img src="${user.avatar}" alt="${user.name}\'s avatar"
            class="avatar">
            <span class="username">${user.name}</span>
            </img>
            </a>`
        } else if (user_id.startsWith("gitlab:")) {
            let user_name = user_id.substring(7);
            if (window.users.hasOwnProperty(user_id)) {
                let user = window.users[user_id];
                badge.innerHTML = `<a href="${user.url}" targe="_blank" class="user">
                    <img src="${user.avatar}" alt="${user.name}\'s avatar"
                    class="avatar">
                    <span class="username">${user.name}</span>
                    </img>
                    </a>`
                continue
            }
            let data = await (await fetch(`https://gitlab.com/api/v4/users?per_page=1&username=${user_name}`)).json()
            let user = {
                url: "https://gitlab.com/",
                avatar: "",
                name: "Deleted user",
                id: ""
            }
            if (data.length !== 0) {
                user = {
                    url: data[0].web_url,
                    avatar: data[0].avatar_url,
                    name: data[0].name || data[0].username,
                    id: data[0].username
                }
            }
            window.users[user_id] = user
            badge.innerHTML = `<a href="${user.url}" targe="_blank" class="user">
                <img src="${user.avatar}" alt="${user.name}\'s avatar"
                class="avatar">
                <span class="username">${user.name}</span>
                </img>
                </a>`
        } else if (user_id.startsWith("discord:") || discordRegex.test(user_id)) {
            if (user_id.startsWith("discord:")) user_id = user_id.substring(8);

            if (window.users.hasOwnProperty(user_id)) {
                let user = window.users[user_id];
                badge.innerHTML = `<a href="${user.url}" targe="_blank" class="user">
                    <img src="${user.avatar}" alt="${user.name}\'s avatar"
                    class="avatar">
                    <span class="username">${user.name}</span>
                    <span class="discriminator">#${user.discriminator}</span>
                    </img>
                    </a>`
                continue
            }
            let user = await (await fetch(`https://discord-undoc-utils.arhsm.workers.dev/?user_id=${user_id}`)).json()
            window.users[user_id] = user;
            badge.innerHTML = `<a href="${user.url}" targe="_blank" class="user">
            <img src="${user.avatar}" alt="${user.name}\'s avatar"
            class="avatar">
            <span class="username">${user.name}</span>
            <span class="discriminator">#${user.discriminator}</span>
            </img>
            </a>`
        }
    }
})();

(() => {
    let isDarkTheme = document.querySelector('html').classList.contains("dark");
    let servers = document.querySelectorAll("server")
    if (servers === null) return

    for (const server of servers) {
        let invite = server.id
        server.innerHTML = `<a href="https://discord.gg/${invite}" target="_blank">
        <img class="server-img" src="https://invidget.switchblade.xyz/${invite}?theme=${isDarkTheme ? 'dark' : 'light'}" alt=""/>
        </a>`
    }
})();
