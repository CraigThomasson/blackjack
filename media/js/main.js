deck = []

$("#play").on("click", function() {
    console.log('playing')
    deck = creatDeck()
    console.log("deck", deck)
    shuffle(deck)
    console.log("suffeled deck", deck)
})

function creatDeck() {
    let values = ["A","2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suits = ["C", "D", "H", "S"];

    deck = [];

    for (let suitsCount = 0; suitsCount < suits.length; suitsCount++) {
        for (let valuesCount = 0; valuesCount < values.length; valuesCount++) {
            deck.push(values[valuesCount] + "-" + suits[suitsCount])
        }
    }
    return(deck)
}

// fisher-yeats shuffle
function shuffle(array) {
    console.log(array)
    for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
}
