const { create } = require("domain");
const fs = require("fs");

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const raw_bags_containing = dataset.split("\n");

    const createBagMap = () =>
        raw_bags_containing.map((raw_bag_containing) => {
            let [bag, containing] = raw_bag_containing.split(" contain ");
            bag = bag.replace(" bags", "");
            containing =
                containing !== "no other bags." &&
                containing
                    .replace(".", "")
                    .split(", ")
                    .map((sub_bags) => {
                        const amount = Number(sub_bags[0]);
                        const color = sub_bags
                            .replace(`${amount} `, "")
                            .replace(amount > 1 ? " bags" : " bag", "");
                        return { amount, bag: color };
                    });
            return { bag, containing };
        });

    const bags = createBagMap();

    const findBagColors = (color) => {
        let colors = [];
        const { containing: sub_bags } = bags.find((e) => e.bag === color);
        if (!sub_bags) return colors;
        for (const sub_bag of sub_bags) {
            colors.push(sub_bag.bag);
            colors = [...colors, ...findBagColors(sub_bag.bag)];
        }
        return colors;
    };

    let count = 0;
    for (const bag of bags) {
        const colors = findBagColors(bag.bag);
        if (colors.includes("shiny gold")) count += 1;
    }

    console.log("👩‍🔧", count);
})();
