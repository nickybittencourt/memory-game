function updateHighScoreLabel() {

    document.getElementById("high-score").innerHTML = localStorage.getItem("highScore")
}

function restart() {

    window.location.href = "./index.html"
}

window.onload = updateHighScoreLabel()