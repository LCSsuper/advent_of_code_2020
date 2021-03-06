const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const seat_codes = dataset.split("\n");

    const convertCodeToId = (code) => {
        let row = 0;
        let seat = 0;
        for (let i = 0; i < 7; i += 1) {
            if (code[i] === "B") row += Math.pow(2, 6 - i);
        }
        for (let i = 0; i < 3; i += 1) {
            if (code[i + 7] === "R") seat += Math.pow(2, 2 - i);
        }

        return row * 8 + seat;
    };

    const seat_ids = seat_codes.map(convertCodeToId);

    console.log("🙍", Math.max(...seat_ids));
})();
