const { player1, player2 } = require("./dataset");

(() => {
    while (player1.length && player2.length) {
        const card1 = player1.shift();
        const card2 = player2.shift();
        if (card1 > card2) {
            player1.push(card1);
            player1.push(card2);
        } else {
            player2.push(card2);
            player2.push(card1);
        }
    }

    const winner = (player1.length ? player1 : player2).reverse();

    let score = 0;
    for (let i = 0; i < winner.length; i += 1) {
        score += winner[i] * (i + 1);
    }
    console.log("👳‍♂️", score);
})();
