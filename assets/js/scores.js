function printHighscores() {
    //get scores from localstorage or set an empty array
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    //sort scores in descending order
    highscores.sort(function (a, b) {
       return b.score - a.score;
    });
    for (var i = 0; i < highscores.length; i += 1){
    var liTag = document.createElement('li');
    liTag.textContent = highscores[i],initials + ' - ' + highscores[i].score;

    //display on page
    var olEl = document.getElementById('highscores');
    olEl.appendChild(liTag);
    }
}
function clearHighscores() {
    window.localStorage.removeItem('highscores');
    window.location.reload();
}
document.getElementById('clear').onclick = clearHighscores;
//run when page loads
printHighscores();