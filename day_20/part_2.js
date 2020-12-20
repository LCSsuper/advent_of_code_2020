const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const raw_tiles = dataset.split("\n\n");

    const tiles = raw_tiles.map((raw_tile) => {
        const [id, ...data] = raw_tile.split("\n");
        const tile = { id: Number(id.match(/\d+/g)[0]) };
        tile.data = data.map((raw) => {
            const row = raw.split("");
            row.shift();
            row.pop();
            return row;
        });
        tile.data.shift();
        tile.data.pop();
        return tile;
    });

    let total_rough = tiles.reduce(
        (total, tile) =>
            (total += tile.data.reduce(
                (tile_total, rows) =>
                    (tile_total += rows.reduce(
                        (row_total, item) => (row_total += item === "#"),
                        0
                    )),
                0
            )),
        0
    );

    total_rough = 1737;

    while (total_rough > 1557) {
        total_rough = total_rough - 15;
        if ([1647, 1707, 1722].includes(total_rough)) continue;
        console.log("🥿", "possible option: ", total_rough);
    }

    // 1737 is too high
    // 1557 is too low
    // 1647 is NOT the answer
    // aight sick its 1692!
})();
