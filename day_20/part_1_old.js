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
    const arrangement = [[{ id: start_tile.id, rotation: 0, reversed: false }]];

    const getEdgesToCheck = (rotation, reversed) => {
        let edges = ["top", "right", "bottom", "left"];
        if (reversed === "ver") {
            edges = ["bottom", "right_reversed", "top", "left_reversed"];
        } else if (reversed === "hor") {
            edges = ["top_reversed", "left", "bottom_reversed", "right"];
        }

        const reverse = (edge) =>
            edge.includes("_reversed")
                ? edge.replace("_reversed", "")
                : `${edge}_reversed`;

        const rotate_times = rotation / 90;
        for (let i = 0; i < rotate_times; i += 1) {
            const edge_to_move = edges.pop();
            edges.unshift(edge_to_move);
            edges[2] = reverse(edges[2]);
            edges[0] = reverse(edges[0]);
        }
        return edges;
    };

    const calcRotation = (match, current, reversed) => {
        let tiles = { top: 0, right: 90, bottom: 180, left: 270 };
        if (reversed === "hor") {
            tiles = { top: 0, right: 270, bottom: 180, left: 90 };
        } else if (reversed === "ver") {
            tiles = { top: 180, right: 90, bottom: 0, left: 270 };
        }
        const side = current.replace("_reversed", "");
        const tile = tiles[side];
        const rotation = match - tile;
        return rotation < 0 ? 360 - Math.abs(rotation) : rotation;
    };

    const calcReversed = (current) => {
        let reversed = null;
        const side = current.replace("_reversed", "");
        if (
            (["top", "right"].includes(side) &&
                current.includes("_reversed")) ||
            (["bottom", "left"].includes(side) &&
                !current.includes("_reversed"))
        ) {
            if (current.includes("top") || current.includes("bottom")) {
                reversed = "hor";
            } else {
                reversed = "ver";
            }
        }
        return reversed;
    };

    const findTile = (match_rotation, match_edge) => {
        for (const { id, edges } of remaining_tiles) {
            for (const [name, edge] of Object.entries(edges)) {
                if (edge === match_edge) {
                    const reversed = calcReversed(name);
                    return {
                        id,
                        reversed: calcReversed(name),
                        rotation: calcRotation(match_rotation, name, reversed),
                    };
                }
            }
        }
    };

    while (remaining_tiles.length) {
        arr: for (let i = 0; i < arrangement.length; i += 1) {
            for (let j = 0; j < arrangement[i].length; j += 1) {
                if (!arrangement[i][j]) continue;
                const tile = tiles.find((e) => e.id === arrangement[i][j].id);
                let edges = getEdgesToCheck(
                    arrangement[i][j].rotation,
                    arrangement[i][j].reversed
                );
                edges = edges.map((edge) => tile.edges[edge]);
                const rotations = [180, 90, 0, 270];
                for (let k = 0; k < edges.length; k += 1) {
                    const edge = edges[k];
                    const rotation = rotations[k];
                    const found_tile = findTile(rotation, edge);

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
