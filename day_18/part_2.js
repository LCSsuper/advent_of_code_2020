const fs = require("fs");

String.prototype.replaceAll = function (find, replace) {
    return this.split(find).join(replace);
};

(() => {
    const dataset = fs.readFileSync("./dataset.txt").toString();
    const expressions = dataset.split("\n");

    const parse = (expression) => {
        let parsed = `[${expression
            .replaceAll(" ", "")
            .replaceAll("(", "[")
            .replaceAll(")", "]")}]`;

        parsed = [...parsed].reduce((acc, val) => {
            if (val === "]" && acc.slice(-1) === ",") {
                return `${acc.slice(0, -1)}${val},`;
            }
            if (["[", "]"].includes(val)) return (acc += val);
            return (acc += `"${val}",`);
        }, "");

        return JSON.parse(parsed.slice(0, -1));
    };

    const calc = (expression) => {
        let do_addition_next = false;
        const test = expression.reduce((acc, val) => {
            const value = Array.isArray(val) ? calc(val) : val;
            if (do_addition_next) {
                do_addition_next = false;
                const last = acc.pop();
                return [...acc, last + Number(value)];
            }
            if (value === "+") {
                do_addition_next = true;
                return acc;
            }
            return [...acc, value === "*" ? value : Number(value)];
        }, []);

        const first = test.pop();
        return test
            .filter((e) => e !== "*")
            .reduce((acc, val) => acc * val, first);
    };

    const summary = expressions
        .map(parse)
        .map(calc)
        .reduce((acc, val) => acc + val, 0);

    console.log("🧘", summary);
})();
