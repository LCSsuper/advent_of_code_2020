const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    let pocket = [
        dataset.split("\n").map((x) => x.split("").map((y) => y === "#")),
    ];

    const expandPocket = () => {
        const new_length = pocket[0][0].length + 2;
        for (let z = 0; z < pocket.length; z += 1) {
            for (let x = 0; x < pocket[z].length; x += 1) {
                pocket[z][x].unshift(false);
                pocket[z][x].push(false);
            }
        }
        for (let z = 0; z < pocket.length; z += 1) {
            pocket[z].unshift(Array(new_length).fill(false));
            pocket[z].push(Array(new_length).fill(false));
        }
        pocket.unshift(Array(new_length).fill(Array(new_length).fill(false)));
        pocket.push(Array(new_length).fill(Array(new_length).fill(false)));
    };

    const activeNeighbors = (pos) => {
        let active_neighbors = 0;
        for (let z = pos.z - 1; z < pos.z + 2; z += 1) {
            for (let x = pos.x - 1; x < pos.x + 2; x += 1) {
                for (let y = pos.y - 1; y < pos.y + 2; y += 1) {
                    if (z === pos.z && x === pos.x && y === pos.y) continue;
                    if (pocket[z]?.[x]?.[y]) active_neighbors += 1;
                }
            }
        }

        return active_neighbors;
    };

    const runCycle = () => {
        expandPocket();
        const new_pocket = JSON.parse(JSON.stringify(pocket));
        for (let z = 0; z < pocket.length; z += 1) {
            for (let x = 0; x < pocket[z].length; x += 1) {
                for (let y = 0; y < pocket[z][x].length; y += 1) {
                    const active_neighbors = activeNeighbors({ z, x, y });
                    if (pocket[z][x][y] && ![2, 3].includes(active_neighbors)) {
                        new_pocket[z][x][y] = false;
                    } else if (!pocket[z][x][y] && active_neighbors === 3) {
                        new_pocket[z][x][y] = true;
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
    pocket.forEach((z) => {
        z.forEach((x) => {
            x.forEach((y) => {
                if (y) total_active += 1;
            });
        });
    });

    console.log("🧝‍♀️", total_active);
})();
