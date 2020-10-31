let score = 0
let highScore = 0
let gridWidth = 4
let gridHeight = 4
let difficulty = 3
let cardsLeft = difficulty
let animating = false

function generateBoard(height, width, difficulty) { 

    cardsLeft = difficulty
    clearBoard()

    let deck = document.createElement("div")
    deck.id = "deck"
    document.getElementById("game-container").appendChild(deck)
    deck.style.width = `${width * 7.8}vh`

    for (let i = 0; i < width; i++) {

        let row = document.createElement("div")
        row.className = "row"
    
    for (let j = 0; j < height; j++) {

        let card = document.createElement("div")
        card.className = "card"

        row.appendChild(card)
    }
        
    deck.appendChild(row)
    }

    setSelectedCards(difficulty)
    setOnClicks()
    showSelected()
}

function showSelected() {

    animating = true

    setTimeout(function () {
        
        document.querySelectorAll(".selected").forEach(card => {
        
            card.style.backgroundColor = "#007d75"
       
        });

        setTimeout(function () {
            document.querySelectorAll(".selected").forEach(card => {
        
            card.style.backgroundColor = "#87C9A1"
        });

        }, 2000);


        setTimeout(function () {

            let deck = $('#deck')

            $({rotation: 0}).animate({rotation: 90}, {
                duration: 1000,
                easing: 'swing',
                complete: function() {animating = false},
                step: function () {
                    deck.css({ transform: 'rotate(' + this.rotation + 'deg)' });
                }
            })

        }, 2100);

    }, 650)
}

function setOnClicks() {

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("click", wrongSelection)
    })

    document.querySelectorAll(".selected").forEach(card => {

        card.addEventListener("click", correctSelection)
    })
}

function setSelectedCards(difficulty) {

    let cards = document.querySelectorAll(".card")
    let selectedIndexes = []

    while (difficulty != 0) {
        
        let randomIndex = Math.floor(Math.random() * cards.length);

        if (!selectedIndexes.includes(randomIndex)) {

            cards[randomIndex].className = "selected"
            difficulty -= 1
            selectedIndexes.push(randomIndex)

        } 
    }

}

function correctSelection() {

    if (!animating) { 
        this.removeEventListener("click", correctSelection)
        this.style.backgroundColor = "#007d75";
        cardsLeft -= 1

        if (cardsLeft == 0) {
            gameWin()
        }   
    }
}

function increaseDifficulty() {

    let rand = Math.floor(Math.random() * 4)

        switch(rand) {
            case 0:
                if (gridWidth < 7) {
                    gridWidth += 1
                }
            break;
            case 1:
                if (gridHeight < 7) {
                    gridHeight += 1
                }
            break;
            case 2:
                if (difficulty < 49) {
                    difficulty += 1
                }
            break;
            default:
                if (gridWidth < 7) {
                    gridWidth += 1
                }
                if (gridHeight < 7) {
                    gridHeight += 1
                }
                if (difficulty < 49) {
                    difficulty += 1
                }
        } 

}

function decreaseDifficulty() {

    let rand = Math.floor(Math.random() * 4)

        switch(rand) {
            case 0:
                if (gridWidth > 4) {
                    gridWidth -= 1
                }
            break;
            case 1:
                if (gridHeight > 4) {
                    gridHeight -= 1
                }
            break;
            case 2:
                if (difficulty > 1) {
                    difficulty -= 1
                }
            break;
            default:
                if (gridWidth > 4) {
                    gridWidth -= 1
                }
                if (gridHeight > 4) {
                    gridHeight -= 1
                }
                if (difficulty > 1) {
                    difficulty -= 1
                }
        } 

}

function gameWin() {
    score += 1

    if (score > highScore) {
        highScore = score
    }
    updateScoreLabel()
    document.getElementById("rightSelection").play()
    increaseDifficulty()
    generateBoard(gridHeight, gridWidth, difficulty)
}

function gameOver() {

    document.getElementById("gameOver").play()
    localStorage.setItem("highScore", highScore);

    setTimeout(() => {
        window.location.href = "./summary.html"
    }, 3400);
}

function updateScoreLabel() {

    document.getElementById("score").innerHTML = score
}

function wrongSelection(event) {

    if (!animating) {

        document.getElementById("wrongSelection").play()
   
        if (score > 0) {
            
            score -= 1
            updateScoreLabel()

            if (score == 0) {
                gameOver()

            } else {

                decreaseDifficulty()
                console.log(gridHeight, gridWidth, difficulty)
                generateBoard(gridHeight, gridWidth, difficulty)
            }
        } else {

            gameOver()
        }
    }
}

function clearBoard() { 

    document.querySelectorAll(".card").forEach(card => {
        
        card.remove()
    });

    document.querySelectorAll(".selected").forEach(card => {

        card.remove()
    })

    document.querySelector("#deck").remove()
}

function userEndGame() {

    var r = confirm("Are you sure you want to end the game?");

    if (r == true) {

        localStorage.setItem("highScore", highScore);
        window.location.href = "./summary.html";
    } 
}

function setUpGame() {

    let playButton = document.getElementById("play-button")
    playButton.innerHTML = "End Game"
    playButton.onclick = null
    playButton.addEventListener("click", userEndGame)

    if (!animating) {

        score = 0
        gridWidth = 4
        gridHeight = 4
        difficulty = 3
        cardsLeft = difficulty
        updateScoreLabel()
        generateBoard(4, 4, 3)
    }
}