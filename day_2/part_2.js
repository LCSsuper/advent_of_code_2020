const dataset = require("./dataset");

(() => {
    let valid_count = 0;
    for (const row of dataset) {
        const [validator, password] = row.split(": ");
        const [positions, letter] = validator.split(" ");
        const [pos1, pos2] = positions.split("-");
        if (password.length < pos2) continue;
        const letter1 = password[Number(pos1) - 1];
        const letter2 = password[Number(pos2) - 1];
        if ((letter1 === letter) ^ (letter2 === letter)) valid_count += 1;
    }
    console.log("😻", valid_count);
})();
