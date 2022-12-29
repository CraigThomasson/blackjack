let deck = []
let playerHand = []
let shuffledDeck = []

$("#play").on("click", function() {
    console.log('playing')
    deck = creatDeck()
    shuffledDeck = shuffle(deck)
    console.log("suffeled deck", shuffledDeck)
    firstHand(shuffledDeck)
})

// creates an array of 52 playing cards 
function creatDeck() {
    let values = ["A","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];

    deck = [];

    for (let suitsCount = 0; suitsCount < suits.length; suitsCount++) {
        for (let valuesCount = 0; valuesCount < values.length; valuesCount++) {
            deck.push(values[valuesCount] + "-" + suits[suitsCount])
        }
    }
    return deck
}

// fisher-yeats shuffle
function shuffle(array) {
    console.log(array)
    for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

// deals players first hand
function firstHand(ShuffeldDeck) {
    for(let i = 0; i < 2; i++) {
        let card = ShuffeldDeck.pop()
        console.log("card", card)
        playerHand.push(card)
    }
    console.log("player hand", playerHand)

    for(let i = 0; i < playerHand.length; i++) {
        let img = playerHand[i]
        $( "#card-container" ).append( 
            `<div class="col-3 card playing-card"><img class="card-img" src="media/images/cards/${img}.png" alt=""></div>`
        );
    }
}