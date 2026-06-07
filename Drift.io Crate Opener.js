// ==UserScript==
// @name         Drift.io Crate Opener
// @namespace    https://github.com/3lectr0Ninja
// @version      V2
// @description  Let the script open all your crates while watching it(if you want to),rather than breaking ur fingers. Enjoy!
// @author       3lectr0N!nj@
// @match        https://drift.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=drift.io
// @grant        none
// ==/UserScript==
const menu = document.createElement("div");
menu.id = "modMenu";

menu.innerHTML = `
<div id="menuHeader">
    <div id="menuTitle">3lectr0N!nj@ HaX's</div>
    <div id="menuSubtitle">Drift.io Crate Opener</div>
</div>

<div id="sidebar">
    <div class="tab active" data-tab="crate">CRATES</div>
    <div class="tab" data-tab="abt">ABOUT</div>
</div>

<div id="content">

    <div class="page active" id="crate">
        <h1>Crate Opener</h1>

        <button class="modBtn" id="crateBtn">
            Toggle: OFF
        </button>
    </div>

    <div class="page" id="abt">

        <h1>About Me</h1>

        <p class="infoText">
            If you want more hacks / have any issues u can dm in discord.
        </p>

        <div class="linkRow">
            <span class="linkLabel">GitHub:</span>
            <a class="linkValue"
               href="https://github.com/3lectr0Ninja"
               target="_blank">
               https://github.com/3lectr0Ninja
            </a>
        </div>

        <div class="linkRow">
            <span class="linkLabel">Discord:</span>
            <span class="linkValue">electroninja._.</span>
        </div>

    </div>

</div>
`;

document.body.appendChild(menu);

// ================= STYLE =================

const style = document.createElement("style");

style.textContent = `
#modMenu{
    position:fixed;
    top:120px;
    left:120px;

    width:500px;
    height:320px;

    background:rgba(15,15,20,.96);

    border:2px solid #ff0033;
    border-radius:22px;

    overflow:hidden;
    z-index:999999;

    display:none;

    color:white;
    font-family:Arial,sans-serif;

    backdrop-filter:blur(10px);

    box-shadow:
        0 0 25px #ff0033,
        0 0 60px rgba(255,0,51,.25);
}

#menuHeader{
    width:100%;
    height:75px;

    border-bottom:2px solid rgba(255,255,255,.08);

    display:flex;
    flex-direction:column;
    justify-content:center;

    padding-left:25px;

    cursor:move;
    user-select:none;
}

#menuTitle{
    font-size:22px;
    font-weight:bold;

    color:#ff0033;

    letter-spacing:2px;

    text-shadow:
        0 0 10px #ff0033,
        0 0 20px #ff0033;
}

#menuSubtitle{
    margin-top:2px;
    font-size:12px;
    opacity:.7;
}

#sidebar{
    position:absolute;

    top:75px;
    left:0;

    width:140px;
    height:calc(100% - 75px);

    background:rgba(0,0,0,.35);

    border-right:2px solid rgba(255,0,51,.12);

    padding-top:15px;
}

.tab{
    margin:10px;
    padding:16px;

    border-radius:12px;

    cursor:pointer;

    font-weight:bold;

    background:rgba(255,255,255,.03);

    transition:.2s;
}

.tab:hover{
    background:rgba(255,0,51,.12);
    transform:translateX(5px);
}

.tab.active{
    background:#ff0033;
    color:black;

    box-shadow:0 0 15px #ff0033;
}

#content{
    position:absolute;

    top:75px;
    left:160px;

    left:140px;
    width:calc(100% - 140px);

    padding:20px;

    overflow-y:auto;
}

#content::-webkit-scrollbar{
    width:6px;
}

#content::-webkit-scrollbar-thumb{
    background:#ff0033;
    border-radius:10px;
}

.page{
    display:none;
}

.page.active{
    display:block;
}

.page h1{
    margin-top:0;

    color:#ff0033;

    text-shadow:0 0 10px #ff0033;
}

.modBtn{
    width:180px;

    padding:14px;
    margin-top:12px;

    border:none;
    border-radius:12px;

    background:rgba(255,0,51,.08);

    border:1px solid rgba(255,0,51,.25);

    color:white;

    font-size:15px;
    font-weight:bold;

    cursor:pointer;

    transition:.2s;
}

.modBtn:hover{
    background:#ff0033;

    color:black;

    transform:scale(1.03);

    box-shadow:0 0 15px #ff0033;
}

.infoText{
    margin-top:15px;
    opacity:.8;
    line-height:1.4;
}

.linkRow{
    margin-top:10px;
}

.linkLabel{
    font-weight:bold;
    color:#ff0033;
}

.linkValue{
    color:white;
    text-decoration:none;
}
`;

document.head.appendChild(style);

// ================= OPEN / CLOSE =================

let opened = false;

document.addEventListener("keydown", e => {

    if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA"
    ) return;

    if (e.key.toLowerCase() === "f") {

        opened = !opened;

        menu.style.display =
            opened ? "block" : "none";
    }
});

// ================= TABS =================

const tabs = document.querySelectorAll(".tab");
const pages = document.querySelectorAll(".page");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(t =>
            t.classList.remove("active")
        );

        pages.forEach(p =>
            p.classList.remove("active")
        );

        tab.classList.add("active");

        document
            .getElementById(tab.dataset.tab)
            .classList.add("active");
    });

});

// ================= CRATE BUTTON =================

const crateBtn =
    document.getElementById("crateBtn");

const crateStatus =
    document.getElementById("crateStatus");

crateBtn.addEventListener("click", () => {

    crate.openall();

    crateBtn.textContent =
        "Toggle: " +
        (crate.running ? "ON" : "OFF");
});

// ================= DRAG =================

const header =
    document.getElementById("menuHeader");

let dragging = false;
let offsetX = 0;
let offsetY = 0;

header.addEventListener("mousedown", e => {

    dragging = true;

    offsetX =
        e.clientX - menu.offsetLeft;

    offsetY =
        e.clientY - menu.offsetTop;
});

document.addEventListener("mousemove", e => {

    if (!dragging) return;

    menu.style.left =
        (e.clientX - offsetX) + "px";

    menu.style.top =
        (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
    dragging = false;
});
let t = 1;

const crate = window.crate = {
    running: false,

    openall() {
        this.running = !this.running;

        if (!this.running) return;

        const loop = () => {
            if (!this.running) return;

            document.getElementsByClassName("gOcOyMdf2AutWVy_1_Xr ")[0]?.click();

            setTimeout(() => {
                if (!this.running) return;
                document.getElementsByClassName("VWYQMoyTvRvkDsmkeCaQ   oUNyBxqmLpE4HIQT6WpA")[0]?.click();
            }, t);

            setTimeout(() => {
                if (!this.running) return;
                document.getElementsByClassName("VWYQMoyTvRvkDsmkeCaQ   Qcld8QuUkixtNmrv6LgL")[0]?.click();
            }, t);

            setTimeout(loop, t);
        };

        loop();
    }
};
