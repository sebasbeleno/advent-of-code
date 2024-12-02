import { readFile } from "../../../utils/deno.ts";


function isSafeReport(levels: number[]) {
    let isIncreasing = null;

    for (let i = 1; i < levels.length; i++) {
        const diff = levels[i] - levels[i - 1];

        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
            return false;
        }

        if (isIncreasing === null) {
            isIncreasing = diff > 0;
        } else {
            if ((diff > 0 && !isIncreasing) || (diff < 0 && isIncreasing)) {
                return false;
            }
        }
    }

    return true
}

function isSafeReportWithRemoval(levels: number[]) {
    if (isSafeReport(levels)) {
        return true;
    }

    for (let i = 0; i < levels.length; i++) {
        const modifiedReport = levels.slice(0, i).concat(levels.slice(i + 1));
        if (isSafeReport(modifiedReport)) {
            return true;
        }
    }

    return false
}

async function main(): Promise<void> {
    let safeCounter = 0;
    const file = await readFile("../input.txt");


    file.forEach((line) => {
        if (line.trim()) {
            const levels = line.split(" ").map(Number);

            if (isSafeReportWithRemoval(levels)) {
                safeCounter++;
            }
        }
    })

    console.log("Number of safe reports: ", safeCounter);
}

main()

