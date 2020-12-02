const dataset = require("./dataset");

(() => {
    for (const value of dataset) {
        const remaining = 2020 - value;
        if (dataset.find((e) => e === remaining)) {
            console.log("😓", value, remaining, value * remaining);
            return;
        }
    }
})();
