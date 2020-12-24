const start = "942387615";

(() => {
    const range = (start, end) => {
        return Array(end - start + 1)
            .fill()
            .map((_, idx) => start + idx);
    };

    let next = range(1, 1000000 + 1);
    let cups = start.split("").map((i) => i * 1);
    next[0] = next[next.length - 1] = cups[0];
    for (let x = 0; x < cups.length - 1; x++) {
        next[cups[x]] = cups[x + 1];
    }
    next[cups[cups.length - 1]] = Math.max(...cups) + 1;
    let cur = 0;

    for (let c = 0; c <= 10000000; c++) {
        cur = next[cur];
        let ins = cur !== 1 ? cur - 1 : 1000000;
        let p1 = next[cur];
        let p2 = next[p1];
        let p3 = next[p2];

        while (ins === p1 || ins === p2 || ins === p3) {
            ins -= 1;
        }
        if (ins < 1) {
            ins += 1000000;
        }

        [next[p3], next[ins], next[cur]] = [next[ins], next[cur], next[p3]];
    }
    console.log("🥵", next[1] * next[next[1]]);
})();
