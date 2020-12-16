const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const [raw_rules, raw_my_ticket, raw_tickets] = dataset.split("\n\n");
    const rules = [];
    raw_rules.split("\n").forEach((a) => {
        const [name, ranges] = a.split(": ");
        rules.push({
            name,
            ranges: ranges.split(" or ").map((e) => ({
                min: Number(e.split("-")[0]),
                max: Number(e.split("-")[1]),
            })),
        });
    });

    let tickets = raw_tickets.split("\n");
    tickets.shift();
    tickets.push(raw_my_ticket.split("\n")[1]);
    tickets = tickets.map((ticket) => ticket.split(",").map((n) => Number(n)));

    const ticketIsValid = (ticket) => {
        const isValid = (number) => {
            for (const { min, max } of rules.map((e) => e.ranges).flat()) {
                if (number >= min && number <= max) return true;
            }
            return false;
        };

        for (const number of ticket) {
            if (isValid(number)) continue;
            return false;
        }
        return true;
    };

    const findPossibilities = (number) => {
        const possibilities = [];
        for (const { name, ranges } of rules) {
            if (
                (number >= ranges[0].min && number <= ranges[0].max) ||
                (number >= ranges[1].min && number <= ranges[1].max)
            ) {
                possibilities.push(name);
            }
        }

        return possibilities;
    };

    tickets = tickets.filter((ticket) => ticketIsValid(ticket));
    tickets = tickets.map((ticket) => {
        return ticket.map((number) => findPossibilities(number));
    });

    const intersections = tickets.shift();

    for (const ticket of tickets) {
        for (let i = 0; i < ticket.length; i += 1) {
            intersections[i] = intersections[i].filter((x) =>
                ticket[i].includes(x)
            );
        }
    }

    while (intersections.filter((e) => typeof e === "object").length) {
        const [name] = intersections.find((e) => e.length === 1);
        for (let i = 0; i < intersections.length; i += 1) {
            if (intersections[i].length === 1) {
                intersections[i] = name;
                continue;
            }
            if (typeof intersections[i] === "string") continue;
            intersections[i] = intersections[i].filter((e) => e !== name);
        }
    }

    const values = [];
    const my_ticket = raw_my_ticket
        .split("\n")[1]
        .split(",")
        .map((e) => Number(e));

    for (let i = 0; i < my_ticket.length; i += 1) {
        if (intersections[i].includes("departure")) values.push(my_ticket[i]);
    }

    const first_value = values.shift();
    console.log(
        "😑",
        values.reduce((acc, val) => acc * val, first_value)
    );
})();
