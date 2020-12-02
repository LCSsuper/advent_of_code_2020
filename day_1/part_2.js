const dataset = require("./dataset");

(() => {
    for (const value1 of dataset) {
        for (const value2 of dataset) {
            if (dataset.indexOf(value1) === dataset.indexOf(value2)) {
                continue;
            }
            for (const value3 of dataset) {
                if (dataset.indexOf(value2) === dataset.indexOf(value3)) {
                    continue;
                }
                if (value1 + value2 + value3 === 2020) {
                    console.log(
                        "👨‍🔧",
                        value1,
                        value2,
                        value3,
                        value1 * value2 * value3
                    );
                    return;
                }
            }
        }
    }
})();
