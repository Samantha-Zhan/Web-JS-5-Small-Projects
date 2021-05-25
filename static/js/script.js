//
// challenge 1: your age in days
//
function ageInDays(){
    let birthYear = prompt("Which year were you born, my friend?");
    let date = new Date();
    let currentYear = date.getFullYear();
    let numDays  = (currentYear - birthYear) * 365;
    //console.log(numDays);
    // passing data to html file
    /* let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('You are '+numDays+' days old');
    h1.setAttribute('id', 'ageInDays'); // set id of element to ageInDays
    h1.appendChild(textAnswer);
    // document.getElementById("text-input").remove;
    document.getElementById("age-result").appendChild(h1); */
    document.getElementById("text-input").innerText = 'You are '+numDays+' days old';
}
function reset(){
    document.getElementById("text-input").innerText = 'You are __ days old';
}

//
// Challenge 2
//
function generateCat() {
    let img = document.createElement('img');
    let div = document.getElementById("imgs-frame");
    img.src = "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80";
    div.appendChild(img);
}

//
// Challenge 3
//
function rpsGame(image){
    let humanChoice = image.alt;
    let botChoice = randomChoice();
    let result = decideWinner(humanChoice, botChoice);
    let message = finalMessage(result);
    // console.log(botChoice);
    // console.log(message);
    rpsFrontEnd(humanChoice, botChoice, message);
}

function randomChoice(){
    let int_result = Math.floor(Math.random() * 3);
    let choice_arr = ["rock", "paper", "scissor"];
    return choice_arr[int_result];
    // return  int_result;
}

function decideWinner(humanChoice, botChoice) {
    // r p s => p r s
    // p > r  p < s
    // r > s
    let rpsDataBase = {
        "rock": {"scissor": 1, "rock": 0, "paper": 2},
        "paper": {"scissor": 2, "rock": 1, "paper": 0},
        "scissor": {"scissor": 0, "rock": 2, "paper": 1}
    }
    let result = rpsDataBase[humanChoice][botChoice];
    return result;
}

function finalMessage(result) {
    let resultMessages = [{"message":"You tied!", "color": "orange"}, 
    {"message":"You won!", "color": "green"}, {"message":"You lost!", "color": "red"}];
    return resultMessages[result];
}

function rpsFrontEnd(humanChoice, botChoice, finalMessage){
    var imagesDatabase = {
        "rock": document.getElementById("rock").src,
        "paper": document.getElementById("paper").src,
        "scissor": document.getElementById("scissor").src
    }
    // remove all images:
    document.getElementById("rock").style.display="none";
    document.getElementById("paper").style.display="none";
    document.getElementById("scissor").style.display="none";
    // add image and text
    let img1 = document.createElement("img");
    img1.setAttribute("id", "img1");
    img1.src = imagesDatabase[humanChoice];
    let img2 = document.createElement("img");
    img2.setAttribute("id", "img2");
    img2.src = imagesDatabase[botChoice];
    let h2 = document.createElement("h2");
    let text = document.createTextNode(finalMessage["message"]);
    h2.appendChild(text);
    h2.setAttribute("id", "text result");
    h2.style.color = finalMessage["color"];
    h2.style.fontWeight = "bold";
    document.getElementById("rps").appendChild(img1);
    document.getElementById("rps").appendChild(h2);
    // document.getElementById("text result").style.color= finalMessage["color"];
    document.getElementById("rps").appendChild(img2);
}

function restartRps() {
    document.getElementById("rock").style.display="flex";
    document.getElementById("paper").style.display="flex";
    document.getElementById("scissor").style.display="flex";
    document.getElementById("img1").remove();
    document.getElementById("img2").remove();
    document.getElementById("text result").remove();
}

//
// challenge 4
//

let allButtons = document.getElementsByTagName("button");
console.log(allButtons);


let cpyButtons = [];
for(let i = 0; i < allButtons.length; i++){
    cpyButtons.push(allButtons[i].classList[1]);
}
console.log(cpyButtons);


function buttonColorChange(btn) {
    if(btn.value === "red"){
        buttonsAllChange("btn-danger")
    } else if (btn.value === "green") {
        buttonsAllChange("btn-success");
    } else if (btn.value === "random") {
        buttonsRandom();
    } else {
        buttonsReset();
    }
}

function buttonsAllChange(classPath){
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(classPath);
        // console.log(1);
    }
}

function buttonsReset() {
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(cpyButtons[i]);
    }
}

function buttonsRandom() {
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(generateRandomBtn());
    }
}

function generateRandomBtn(){
    let btnsColor = ["btn-primary", "btn-danger", "btn-warning", "btn-success"];
    let randNum  = Math.floor(Math.random() * 4);
    return btnsColor[randNum];
}


// Challenge 5: Blackjack
// query selector
let blackjackGame = {
    'you': {'scoreSpan': "#your-result", 'divSpan': "#your-box", 'score': 0},
    'dealer': {'scoreSpan': "#dealer-result", 'divSpan': "#dealer-box", 'score':0},
    'cards': ['2C', '3D', '4H', '5S', '6C', '7D', '8H', '9S', '10C', 'JD', 'QH', 'KS', 'AC'],
    'cardsMap': {'2C':2, '3D':3, '4H':4, '5S':5, '6C':6, '7D':7, '8H':8, '9S':9, '10C':10, 'JD':10, 'QH':10, 'KS':10, 'AC':[1,11]},
    'result': {'win': {"message": "You won!", "color": "green"}, 'lose': {"message" : "You lost...", "color":"red"}, "tie":{"message": "You drew", "color":"orange"}},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false, // after hitting stand
    'turnsOver': false,  // after hitting both hit and stand
}

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];
const CARDS = blackjackGame['cards'];
const cardsMap = blackjackGame["cardsMap"];
const RESULT = blackjackGame["result"];
document.querySelector("#hit").addEventListener("click", blackjackHit);
//                      #id                      click event      function name
const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const loseSound = new Audio("sounds/aww.mp3");
document.querySelector("#deal").addEventListener('click', blackjackDeal);
document.querySelector("#stand").addEventListener("click", blackjackStand);


function blackjackHit(){
    if(blackjackGame["isStand"] == false) {
        let cardChosen = randomCard();
        updateScore(YOU, cardChosen);
        showCard(YOU, cardChosen);
        showScore(YOU);
        // console.log(YOU['score']);
    }
}

function updateScore(activePlayer, cardChosen) {
    let cardValue = cardsMap[cardChosen];
    if (cardChosen === "AC") {
        if (activePlayer["score"]+cardValue[1]<= 21) {
            cardValue = cardValue[1];
        } else {
            cardValue = cardValue[0];
        }
    }
    activePlayer["score"] += cardValue;
}

function showScore(activePlayer) {
    if (activePlayer["score"] <= 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer["score"];
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = "BUST!";
        document.querySelector(activePlayer['scoreSpan']).style.color = "red";
    }
}

// get a new card, show on screen
function showCard(activePlayer, cardName){
    if (activePlayer["score"] <= 21) {
        hitSound.play();
        let cardImage = document.createElement('img');
        cardImage.src = "cards/"+cardName+".png";
        // console.log(YOU["divSpan"]);
        document.querySelector(activePlayer["divSpan"]).appendChild(cardImage);
    } 
}

function blackjackDeal(){
    // showFinalResult();
    if (blackjackGame["isStand"] == true) {
        let yourImages = document.querySelector(YOU['divSpan']).querySelectorAll("img");
        for(let i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
        }
        let dealerImages = document.querySelector(DEALER['divSpan']).querySelectorAll("img");
        for(let i = 0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER["score"] = 0;
        showScore(YOU);
        showScore(DEALER);
        document.querySelector(YOU['scoreSpan']).style.color = "white";
        document.querySelector(DEALER['scoreSpan']).style.color = "white";
        document.querySelector('#blackjack-result').style.color = 'black';
        document.querySelector('#blackjack-result').textContent = "Let's play";
        blackjackGame["isStand"] = false;
        blackjackGame["turnsOver"] = false;
    }
    


}

function showFinalResult() {
    let result = compScore();
    if (result === "win") {
        winSound.play();
        blackjackGame['wins']++;
        document.querySelector('#wins').textContent = blackjackGame['wins'];
    } else if (result === "lose") {
        loseSound.play();
        blackjackGame['losses']++;
        document.querySelector('#losses').textContent = blackjackGame['losses'];
    } else {
        blackjackGame['draws']++;
        document.querySelector('#draws').textContent = blackjackGame['draws'];
    }
    document.querySelector("#blackjack-result").style.color = RESULT[result]["color"];
    document.querySelector("#blackjack-result").textContent = RESULT[result]["message"];    
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    let randomCardName = CARDS[randomIndex];
    return randomCardName;
}

async function blackjackStand() {
    if (blackjackGame["isStand"] == false) {
        while(DEALER["score"] <= 15) {
            let cardChosen = randomCard();
            updateScore(DEALER, cardChosen);
            showCard(DEALER, cardChosen);
            showScore(DEALER);
            await sleep(500);
        }
        showFinalResult();
        blackjackGame["isStand"] = true;
    }
    
}

function compScore(){
    let youScore = YOU["score"];
    let dealerScore = DEALER["score"];
    console.log("Your score " + youScore);
    console.log("Dealer score "+ dealerScore);
    let result = "";
    if ((youScore > 21 && dealerScore > 21) || youScore == dealerScore) {
        result = "tie";
        
    } else if (youScore > 21 || (dealerScore <= 21 && youScore < dealerScore)) {
        result = "lose";
        
    } else {
        result = "win";
        
    }
    return result;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


