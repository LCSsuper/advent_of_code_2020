const fs = require("fs");

const pad = (num) => ("000000000000000000000000000000000000" + num).substr(-36);

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const actions = dataset.split("\n");

    let mask;
    const mem = {};

    const getAddresses = (address) => {
        const address_arr = [...address];
        for (let i = 0; i < mask.length; i += 1) {
            if (mask[i] === "0") continue;
            address_arr[i] = mask[i];
        }
        let addresses = [address_arr];
        for (let i = 0; i < address_arr.length; i += 1) {
            if (address_arr[i] === "X") {
                addresses = [
                    ...addresses.map((e) => {
                        const n = [...e];
                        n[i] = 1;
                        return n;
                    }),
                    ...addresses.map((e) => {
                        const n = [...e];
                        n[i] = 0;
                        return n;
                    }),
                ];
            }
        }
        return addresses.map((e) => parseInt(e.join(""), 2));
    };

    for (const action of actions) {
        const [run, value] = action.split(" = ");
        if (run === "mask") {
            mask = value;
            continue;
        }
        const addresses = getAddresses(
            pad((run.match(/\d+/g)?.[0] >>> 0).toString(2))
        );
        for (const address of addresses) {
            mem[address] = Number(value);
        }
    }

    const sum = Object.values(mem).reduce((acc, val) => acc + val, 0);

    console.log("👨‍⚖️", sum);
})();
