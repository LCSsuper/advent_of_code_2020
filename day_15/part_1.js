(() => {
    const numbers = [0, 14, 6, 20, 1, 4];

    for (let i = 6; i < 2020; i += 1) {
        const pronounced_numbers = [...numbers];
        const last_pronounced = pronounced_numbers.pop();
        if (pronounced_numbers.indexOf(last_pronounced) === -1) {
            numbers.push(0);
        } else {
            pronounced_numbers.reverse();
            numbers.push(pronounced_numbers.indexOf(last_pronounced) + 1);
        }
    }

    console.log("😡", numbers.pop());
})();
