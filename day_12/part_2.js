const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const instructions = dataset.split("\n").map((row) => {
        const row_arr = [...row];
        return { action: row_arr.shift(), value: Number(row_arr.join("")) };
    });

    const position = { x: 0, y: 0 };
    const waypoint = { n: 1, e: 10 };

    const move = (steps) => {
        for (const step of Array(steps)) {
            position.x += waypoint.e;
            position.y += waypoint.n;
        }
    };

    const changeDirection = (degrees) => {
        const steps = degrees / 90;
        for (const step of Array(steps)) {
            const { n, e } = waypoint;
            waypoint.n = -e;
            waypoint.e = n;
        }
    };

    const updateWaypoint = (direction, amount) => {
        if (direction === "N") waypoint.n += amount;
        if (direction === "E") waypoint.e += amount;
        if (direction === "S") waypoint.n -= amount;
        if (direction === "W") waypoint.e -= amount;
    };

    for (const { action, value } of instructions) {
        if (action === "F") move(value);
        if (action === "L") changeDirection(360 - value);
        if (action === "R") changeDirection(value);
        if (["N", "E", "S", "W".includes(action)]) {
            updateWaypoint(action, value);
        }
    }

    console.log("👨‍⚖️", Math.abs(position.x) + Math.abs(position.y));
})();
