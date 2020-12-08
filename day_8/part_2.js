const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const instructions = dataset.split("\n").map((e) => ({
        act: e.split(" ")[0],
        val: Number(e.split(" ")[1]),
        visited: false,
    }));

    const check_indexes = instructions
        .map((e, i) => ({ act: e.act, i }))
        .filter((e) => ["nop", "jmp"].includes(e.act))
        .map((e) => e.i);

    const findAccOrBreak = (change_index) => {
        let index = 0;
        let accumulator = 0;

        instructions.forEach((e) => (e.visited = false));

        while (index < instructions.length) {
            let { act } = instructions[index];
            const { val, visited } = instructions[index];
            if (index === change_index) {
                act = act === "jmp" ? "nop" : "jmp";
            }
            if (visited) return "BREAK";
            instructions[index].visited = true;
            if (act === "acc") accumulator += val;
            index += act === "jmp" ? val : 1;
        }

        return accumulator;
    };

    for (const index of check_indexes) {
        const answer = findAccOrBreak(index);
        if (answer !== "BREAK") {
            console.log("😓", answer);
        }
    }
})();
