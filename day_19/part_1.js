const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const [raw_rules, raw_messages] = dataset.split("\n\n");

    const messages = raw_messages.split("\n");
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
        for (const [key1, key2] of rule.sub) {
            if (!key2) {
                for (const possibility of getPossibilities(key1)) {
                    possibilities.push(possibility);
                }
                continue;
            }

            for (const possibility1 of getPossibilities(key1)) {
                for (const possibility2 of getPossibilities(key2)) {
                    possibilities.push(`${possibility1}${possibility2}`);
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
