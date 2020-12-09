const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const numbers = dataset.split("\n").map((e) => Number(e));
    const number_to_find = 556543474;

    for (let i = 0; i < numbers.length; i += 1) {
        let sum = 0;
        for (let j = i; j < numbers.length; j += 1) {
            sum += numbers[j];
            if (sum > number_to_find) break;
            if (sum === number_to_find) {
                const sum_numbers = numbers
                    .filter((_, index) => index >= i && index <= j)
                    .sort();

                console.log("🤮", sum_numbers.shift() + sum_numbers.pop());
                return;
            }
        }
    }
})();
