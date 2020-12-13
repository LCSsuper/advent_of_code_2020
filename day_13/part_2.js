const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const [, raw_busses] = dataset.split("\n");
    const busses = raw_busses
        .split(",")
        .map((e, i) => (e === "x" ? null : { id: Number(e), offset: i }))
        .filter((e) => e);

    const first_bus = busses.shift();
    let timestamp = first_bus.id;
    let adder = timestamp;

    for (const { offset, id } of busses) {
        let departure = timestamp + offset;
        let rem = departure % id;
        while (rem !== 0) {
            departure += adder;
            rem = departure % id;
        }

        timestamp = departure - offset;
        adder *= id;
    }

    console.log("👁", timestamp);
})();
