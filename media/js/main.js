let deck = [];
let playerHand = [];
let shuffledDeck = [];
let playerTotal = 0;
let ace = false;
let aceCount = 0;

$("#play").on("click", function() {
    testRun();
});

$(".play-again").on("click", function() {
    console.log("reload")
    location.reload();
});

$("#stick").on("click", function() {
    stick();
})

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
    getPlayerScore(playerHand);
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
            aceCount ++;
            values.push(cardValue);
        } else {
            cardValue = parseInt(cardValue);
            values.push(cardValue);
        }
        console.log(values);
        let playerTotal = values.reduce(function(a, b){
            return a + b;
        }, 0);
        $( "#player-total" ).html(playerTotal);
        console.log(ace);
        console.log(aceCount);
        checkScore(playerTotal);
    }
}

function checkScore(playerTotal) {
    if(playerTotal === 21) {
        playerWin();
    } else if(playerTotal < 21) {
        hitOrStick();
    } if(playerTotal > 21) {
        bust()
    }
}

function hitOrStick() {
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
    
}

function hit(shuffledDeck) {
    console.log('hit deck', shuffledDeck)
    let card = shuffledDeck.pop();
    console.log("card", card);
    playerHand.push(card);
    console.log("player hand", playerHand);

    let img = card;
    $( "#card-container" ).append( 
        `<div class="col-3 card playing-card"><img class="card-img" src="media/images/cards/${img}.png" alt=""></div>`
    );
  
    getPlayerScore(playerHand);
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

function bust() {
    $("#btn-container").css({
        display: "none",
        visibility: "hidden"
    });
    $("#bust" ).css({
        display: "block"
    });
}

function run() {
    let deck = []
    let playerHand = []
    let shuffledDeck = []
    let ace = false
    let aceCount = 0
    console.log('playing');
    deck = creatDeck();
    shuffledDeck = shuffle(deck);
    console.log("suffeled deck", shuffledDeck);
    firstHand(shuffledDeck);
}

function testRun() {
    let deck = creatDeck();
    let shuffledDeck = []
    console.log('playing');
    shuffledDeck = shuffle(deck);
    console.log("suffeled deck", shuffledDeck);
    firstHand(shuffledDeck);
    $("#hit").on("click", function() {
        hit(shuffledDeck);
    });
}
