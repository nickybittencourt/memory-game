function updateHighScoreLabel() {

    document.getElementById("high-score").innerHTML = localStorage.getItem("highScore")

    document.getElementById("high-score-form").value = localStorage.getItem("highScore")
}

function restart() {

    window.location.href = "./index.html"
}

function validateForm() {
    var x = document.forms["submit"]["userName"].value;
    
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }

    return true
}

function showLeaderboard() {
    
    window.location.href = "./leaderboard.ejs";
}

window.onload = updateHighScoreLabel()