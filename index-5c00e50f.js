(function() {
    const r = document.createElement("link").relList;
    if (r && r.supports && r.supports("modulepreload")) return;
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) i(e);
    new MutationObserver(e => {
        for (const n of e)
            if (n.type === "childList")
                for (const s of n.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && i(s)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function o(e) {
        const n = {};
        return e.integrity && (n.integrity = e.integrity), e.referrerpolicy && (n.referrerPolicy = e.referrerpolicy), e.crossorigin === "use-credentials" ? n.credentials = "include" : e.crossorigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n
    }

    function i(e) {
        if (e.ep) return;
        e.ep = !0;
        const n = o(e);
        fetch(e.href, n)
    }
})();
const l = "javascript-8dac5379.svg",
    c = document.querySelector("form"),
    a = document.querySelector("#chat_container");
let u;

function m(t) {
    t.textContent = "", u = setInterval(() => {
        t.textContent += ".", t.textContent === "...." && (t.textContent = "")
    }, 300)
}

function p(t, r) {
    let o = 0,
        i = setInterval(() => {
            o < r.length ? (t.innerHTML += r.charAt(o), o++) : clearInterval(i)
        }, 20)
}

function g() {
    const t = Date.now(),
        o = Math.random().toString(16);
    return `id-${t}-${o}`
}

function d(t, r, o) {
    return `
        <div class="wrapper ${t&&"ai"}">
            <div class="chat">
                <div class="profile">
                    <img
                      src=${l}
                      alt="${t?"bot":"user"}"
                    />
                </div>
                <div class="message" id=${o}>${r}</div>
            </div>
        </div>
    `
}
const f = async t => {
    t.preventDefault();
    const r = new FormData(c);
    a.innerHTML += d(!1, r.get("prompt")), c.reset();
    const o = g();
    a.innerHTML += d(!0, " ", o), a.scrollTop = a.scrollHeight;
    const i = document.getElementById(o);
    m(i);
    const e = await fetch("https://codex-chatgpt-o33z.onrender.com/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: r.get("prompt")
        })
    });
    if (clearInterval(u), i.innerHTML = " ", e.ok) {
        const s = (await e.json()).bot.trim();
        p(i, s)
    } else {
        const n = await e.text();
        i.innerHTML = "Something went wrong", alert(n)
    }
};
c.addEventListener("submit", f);
c.addEventListener("keyup", t => {
    t.keyCode === 13 && f(t)
});
