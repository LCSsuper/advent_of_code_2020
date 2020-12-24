const start = "942387615";

(() => {
    let cups = [...start].map((e) => Number(e));

    const findNextIndex = (current) => {
        let next = current;
        while (true) {
            next = next - 1;
            if (next === 0) next = 9;
            const index = cups.indexOf(next);
            if (index > -1) return index + 1;
        }
    };

    for (let i = 0; i < 100; i += 1) {
        const current = cups.shift();
        const subset = [cups.shift(), cups.shift(), cups.shift()];
        const add_index = findNextIndex(current);
        cups = [
            ...cups.slice(0, add_index),
            ...subset,
            ...cups.slice(add_index),
        ];
        cups.push(current);
    }

    while (true) {
        const current = cups.shift();
        if (current === 1) {
            console.log("👭", cups.join(""));
            break;
        }
        cups.push(current);
    }
})();
