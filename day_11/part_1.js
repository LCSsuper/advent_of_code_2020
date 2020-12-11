const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const areas = dataset.split("\n").map((e) => e.split(""));

    const calculateOccupiedSeats = (original_areas) => {
        let total_occupied_seats = 0;
        const new_areas = original_areas.map((e) => [...e]);
        for (let i = 0; i < original_areas.length; i += 1) {
            for (let j = 0; j < original_areas[i].length; j += 1) {
                const current_spot = original_areas[i][j];
                let occupied_seats_around = 0;
                if (current_spot === ".") continue;
                if (current_spot === "#") total_occupied_seats += 1;
                for (let k = -1; k <= 1; k += 1) {
                    for (let l = -1; l <= 1; l += 1) {
                        if (k === 0 && l === 0) continue;
                        if (original_areas[i + k]?.[j + l] === "#") {
                            occupied_seats_around += 1;
                        }
                    }
                }
                if (current_spot === "L" && occupied_seats_around === 0) {
                    new_areas[i][j] = "#";
                    total_occupied_seats += 1;
                } else if (current_spot === "#" && occupied_seats_around >= 4) {
                    new_areas[i][j] = "L";
                    total_occupied_seats -= 1;
                }
            }
        }
        return [total_occupied_seats, new_areas];
    };

    let seats;
    let new_areas = areas;
    while (true) {
        const old_seats = seats;
        [seats, new_areas] = calculateOccupiedSeats(new_areas);
        if (old_seats === seats) break;
    }
    console.log("🚶‍♀️", seats);
})();
