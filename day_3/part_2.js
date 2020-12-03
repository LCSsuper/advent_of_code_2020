const dataset = require("./dataset");

(() => {
    const width = dataset[0].length;
    const getTreeCount = (interval_right, interval_down) => {
        let index = 0;
        let tree_count = 0;

        for (let i = 0; i < dataset.length; i += interval_down) {
            if (index >= width) index -= width;
            if (dataset[i][index] === "#") tree_count++;
            index += interval_right;
        }
        return tree_count;
    };

    const answers = [
        getTreeCount(1, 1),
        getTreeCount(3, 1),
        getTreeCount(5, 1),
        getTreeCount(7, 1),
        getTreeCount(1, 2),
    ];
    const first = answers.shift();
    const answer = answers.reduce((acc, val) => acc * val, first);
    console.log("🤱", answer);
})();
