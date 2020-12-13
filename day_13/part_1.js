const { time } = require("console");
const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const [raw_timestamp, raw_busses] = dataset.split("\n");
    const timestamp = Number(raw_timestamp);
    const busses = raw_busses
        .split(",")
        .filter((e) => e !== "x")
        .map((e) => ({
            id: Number(e),
            next_departure: Math.ceil(timestamp / Number(e)) * Number(e),
        }));

    const first_bus = busses.shift();

    const next_bus = busses.reduce((acc, val) => {
        return acc.next_departure < val.next_departure ? acc : val;
    }, first_bus);

    console.log("👁", (next_bus.next_departure - timestamp) * next_bus.id);
})();
