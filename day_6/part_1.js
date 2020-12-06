const fs = require("fs");

(() => {
    let total = 0;
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const answer_groups = dataset
        .split("\n\n")
        .map((e) => e.split("\n").join(""));

    for (const answer_group of answer_groups) {
        const answers = [...answer_group];
        total += new Set(answers).size;
    }
    console.log("👷‍♀️", total);
})();
