import { readFile } from "../../../utils/deno.ts";

const file = await readFile("../input.txt");

let safeCounter = 0

file.forEach((line) => {
    const report = line.split(" ");
    const orderAsc = Number(report[0]) < Number(report[1]);

    
    for (let i = 0; i < report.length; i++) {
        if (i == report.length - 1) {
            safeCounter++;
            break;
        }

        const currentLevel = Number(report[i]);
        const nextLevel = Number(report[i + 1]);
        const diff = currentLevel - nextLevel;

        if (orderAsc && diff > 0) {
            break;
        } else if (!orderAsc && diff < 0) {
            break;
        } else if (diff == 0) {
            break;
        }

        const absDiff = Math.abs(diff);

        if (absDiff > 3) {
            break;
        }
    }
})


console.log("Number of safe reports: ", safeCounter);