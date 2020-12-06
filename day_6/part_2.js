const fs = require("fs");

(() => {
    let total = 0;
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const answer_groups = dataset.split("\n\n").map((e) => e.split("\n"));

    for (const answer_group of answer_groups) {
        let group_total = 0;
        const answer = answer_group.shift();
        for (const question of [...answer]) {
            if (
                answer_group.reduce((acc, val) => {
                    if (!acc) return false;
                    return [...val].indexOf(question) > -1;
                }, true)
            )
                group_total += 1;
        }
        total += group_total;
    }
    console.log("👷‍♀️", total);
})();
