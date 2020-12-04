const fs = require("fs");

const requirements = [
    { check_key: "byr", check: (e) => Number(e) >= 1920 && Number(e) <= 2002 },
    { check_key: "iyr", check: (e) => Number(e) >= 2010 && Number(e) <= 2020 },
    { check_key: "eyr", check: (e) => Number(e) >= 2020 && Number(e) <= 2030 },
    {
        check_key: "hgt",
        check: (e) => {
            const length = Number(e.match(/\d+/g)?.[0]);
            const measurement = e.match(/[A-Za-z]+/g)?.[0];
            if (
                !length ||
                !measurement ||
                !["cm", "in"].includes(measurement)
            ) {
                return false;
            }

            return measurement === "cm"
                ? length >= 150 && length <= 193
                : length >= 59 && length <= 76;
        },
    },
    {
        check_key: "hcl",
        check: (e) =>
            e.charAt(0) === "#" && !!e.substring(1).match(/[a-fA-F0-9]{6}/g),
    },
    {
        check_key: "ecl",
        check: (e) =>
            ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(e),
    },
    {
        check_key: "pid",
        check: (e) => !e.match(/[a-zA-Z]/g) && e.length === 9,
    },
];

(() => {
    let invalid_count = 0;
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const passports = dataset
        .split("\n\n")
        .map((e) => e.split("\n").join(" ").split(" "));

    for (const passport of passports) {
        const key_value_pairs = passport.map((e) => e.split(":"));
        for (const { check_key, check } of requirements) {
            const key_value_pair = key_value_pairs.find(
                (e) => e[0] === check_key
            );
            if (!key_value_pair || !check(key_value_pair[1])) {
                invalid_count += 1;
                break;
            }
        }
    }

    console.log("😝", `Valid count: ${passports.length - invalid_count}`);
})();
