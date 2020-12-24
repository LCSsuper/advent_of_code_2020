const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const instructions = dataset.split("\n");

    const flipped_tiles = {};
    for (const instruction of instructions.map((e) => [...e])) {
        const tile = [0, 0];
        while (instruction.length) {
            let step = instruction.shift();
            if (["n", "s"].includes(step)) {
                step = `${step}${instruction.shift()}`;
            }
            if (step === "nw") {
                tile[0] += 1;
                tile[1] -= 0.5;
            }
            if (step === "ne") {
                tile[0] += 1;
                tile[1] += 0.5;
            }
            if (step === "e") {
                tile[1] += 1;
            }
            if (step === "se") {
                tile[0] -= 1;
                tile[1] += 0.5;
            }
            if (step === "sw") {
                tile[0] -= 1;
                tile[1] -= 0.5;
            }
            if (step === "w") {
                tile[1] -= 1;
            }
        }

        flipped_tiles[tile] =
            flipped_tiles[tile] === "black" ? "white" : "black";
    }
    console.log(
        "🧵",
        Object.values(flipped_tiles).filter((e) => e === "black").length
    );
})();
