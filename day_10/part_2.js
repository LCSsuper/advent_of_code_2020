const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    let numbers = dataset.split("\n").map((e) => Number(e));
    numbers = numbers
        .sort((a, b) => a - b)
        .map((e) => ({ value: e, visits: 0 }));

    numbers.unshift({ value: 0, visits: 0 });

    for (const number of numbers) {
        const add_visits = number.visits || 1;
        [1, 2, 3].forEach((step) => {
            const next_number = numbers.find(
                (next_number) => next_number.value === number.value + step
            );
            if (next_number) {
                next_number.visits += add_visits;
            }
        });
    }

    console.log("🎓", numbers.pop().visits);
})();
