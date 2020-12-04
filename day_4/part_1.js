const fs = require("fs");

const required_keys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

(() => {
    let invalid_count = 0;
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const passports = dataset
        .split("\n\n")
        .map((e) => e.split("\n").join(" ").split(" "));

    for (const passport of passports) {
        const keys = passport.map((e) => e.split(":")[0]);
        for (const required_key of required_keys) {
            if (!keys.find((e) => e.includes(required_key))) {
                invalid_count += 1;
                break;
            }
        }
    }

    console.log("😝", `Valid count: ${passports.length - invalid_count}`);
})();
