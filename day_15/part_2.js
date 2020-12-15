(() => {
    const dataset = [0, 14, 6, 20, 1, 4];
    const numbers = {};
    dataset.forEach((e, i) => {
        numbers[e] = [i];
    });

    let last = numbers[numbers.length - 1];
    for (let i = 6; i < 30000000; i += 1) {
        let indexes = numbers[last];
        let next =
            indexes && indexes.length >= 2
                ? indexes[indexes.length - 1] - indexes.shift()
                : 0;
        numbers[next] = [...(numbers[next] || []), i];
        last = next;
    }

    console.log("👖", last);
})();
