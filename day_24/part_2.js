const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const instructions = dataset.split("\n");

    let tiles = {};
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

        tiles[tile] = tiles[tile] === "black" ? "white" : "black";
    }

    const getNeighbourTiles = (n, e) => {
        let count = 0;
        for (let i = n - 1; i <= n + 1; i += 1) {
            for (let j = e - 1; j <= e + 1; j += 0.5) {
                if (
                    (i % 2 !== 0 && j % 1 === 0) ||
                    (i % 2 === 0 && j % 1 !== 0) ||
                    (i === n && j === e)
                ) {
                    continue;
                }
                if (tiles[[i, j]] === "black") count += 1;
            }
        }
        return count;
    };

    const process = (n, e) => {
        const new_tiles = { ...tiles };
        for (let i = n; i < n * -1; i += 1) {
            for (let j = e; j < e * -1; j += 0.5) {
                if (
                    (i % 2 !== 0 && j % 1 === 0) ||
                    (i % 2 === 0 && j % 1 !== 0)
                ) {
                    continue;
                }
                const count = getNeighbourTiles(i, j);
                if (tiles[[i, j]] === "black" && (count === 0 || count > 2)) {
                    new_tiles[[i, j]] = "white";
                }
                if (
                    ["white", undefined].includes(tiles[[i, j]]) &&
                    count === 2
                ) {
                    new_tiles[[i, j]] = "black";
                }
            }
        }

        return new_tiles;
    };

    const start_n =
        Math.min(...Object.keys(tiles).map((e) => Number(e.split(",")[0]))) - 2;
    const start_e =
        Math.min(...Object.keys(tiles).map((e) => Number(e.split(",")[1]))) - 2;

    for (let i = 0; i < 100; i += 1) {
        tiles = process(start_n - i, start_e - i);
    }

    console.log("🕵️‍♂️", Object.values(tiles).filter((e) => e === "black").length);
})();
