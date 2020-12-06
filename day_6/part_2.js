const fs = require("fs");

(() => {
    let total = 0;
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const answer_groups = dataset
        .split("\n\n")
        .map((e) => e.split("\n").map((x) => [...x]));

    for (const answer_group of answer_groups) {
        let intersect = answer_group.shift();
        for (const answers of answer_group) {
            intersect = intersect.filter((x) => answers.includes(x));
        }
        total += intersect.length;
    }
    console.log("👷‍♀️", total);
})();
