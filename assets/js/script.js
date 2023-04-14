//ELements
const apps = document.querySelector("#br-os-apps")
var menu = document.querySelector("#os-ct-menu")
const os_window = document.querySelector(".br-os-window")
const brand_window = document.querySelector(".brand")
const app_main = document.querySelector ("#app-main")
const maximise = document.querySelector("#maximise")
const shorter = document.querySelector("#shorter")
const cross = document.querySelector("#cross")
const taskbar = document.querySelector ("#taskbar")
/* Sound effects */
const click = new Audio("assets/music/click.wav")
const con = new Audio("assets/music/alert.wav")
const okay = new Audio("assets/music/positive.wav")
const no = new Audio("assets/music/negative.wav")

//Operations
/* Reseting window */
close(os_window)
/* Creating apps */
create_app("File manager", 'assets/images/apps/file-manager.png', "file-manager")
create_app("Recycle bin", "assets/images/apps/recycle-bin.png", "recycle-bin")
create_app ("Settings", "assets/images/apps/settings.png", "settings")
create_app("System Info", "assets/images/apps/system-information.png", "system-info")

//Functions

function create_app (name, image, id) {
    let app = document.createElement("div")
    app.classList.add("app")
    app.id = id
    app.setAttribute("onclick", "window_open('" + id + "')")
    app.oncontextmenu = e => {
        click.play()
        open_menu(e, id)
    }

    let img = document.createElement("img")
    img.src = image
    img. setAttribute("alt", name)
    let p = document.createElement("p")
    p.innerText = name
    app.appendChild (img)
    app.appendChild (p)
    apps.appendChild (app)
}

function open (tag) {
    tag.style.display = "inline-block"
}

function close (tag) {
    tag.style.display = "none"
}

function window_open (id) {
    click.play()
    brand_window.innerHTML = ""
    app_main.innerHTML = ""
    init_window()

    let main = document.querySelector("#" + id)

    let img = document.createElement("img")
    img.src = main.childNodes[0].src
    img.setAttribute("alt", main.childNodes[0].getAttribute("alt"))

    let p = document.createElement("p")
    p.innerText = main.childNodes[1].innerText
    brand_window.appendChild(img)
    brand_window.appendChild(p)

    open(os_window)
}

function init_window() {
    close(shorter)
    maximise.onclick = e => {
        click.play()
        maximise_window()
    }
    shorter.onclick = e => {
        click.play()
        shorter_window()
    }
    cross.onclick = e => {
        click.play()
        close(os_window)
        os_window
    }
}

function maximise_window () {
    open(shorter)
    close(maximise)
    window.restoreX = os_window.style.left
    window.restoreY = os_window.style.top
    os_window.style.top = 0
    os_window.style.left = 0
    os_window.style.width = "100%"
    os_window.style.height = "100vh"
}

function shorter_window () {
    open(maximise)
    close(shorter)
    os_window.style.top = window.restoreY
    os_window.style.left = window.restoreX
    os_window.style.width = "60%"
    os_window.style.height = "60vh"
}

function open_menu (e, id) {
    e.preventDefault()
    menu.classList.add("active")
    menu.querySelectorAll("ul li")[0].childNodes[0].onclick = () => {
        window_open(id)
    }
    menu.querySelectorAll("ul li")[1].childNodes[0].onclick = () => {
        admin_access(id)
    }
    menu.querySelectorAll("ul li")[2].childNodes[0].onclick = () => {
        remove_app(id)
    }
    menu.style.top = e.pageY + 5 + "px"
    menu.style.left = e.pageX + 5 + "px"
    return false
}

function admin_access(id) {
    con.play()
    vex.dialog.confirm({
        message: "Are you sure to give admin access to this app?",
        callback: function(value) {
            if(value) {
                okay.play()
                window_open(id)
            } else {
                no.play()
                vex.dialog.alert({
                    message: "Request declined"
                })
            }
        }
    })
}

function remove_app(id) {
    con.play()
    vex.dialog.confirm({
        message: "Are you sure to remove this app?",
        callback: function(value) {
            if(value) {
                okay.play()
                document.querySelector("#" + id).remove()
            } else {
                no.play()
                vex.dialog.alert({
                    message: "App is not removed"
                })
            }
        }
    })
}

//Anonimus functions in Event Listeners
window.onclick = e => {
    if (menu.classList.contains ("active")) {
        menu.classList.remove("active")
    }
}

os_window.ondragend = e => {
    let go_top = e.pageY
    let go_left = e.pageX
    if(go_top < 0) {
        go_top= e
    }
    if(go_left < 0) {
        go_left = 0
    }
    os_window.style.top = go_top + "px"
    os_window.style.left = go_left + "px"
}