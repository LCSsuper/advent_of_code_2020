const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const [raw_rules, raw_my_ticket, raw_tickets] = dataset.split("\n\n");
    const rules = [];
    raw_rules.split("\n").forEach((a) =>
        a
            .split(": ")[1]
            .split(" or ")
            .forEach((b) =>
                rules.push({
                    min: Number(b.split("-")[0]),
                    max: Number(b.split("-")[1]),
                })
            )
    );

    let tickets = raw_tickets.split("\n");
    tickets.shift();
    tickets.push(raw_my_ticket.split("\n")[1]);
    tickets = tickets.map((ticket) => ticket.split(",").map((n) => Number(n)));

    const isValid = (number) => {
        for (const { min, max } of rules) {
            if (number >= min && number <= max) return true;
        }
        return false;
    };

    const invalid_numbers = [];
    for (const ticket of tickets) {
        for (const number of ticket) {
            if (isValid(number)) continue;
            invalid_numbers.push(number);
        }
    }

    console.log(
        "🎒",
        invalid_numbers.reduce((acc, val) => acc + val, 0)
    );
})();
