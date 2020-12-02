const dataset = require("./dataset");

(() => {
    let valid_count = 0;
    for (const row of dataset) {
        const [validator, password] = row.split(": ");
        const [amounts, letter] = validator.split(" ");
        const [min, max] = amounts.split("-");
        const occurrences = (password.match(new RegExp(letter, "g")) || [])
            .length;
        if (occurrences >= Number(min) && occurrences <= Number(max)) {
            valid_count += 1;
        }
    }
    console.log("👆", valid_count);
})();
