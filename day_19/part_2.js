const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const [raw_rules, raw_messages] = dataset.split("\n\n");

    let messages = raw_messages.split("\n");
    const rules = raw_rules.split("\n").map((raw_rule) => {
        const [key, value] = raw_rule.split(": ");
        const rule = { key: Number(key) };
        if (value.includes('"')) {
            rule.letter = value[1];
        } else {
            rule.sub = value
                .split(" | ")
                .map((set) => set.split(" ").map((sub_key) => Number(sub_key)));
        }
        return rule;
    });

    const getPossibilities = (key) => {
        const rule = rules.find((e) => e.key === key);
        if (rule.letter) return rule.letter;

        const possibilities = [];
        for (const [key1, key2, key3] of rule.sub) {
            if (!key2) {
                for (const possibility of getPossibilities(key1)) {
                    if (possibility.length > 100) return possibilities;
                    possibilities.push(possibility);
                }
                continue;
            }

            if (!key3) {
                for (const possibility1 of getPossibilities(key1)) {
                    if (possibility1.length > 100) return possibilities;
                    for (const possibility2 of getPossibilities(key2)) {
                        if (possibility1.length + possibility2.length > 100) {
                            return possibilities;
                        }
                        possibilities.push(`${possibility1}${possibility2}`);
                    }
                }
                continue;
            }

            for (const possibility1 of getPossibilities(key1)) {
                if (possibility1.length > 100) return possibilities;
                for (const possibility2 of getPossibilities(key2)) {
                    if (possibility1.length + possibility2.length > 100) {
                        return possibilities;
                    }
                    for (const possibility3 of getPossibilities(key3)) {
                        if (
                            possibility1.length +
                                possibility2.length +
                                possibility3.length >
                            100
                        ) {
                            return possibilities;
                        }
                        possibilities.push(
                            `${possibility1}${possibility2}${possibility3}`
                        );
                    }
                }
            }
        }

        return possibilities;
    };

    const all_possibilities = getPossibilities(0);

    let valid_count = 0;
    for (const message of messages) {
        if (all_possibilities.includes(message)) valid_count += 1;
    }
    console.log("😅", valid_count);
})();
