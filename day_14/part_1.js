const fs = require("fs");

const pad = (num) => ("000000000000000000000000000000000000" + num).substr(-36);

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const actions = dataset.split("\n");

    let mask;
    const mem = {};

    const maskNumber = (number) => {
        const number_arr = [...number];
        for (let i = 0; i < mask.length; i += 1) {
            if (mask[i] === "X") continue;
            number_arr[i] = mask[i];
        }
        return number_arr.join("");
    };

    for (const action of actions) {
        const [run, value] = action.split(" = ");
        if (run === "mask") {
            mask = value;
            continue;
        }
        const address = run.match(/\d+/g)?.[0];
        mem[address] = maskNumber(pad((value >>> 0).toString(2)));
    }

    const sum = Object.values(mem).reduce(
        (acc, val) => acc + parseInt(val, 2),
        0
    );

    console.log("👨‍⚖️", sum);
})();
