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

    const findBagAmount = (color) => {
        let amount = 0;
        const { containing: sub_bags } = bags.find((e) => e.bag === color);
        if (!sub_bags) return amount;
        for (const sub_bag of sub_bags) {
            amount += sub_bag.amount;
            amount += findBagAmount(sub_bag.bag) * sub_bag.amount;
        }
        return amount;
    };

    console.log("🦹‍♀️", findBagAmount("shiny gold"));
})();
