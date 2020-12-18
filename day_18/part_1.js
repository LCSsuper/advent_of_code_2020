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
        let answer;
        let operator;

        for (const part of expression) {
            if (["*", "+"].includes(part)) {
                operator = part;
                continue;
            }

            const value = Array.isArray(part) ? calc(part) : Number(part);
            if (!answer) {
                answer = value;
                continue;
            }

            if (operator === "*") answer *= value;
            if (operator === "+") answer += value;
        }

        return answer;
    };

    const summary = expressions
        .map(parse)
        .map(calc)
        .reduce((acc, val) => acc + val, 0);

    console.log("🧘", summary);
})();
