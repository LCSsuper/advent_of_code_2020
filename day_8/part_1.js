const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const instructions = dataset.split("\n").map((e) => ({
        act: e.split(" ")[0],
        val: Number(e.split(" ")[1]),
        visited: false,
    }));

    let index = 0;
    let accumulator = 0;

    while (index < instructions.length) {
        const { act, val, visited } = instructions[index];
        if (visited) break;
        instructions[index].visited = true;
        if (act === "acc") accumulator += val;
        index += act === "jmp" ? val : 1;
    }

    console.log("😢", accumulator);
})();
