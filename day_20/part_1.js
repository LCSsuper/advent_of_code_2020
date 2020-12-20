const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const raw_tiles = dataset.split("\n\n");

    const reverse = (str) => [...str].reverse().join("");

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

    let all_edges = [];

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

        for (const edge of Object.values(tile.edges)) {
            all_edges.push({ tile_id: tile.id, edge });
        }
        return tile;
    });

    let unique_edges = [];
    while (all_edges.length) {
        const edge = all_edges.shift();
        const count = all_edges.filter(
            (e) => e.edge === edge.edge || e.edge === reverse(edge.edge)
        ).length;
        if (count === 1) unique_edges.push(edge);
        all_edges = all_edges.filter(
            (e) => e.edge !== edge.edge && e.edge !== reverse(edge.edge)
        );
    }

    const corner_ids = [];
    while (unique_edges.length) {
        const { tile_id } = unique_edges.shift();
        const count = unique_edges.filter((e) => e.tile_id === tile_id).length;
        if (count === 1) corner_ids.push(tile_id);
        unique_edges = unique_edges.filter((e) => e.tile_id !== tile_id);
    }

    console.log(
        "🤖",
        corner_ids[0] * corner_ids[1] * corner_ids[2] * corner_ids[3]
    );
})();
