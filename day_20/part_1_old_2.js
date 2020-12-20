const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const raw_tiles = dataset.split("\n\n");

    const getEdge = (key, data, reverse = false) => {
        const set = JSON.parse(JSON.stringify(data));
        let edge;
        if (key === "top") edge = set[0];
        if (key === "bottom") edge = set[set.length - 1];
        if (key === "left") edge = set.reduce((a, v) => [...a, v[0]], []);
        if (key === "right")
            edge = set.reduce((a, v) => [...a, v[v.length - 1]], []);
        if (reverse) edge = edge.reverse();
        return edge.join("");
    };

    const tiles = raw_tiles.map((raw_tile) => {
        const [id, ...data] = raw_tile.split("\n");
        const tile = { id: Number(id.match(/\d+/g)[0]) };
        tile.data = data.map((row) => row.split(""));
        tile.edges = {
            top: getEdge("top", tile.data),
            top_reversed: getEdge("top", tile.data, true),
            bottom: getEdge("bottom", tile.data),
            bottom_reversed: getEdge("bottom", tile.data, true),
            left: getEdge("left", tile.data),
            left_reversed: getEdge("left", tile.data, true),
            right: getEdge("right", tile.data),
            right_reversed: getEdge("right", tile.data, true),
        };
        return tile;
    });

    let remaining_tiles = [...tiles];
    const start_tile = remaining_tiles.pop();
    const arrangement = [
        [
            {
                id: start_tile.id,
                edges: Object.entries(start_tile.edges)
                    .filter((e) => !e[0].includes("_reversed"))
                    .map((e) => e[1]),
            },
        ],
    ];

    const findTile = (match_edge, k) => {
        for (const { id, edges } of remaining_tiles) {
            for (const [name, edge] of Object.entries(edges)) {
                if (edge === match_edge) {
                    // [top, right, bottom, left]
                    return { id, edges: "" };
                }
            }
        }
    };

    while (remaining_tiles.length) {
        arr: for (let i = 0; i < arrangement.length; i += 1) {
            for (let j = 0; j < arrangement[i].length; j += 1) {
                if (!arrangement[i][j]) continue;
                const { edges } = arrangement[i][j];
                const rotations = [2, 3, 0, 1];
                for (let k = 0; k < edges.length; k += 1) {
                    const edge = edges[k];
                    const found_tile = findTile(edge, rotations[k]);

                    if (found_tile) {
                        if (k === 0) {
                            if (i === 0) {
                                const new_row = Array(
                                    arrangement[i].length
                                ).fill(null);
                                new_row[j] = found_tile;
                                arrangement.unshift(new_row);
                            } else {
                                arrangement[i - 1][j] = found_tile;
                            }
                        } else if (k === 1) {
                            if (arrangement[i][j + 1] !== null) {
                                arrangement.forEach((row) => row.push(null));
                            }
                            arrangement[i][j + 1] = found_tile;
                        } else if (k === 2) {
                            if (!arrangement[i + 1]) {
                                const new_row = Array(
                                    arrangement[i].length
                                ).fill(null);
                                new_row[j] = found_tile;
                                arrangement.push(new_row);
                            } else {
                                arrangement[i + 1][j] = found_tile;
                            }
                        } else {
                            if (arrangement[i][j - 1] !== null) {
                                arrangement.forEach((row) => row.unshift(null));
                                arrangement[i][0] = found_tile;
                            } else {
                                arrangement[i][j - 1] = found_tile;
                            }
                        }
                        remaining_tiles = remaining_tiles.filter(
                            (e) => e.id !== found_tile.id
                        );
                        // console.log("👶", arrangement);
                        break arr;
                    }
                }
            }
        }
    }

    console.log("👨‍🏭", arrangement);

    // console.log(
    //     "👩‍⚖️",
    //     arrangement[0][0].id *
    //         arrangement[0][arrangement[0].length - 1].id *
    //         arrangement[arrangement.length - 1][0].id *
    //         arrangement[arrangement.length - 1][arrangement[0].length - 1].id
    // );
})();
