const gameUrl = "http://localhost:3000/games"
function fetchData(){
    fetch(gameUrl).then(r => r.json())
    .then(games => {
        games.forEach(game => renderGame(game))
        showGameDetails(games[0])
    })
}

function renderGame(game){
    const gameList = document.getElementById("game-list")
    const gameTag = document.createElement("h5")

    gameTag.textContent = `${game.name}(${game['manufacturer_name']} hello)`

    gameList.appendChild(gameTag)

    gameTag.addEventListener("click", ()=> showGameDetails(game))
    
}

function showGameDetails(game){
    const gameImg = document.getElementById("detail-image")
    const gameTitle = document.getElementById("detail-title")
    const gameScore = document.getElementById("detail-high-score")

    gameImg.src = game.image
    gameTitle.textContent = game.name
    gameScore.textContent = game['high_score']

    const scoreForm = document.getElementById("high-score-form")
    const scoreInput = document.getElementById("score-input")

    scoreForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        newHighScore(game,gameScore)
        scoreForm.reset()
    })
}

function newHighScore(game,gameScore){
    const scoreInput = document.getElementById("score-input")

    fetch(`${gameUrl}/${game.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            "high_score": scoreInput.value
        })
    })
    .then(r=>r.json())
    .then(scoreData => {
        gameScore.textContent = `${scoreData['high_score']}`
    })
}

fetchData()