const { player1, player2 } = require("./dataset");

(() => {
    const play = (deck1, deck2) => {
        const rounds = [];
        while (deck1.length && deck2.length) {
            if (rounds.includes(JSON.stringify([deck1, deck2]))) {
                return [deck1, []];
            }
            rounds.push(JSON.stringify([deck1, deck2]));
            const card1 = deck1.shift();
            const card2 = deck2.shift();
            let round_winner;
            if (deck1.length >= card1 && deck2.length >= card2) {
                const [result1] = play(
                    [...deck1].slice(0, card1),
                    [...deck2].slice(0, card2)
                );
                round_winner = result1.length ? 1 : 2;
            } else {
                round_winner = card1 > card2 ? 1 : 2;
            }
            if (round_winner === 1) {
                deck1.push(card1);
                deck1.push(card2);
            } else {
                deck2.push(card2);
                deck2.push(card1);
            }
        }

        return [deck1, deck2];
    };

    const [deck1, deck2] = play(player1, player2);
    const winner = (deck1.length ? deck1 : deck2).reverse();

    let score = 0;
    for (let i = 0; i < winner.length; i += 1) {
        score += winner[i] * (i + 1);
    }
    console.log("👳‍♂️", score);
})();
