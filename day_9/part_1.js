const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const numbers = dataset.split("\n").map((e) => Number(e));

    const checkNumberValid = (at_index, look_back) => {
        const check_number = numbers[at_index];

        for (let i = at_index - look_back; i < at_index; i += 1) {
            for (let j = at_index - look_back; j < at_index; j += 1) {
                if (i === j) continue;
                if (numbers[i] + numbers[j] === check_number) return true;
            }
        }
        return false;
    };

    let index = 25;
    let number_is_valid = true;
    while (index < numbers.length && number_is_valid) {
        number_is_valid = checkNumberValid(index, 25);
        index += 1;
    }

    console.log("👨‍🚀", numbers[index - 1]);
})();
