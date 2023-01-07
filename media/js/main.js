let deck = [];
let playerHand = [];
let shuffledDeck = [];
let playerTotal = 0;
let ace = false;
let aceCount = 0;

$("#play").on("click", function() {
    Run();
});

$(".play-again").on("click", function() {
    console.log("reload")
    location.reload();
});



// creates an array of 52 playing cards 
function creatDeck() {
    let values = ["A","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];

    deck = [];

    for (let suitsCount = 0; suitsCount < suits.length; suitsCount++) {
        for (let valuesCount = 0; valuesCount < values.length; valuesCount++) {
            deck.push(values[valuesCount] + "-" + suits[suitsCount]);
        }
    }
    return deck
}

// fisher-yeats shuffle
function shuffle(array) {
    console.log(array);
    for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

// deals players first hand
function firstHand(ShuffeldDeck) {
    for(let i = 0; i < 2; i++) {
        let card = ShuffeldDeck.pop();
        console.log("card", card);
        playerHand.push(card);
    }
    console.log("player hand", playerHand);

    for(let i = 0; i < playerHand.length; i++) {
        let img = playerHand[i];
        $( "#card-container" ).append( 
            `<div class="col-3 card playing-card"><img class="card-img" src="media/images/cards/${img}.png" alt=""></div>`
        );
    }
    return playerHand
    // getPlayerScore(playerHand);
}

// calculates the player score from playerHand and updates the total on index.html
function getPlayerScore(playerHand) {
    let valuesList = ["K", "Q", "J"];
    let values = [];
    for(let i = 0; i < playerHand.length; i++) {
        let card = playerHand[i];
        let cardSplit = card.split("-");
        let cardValue = cardSplit[0];
        if(valuesList.includes(cardValue)) {
            cardValue = 10;
            values.push(cardValue);
        } else if(cardValue === "A") {
            cardValue = 11;
            ace = true;
            values.push(cardValue);
        } else if(cardValue === "a") {
            cardValue = 1;
            values.push(cardValue);
        } else {
            cardValue = parseInt(cardValue);
            values.push(cardValue);
        }
        console.log(values);
        console.log(aceCount); 
    }

    let playerTotal = values.reduce(function(a, b){
        return a + b;
    }, 0);
    $( "#player-total" ).html(playerTotal);
    return playerTotal
}

function checkScore(playerTotal, playerHand) {
    console.log("player total", playerTotal)
    console.log(ace)
    if(playerTotal === 21) {
        playerWin();
    } else if(playerTotal < 21) {
        hitOrStick(playerTotal);
        return playerHand
    } if(playerTotal > 21) {
        console.log("total is bust")
        if(ace) {
            let aceList = ["A-H", "A-C", "A-D", "A-S"]
            console.log("pre ace player hand", playerHand)
            for(let i = 0; i < playerHand.length; i++) {
                console.log(playerHand[i])
                if(!playerHand.some(r=> aceList.indexOf(r) >= 0)){
                    bust(playerTotal)
                    return playerHand
                }
                if(aceList.includes(playerHand[i])) {
                    let card = playerHand[i]
                    let cardSplit = card.split("-")
                    let cardSuit = cardSplit[1]
                    let newCard = ["a-" + cardSuit]
                    playerHand[i] = newCard[0]
                    console.log("small ace player hand", playerHand)
                    i = playerHand.length
                    return playerHand
                }
            }
            console.log(ace);
        } else {
            console.log("busting")
            bust(playerTotal)
            return playerHand
        }
    }
}

function hitOrStick(playerTotal) {
    $("#hit").css({
        display: "block"
      });
      $("#stick").css({
        display: "block"
      });
      $("#play").css({
        display: "none"
      });
}

function stick() {
    computerTurn()
}

function hit(shuffledDeck) {
    console.log('hit deck', shuffledDeck)
    let card = shuffledDeck.pop();
    console.log("card", card);
    playerHand.push(card);
    console.log("player hand after hit", playerHand);

    let img = card;
    $( "#card-container" ).append( 
        `<div class="col-3 card playing-card"><img class="card-img" src="media/images/cards/${img}.png" alt=""></div>`
    );
    hitLoop(playerHand)
}

function playerWin() {
    $("#btn-container").css({
        display: "none",
        visibility: "hidden"
    });
    $("#winner" ).css({
        display: "block"
    });
}

function bust(playerTotal) {
    $("#btn-container").css({
        display: "none",
        visibility: "hidden"
    });
    $("#bust" ).css({
        display: "block"
    });
    $( "#bust-total" ).html(playerTotal);
}

function Run() {
    let deck = creatDeck();
    let shuffledDeck = [];
    console.log('playing');
    shuffledDeck = shuffle(deck);
    // shuffledDeck = ["10-H", "10-D", "2-D", "4-H" ,"A-S", "A-H", "2-H"]
    console.log("suffeled deck", shuffledDeck);
    playerHand = firstHand(shuffledDeck);
    playerTotal = getPlayerScore(playerHand)
    playerhand = checkScore(playerTotal, playerHand)
    playerTotal = getPlayerScore(playerHand)
    playerhand = checkScore(playerTotal, playerHand)
    $("#hit").on("click", function() {
        hit(shuffledDeck);
    });
}

function hitLoop(playerHand) {
    playerTotal = getPlayerScore(playerHand)
    console.log("checkpoint 1")
    playerHand = checkScore(playerTotal ,playerHand)
    console.log("checkpoint 2")
    playerTotal = getPlayerScore(playerHand)
    console.log("checkpoint 3")
    playerHand = checkScore(playerTotal ,playerHand)
}

function computerTurn() {
    console.log("sticking")
    console.log(playerTotal)
    console.log(shuffledDeck)
}