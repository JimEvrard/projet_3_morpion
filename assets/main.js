let lap = 1;
let playerOneIcon = "X"
let playerTwoIcon = "O"
let onePlayer = false
let htmlGrid = document.querySelectorAll("table td")
let win = false
let disabled = false;
let tabVictory = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]


function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function twoPlayerMode() {
    onePlayer = false;
    refresh()
}

function onePlayerMode() {
    onePlayer = true
    refresh()
}

function play(elem) {
    if (elem.innerHTML === '' && !win) {
        if (lap % 2 !== 0) {
            // si le nombre de tour est impair tour du joueur 1
            elem.innerHTML = playerOneIcon
        } else {
            // si le nombre de tour est pair tour du joueur 2
            elem.innerHTML = playerTwoIcon
        }
    }
    checkWin()
    lap++
    if (onePlayer && lap % 2 === 0) {
        cpuTurn();
    }
}

//la fonction IA
function cpuTurn() {
    let cpuArray = []
    for (let i = 0; i < htmlGrid.length; i++) {
        if (htmlGrid[i].innerHTML == '') {
            cpuArray.push(i)
        }
    }
    let rand = getRandom(0, cpuArray.length - 1)
    htmlGrid[cpuArray[rand]].click()
}

function checkWin() {
    for (let i = 0; i < tabVictory.length; i++) {
        let a = htmlGrid[tabVictory[i][0]].innerHTML
        let b = htmlGrid[tabVictory[i][1]].innerHTML
        let c = htmlGrid[tabVictory[i][2]].innerHTML

        if (a === b && b === c) {
            if (a === playerOneIcon) {
                document.querySelector('#win').innerHTML = "Le Joueur 1 gagne"
                win = true
            } else if (a === playerTwoIcon) {
                document.querySelector('#win').innerHTML = "Le Joueur 2 gagne"
                win = true
            }
        }
    }
    if (!win) {
        checkTie()
    }
}

function checkTie() {
    let count = 0;
    for (let i = 0; i < htmlGrid.length; i++) {
        if (htmlGrid[i].innerHTML != "" && win == false) {
            count++;
        }
    }
    if (count === htmlGrid.length) {
        document.querySelector("#win").innerHTML = "Egalité";
        win = true

    }
}

function refresh() {
    for (let i = 0; i < htmlGrid.length; i++) {
        htmlGrid[i].innerHTML = ''
        lap = 1
        win = false
        document.querySelector("#win").innerHTML = "";
    }
}