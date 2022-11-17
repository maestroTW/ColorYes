const cols = document.querySelectorAll('.col');

// document.addEventListener('touchstart', function(event) {
//     if (event.code === 'Space') { console.log('start') } {
//         SetRandomColors()
//     }
// })
document.addEventListener('keypress', function(event) {
    if (event.code === 'Space') { console.log('start') } {
        SetRandomColors()
    }
})

document.addEventListener('click', event => {
    const type = event.target.dataset.type

    if(type === 'lock') {
        const node  =
            event.target.tagName.toLowerCase() === 'i'
                ? event.target
            : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    }
    else if (type === 'copy') {
        copyToClick(event.target.textContent)
    } else if (type === 'random') {
        SetRandomColors()
    }

})

function generateRandomColor() {
    // RGB
    // #FF0000
    // #00FF00
    // #0000FF

    const hexCodes = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        color += hexCodes [Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color
}

function copyToClick(text) {
    return navigator.clipboard.writeText(text)
}

function SetRandomColors() {
    const colors = []

    cols.forEach((col) => {
        const isLoked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        const color = generateRandomColor()

        if (isLoked) {
            colors.push(text.textContent)
            return
        }

        colors.push(color)

        text.textContent = color
        col.style.background = color

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(col => {
        return col.toString().substring(1)
    }).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        document.location.substring(1).split('-').map((color) => '#' + color)
    }
    return []
}

SetRandomColors()

function readMore() {
    const dots = document.getElementById("dots");
    const more = document.getElementById("dots");
    const btn = document.getElementById("dots");

    if(dots.style.display === "none") {
        dots.style.display = "inline";
        btn.innerHTML = "Подробнее"
        more.style.display = "none";
    }
    else {
        dots.style.display = "none";
    btn.innerHTML = "Скрыть"
    more.style.display = "inline";
}
    if(dots.style.display === "none") {
        dots.style.display = "none";
        btn.innerHTML = "This site will help you choose the right color palette for your project. Press 'Space' to change color. Click on the color to copy its id. Developed by maestroTW."
        more.style.display = "inline";
    }
    else {
        dots.style.display = "inline";
        btn.innerHTML = "Скрыть"
        more.style.display = "none";
    }
}