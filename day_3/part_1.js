const dataset = require("./dataset");

(() => {
    const width = dataset[0].length;
    let index = 0;
    let tree_count = 0;

    for (const row of dataset) {
        if (index >= width) index -= width;
        if (row[index] === "#") tree_count++;
        index += 3;
    }
    console.log("😲", tree_count);
})();
