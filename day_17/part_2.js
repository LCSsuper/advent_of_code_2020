const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    let pocket = [
        [dataset.split("\n").map((x) => x.split("").map((y) => y === "#"))],
    ];

    const expandPocket = () => {
        const new_length = pocket[0][0][0].length + 2;
        for (let w = 0; w < pocket.length; w += 1) {
            for (let z = 0; z < pocket[w].length; z += 1) {
                for (let x = 0; x < pocket[w][z].length; x += 1) {
                    pocket[w][z][x].unshift(false);
                    pocket[w][z][x].push(false);
                }
            }
        }
        for (let w = 0; w < pocket.length; w += 1) {
            for (let z = 0; z < pocket[w].length; z += 1) {
                pocket[w][z].unshift(Array(new_length).fill(false));
                pocket[w][z].push(Array(new_length).fill(false));
            }
        }
        for (let w = 0; w < pocket.length; w += 1) {
            pocket[w].unshift(
                Array(new_length).fill(Array(new_length).fill(false))
            );
            pocket[w].push(
                Array(new_length).fill(Array(new_length).fill(false))
            );
        }
        pocket.unshift(
            Array(new_length).fill(
                Array(new_length).fill(Array(new_length).fill(false))
            )
        );
        pocket.push(
            Array(new_length).fill(
                Array(new_length).fill(Array(new_length).fill(false))
            )
        );
    };

    const activeNeighbors = (pos) => {
        let active_neighbors = 0;
        let count = 0;
        for (let w = pos.w - 1; w < pos.w + 2; w += 1) {
            for (let z = pos.z - 1; z < pos.z + 2; z += 1) {
                for (let x = pos.x - 1; x < pos.x + 2; x += 1) {
                    for (let y = pos.y - 1; y < pos.y + 2; y += 1) {
                        if (
                            w === pos.w &&
                            z === pos.z &&
                            x === pos.x &&
                            y === pos.y
                        )
                            continue;
                        if (pocket[w]?.[z]?.[x]?.[y]) active_neighbors += 1;
                    }
                }
            }
        }

        return active_neighbors;
    };

    const runCycle = () => {
        expandPocket();
        const new_pocket = JSON.parse(JSON.stringify(pocket));
        for (let w = 0; w < pocket.length; w += 1) {
            for (let z = 0; z < pocket[w].length; z += 1) {
                for (let x = 0; x < pocket[w][z].length; x += 1) {
                    for (let y = 0; y < pocket[w][z][x].length; y += 1) {
                        const active_neighbors = activeNeighbors({
                            z,
                            x,
                            y,
                            w,
                        });
                        if (
                            pocket[w][z][x][y] &&
                            ![2, 3].includes(active_neighbors)
                        ) {
                            new_pocket[w][z][x][y] = false;
                        } else if (
                            !pocket[w][z][x][y] &&
                            active_neighbors === 3
                        ) {
                            new_pocket[w][z][x][y] = true;
                        }
                    }
                }
            }
        }
        pocket = new_pocket;
    };

    runCycle();
    runCycle();
    runCycle();
    runCycle();
    runCycle();
    runCycle();

    let total_active = 0;
    pocket.forEach((w) => {
        w.forEach((z) => {
            z.forEach((x) => {
                x.forEach((y) => {
                    if (y) total_active += 1;
                });
            });
        });
    });

    console.log("🧝‍♀️", total_active);
})();
