const fs = require("fs");

const directions = [
    { value: "N", degrees: 0 },
    { value: "E", degrees: 90 },
    { value: "S", degrees: 180 },
    { value: "W", degrees: 270 },
];

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const instructions = dataset.split("\n").map((row) => {
        const row_arr = [...row];
        return { action: row_arr.shift(), value: Number(row_arr.join("")) };
    });

    const position = { x: 0, y: 0 };
    let current_direction = { value: "E", degrees: 90 };

    const move = (direction, steps) => {
        if (direction === "N") position.y += steps;
        if (direction === "E") position.x += steps;
        if (direction === "S") position.y -= steps;
        if (direction === "W") position.x -= steps;
    };

    const changeDirection = (degrees) => {
        current_direction = directions.find(
            (e) => e.degrees === (current_direction.degrees + degrees) % 360
        );
    };

    for (const { action, value } of instructions) {
        if (action === "F") move(current_direction.value, value);
        if (action === "L") changeDirection(360 - value);
        if (action === "R") changeDirection(value);
        if (["N", "E", "S", "W".includes(action)]) move(action, value);
    }

    console.log("👨‍⚖️", Math.abs(position.x) + Math.abs(position.y));
})();
