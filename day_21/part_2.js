const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    let foods = dataset.split("\n");
    foods = foods.map((food) => {
        const [ings, alls] = food.slice(0, -1).split(" (contains ");
        return { ings: ings.split(" "), alls: alls.split(", ") || [] };
    });

    const allergens = new Map();

    for (const { alls } of foods) {
        alls.forEach((all) => allergens.set(all, null));
    }

    for (const [all] of allergens.entries()) {
        const foods_with_all = foods.filter(({ alls }) => alls.includes(all));
        let intersect = foods_with_all.shift().ings;
        for (const food_with_all of foods_with_all) {
            intersect = intersect.filter((x) => food_with_all.ings.includes(x));
        }
        const [found] = intersect;
        allergens.set(all, found);
        foods.forEach(
            (food) => (food.ings = food.ings.filter((ing) => ing !== found))
        );
    }

    const danger_list = [...allergens.entries()].sort().map(([, ing]) => ing);
    console.log("👷", danger_list.join(","));
})();
