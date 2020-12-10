const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const numbers = dataset.split("\n").map((e) => Number(e));
    numbers.sort((a, b) => a - b);

    const jumps = {
        1: 0,
        3: 1,
    };

    for (let i = 0; i < numbers.length; i += 1) {
        if (i === 0) {
            jumps[numbers[i]] += 1;
            continue;
        }
        jumps[numbers[i] - numbers[i - 1]] += 1;
    }

    console.log("👨‍🚀", jumps[1] * jumps[3]);
})();
