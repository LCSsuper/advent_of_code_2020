(() => {
    const card = { pub_key: 15113849 };
    const door = { pub_key: 4206373 };

    const getLoopSize = (subject, val) => {
        let value = 1;
        let loop = 0;
        while (value !== val) {
            loop += 1;
            value = value * subject;
            value = value % 20201227;
        }
        return loop;
    };

    const doLoop = (subject, loop_size) => {
        let value = 1;
        let loop = 0;
        while (loop < loop_size) {
            loop += 1;
            value = value * subject;
            value = value % 20201227;
        }
        return value;
    };

    card.loop_size = getLoopSize(7, card.pub_key);
    door.loop_size = getLoopSize(7, door.pub_key);
    console.log("👪", doLoop(card.pub_key, door.loop_size));
    console.log("👪", doLoop(door.pub_key, card.loop_size));
})();
